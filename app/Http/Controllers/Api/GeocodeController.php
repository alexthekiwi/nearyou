<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeocodeController extends Controller
{
    public function show(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
        $searchParams = [
            'latlng' => "{$request->lat},{$request->lng}",
            'key' => config('services.google.geocoding.key'),
        ];

        $res = Http::get($baseUrl, $searchParams);

        if (! $res->successful()) {
            return response()->json([
                'message' => 'Unable to geocode location',
            ], 500);
        }

        return response()->json([
            'data' => $res->json('results.0'),
        ]);
    }
}
