<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Listing;
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

        $tmpTableName = 'tmp_chat_room_'.Str::replace('-', '_', Str::uuid());

        try {
            $userId = auth()->id();

            $chatRoomCache = Redis::zRevRange('user_chat_room:'.$userId, 0, -1, true);

            $chatRoomCacheArray = array_keys($chatRoomCache);
            
            DB::statement('CREATE TEMPORARY TABLE '.$tmpTableName.' (
                ord INT(11) NOT NULL,
                chat_id char(36) PRIMARY KEY,
                score BIGINT(13) NOT NULL
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
            $order = 0;
            foreach ($chatRoomCache as $id => $score) {
                DB::table($tmpTableName)->insert([
                    'ord' => $order++,
                    'chat_id' => $id,
                    'score' => $score,
                ]);
            }

            $test = DB::table($tmpTableName)->get();

            Log::info('test'.json_encode($test));

            $chats = Chat::select(
                    'chats.id',
                    DB::raw("(SELECT name FROM users WHERE id = IF(chats.buyer_id = '$userId', l.seller_id, chats.buyer_id)) as oppositeUserId"),
                    'li.file as thumbnail',
                    's.name as suburb',
                    'tmp.score as lastAt',
                )
                ->leftJoin('listings as l', 'l.id', '=', 'chats.listing_id')
                ->leftJoin('listing_images as li', function ($join) {
                    $join->on('li.listing_id', '=', 'l.id')
                        ->where('li.order', 0);
                })
                ->leftJoin('suburbs as s', 's.id', '=', 'l.suburb_id')
                ->join($tmpTableName.' as tmp', 'tmp.chat_id', '=', 'chats.id')
                ->where('l.seller_id', $userId)
                ->orWhere('chats.buyer_id', $userId)
                ->groupBy('chats.id', 'li.file')
                ->orderBy('tmp.ord', 'asc')
                ->paginate();

            // 가져온 데이터의 컬렉션을 가져옵니다.
            $newChats = $chats->getCollection()->map(function ($chat) {
                $chat->lastMsg = Redis::get('chat_last_message:'.$chat->id);
                $chat->isUnread = Redis::get('user_chat_unread:'.$chat->id.':'.auth()->id()) == '1';

                return $chat;
            });

            $chats->setCollection($newChats);

            DB::statement('DROP TEMPORARY TABLE '.$tmpTableName);

            return inertia('Chat/Index', [
                'chats' => $chats,
                'redis' => $chatRoomCacheArray,
            ]);
        } catch (\Exception $e) {
            DB::statement('DROP TEMPORARY TABLE IF EXISTS '.$tmpTableName);

            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());

            return inertia('Chat/Index', [
                'chats' => []
            ]);
        }
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

            if ($listing == null) {
                return \response()->json([
                    'message' => 'Listing not found',
                ], 404);
            }

            $seller_id = $listing->seller_id;

            if ($seller_id == $buyer_id) {
                return \response()->json([
                    'message' => 'You cannot chat with yourself',
                ], 400);
            }

            $existsChat = Chat::where('listing_id', $listing_id)
                ->where('buyer_id', $buyer_id)
                ->exists();

            if ($existsChat) {
                return redirect()->route('chat.show', $existsChat);
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
