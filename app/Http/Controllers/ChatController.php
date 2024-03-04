<?php

namespace App\Http\Controllers;

use App\Enums\ListingStatus;
use App\Models\Chat;
use App\Models\Listing;
use App\Models\ListingImage;
use App\Models\User;
use App\Models\Suburb;
use App\DTOs\ChatDTO1;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Chat::class);

        return inertia('Chat/Index', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $listing_id = $request->listing_id;
            $buyer_id = auth()->id();
            $seller_id = '';

            $listing = Listing::where('id', $listing_id)->first();

            // 존재하지 않는 listing_id로 요청이 들어온 경우
            if ($listing == null) {
                return \response()->json([
                    'message' => 'Listing not found',
                ], 404);
            }

            // 판매자와 구매자가 같은 경우
            $seller_id = $listing->seller_id;

            if ($seller_id == $buyer_id) {
                return \response()->json([
                    'message' => 'You cannot chat with yourself',
                ], 400);
            }

            // 이미 채팅방이 존재하는 경우
            $existsChat = Chat::where('listing_id', $listing_id)
                ->where('buyer_id', $buyer_id)
                ->exists();

            if ($existsChat) {
                return redirect()->route('chat.show', $existsChat);
            }

            // 이미 판매된 상품인 경우
            if ($listing->status == ListingStatus::SOLD) {
                return \response()->json([
                    'message' => 'This item has already been sold',
                ], 400);
            }

            $chat = Chat::create([
                'listing_id' => $listing_id,
                'buyer_id' => $buyer_id,
            ]);

            $defaultMessage = 'Near You aims for safe second-hand transactions among local neighbors.

Please trade based on trust, and whenever possible, proceed with face-to-face transactions!';

            $timestamp = round(microtime(true) * 1000);

            Redis::zadd(
                'chat:'.$chat->id,
                $timestamp,
                JSON_ENCODE([
                    'writer' => 0,
                    'message' => $defaultMessage,
                    'id' => Str::uuid(),
                ]),
            );

            Redis::set(
                'chat_last_message:'.$chat->id,
                substr($defaultMessage, 0, 100),
            );

            Redis::zadd(
                'user_chat_room:'.$seller_id,
                $timestamp,
                $chat->id,
            );

            Redis::zadd(
                'user_chat_room:'.$buyer_id,
                $timestamp,
                $chat->id,
            );

            Redis::set(
                'user_chat_unread:'.$chat->id.':'.$buyer_id,
                0,
            );

            Redis::set(
                'user_chat_unread:'.$chat->id.':'.$seller_id,
                1,
            );

            DB::commit();

            $listingImage = ListingImage::select('file')
                ->where('listing_id', $listing_id)
                ->where('order', 0)
                ->first();

            $suburb = Suburb::select('name')
                ->where('id', $listing->suburb_id)
                ->first();

            $buyer = User::select('name')
                ->where('id', $buyer_id)
                ->first();

            $seller = User::select('name')
                ->where('id', $seller_id)
                ->first();

            Redis::publish('chat-new', JSON_ENCODE([
                'id' => $chat->id,
                'thumbnail' => empty($listingImage) ? '' : $listingImage->file,
                'buyerId' => $buyer_id,
                'buyerName' => $buyer->name,
                'sellerId' => $seller_id,
                'sellerName' => $seller->name,
                'suburb' => empty($suburb) ? '' : $suburb->name,
                'lastMsg' => $defaultMessage,
                'lastAt' => $timestamp,
            ]));

            return redirect()->route('chat.show', $chat);
        } catch (\Exception $e) {
            DB::rollback();

            Log::error($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        $userId = auth()->id();

        $chat2 = Chat::select(
                DB::raw("(SELECT name FROM users WHERE id = IF(chats.buyer_id = '$userId', l.seller_id, chats.buyer_id)) as oppositeUserId"),
                'li.file as thumbnail',
                'l.title',
                'l.price',
                'l.status',
            )
            ->leftJoin('listings as l', 'l.id', '=', 'chats.listing_id')
            ->leftJoin('listing_images as li', function ($join) {
                $join->on('li.listing_id', '=', 'l.id')
                    ->where('li.order', 0);
            })
            ->where('chats.id', $chat->id)
            ->where(function ($query) use ($userId) {
                $query->where('l.seller_id', $userId)
                    ->orWhere('chats.buyer_id', $userId);
            })
            ->first();

        $chat->oppositeUserId = $chat2->oppositeUserId;
        $chat->thumbnail = $chat2->thumbnail;
        $chat->title = $chat2->title;
        $chat->price = $chat2->price;
        $chat->status = $chat2->status;

        return inertia('Chat/Show', [
            'chat' => $chat,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        // TODO: Add a new message to the chat
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        // TODO: Archive the chat for the authenticated user only
    }
}
