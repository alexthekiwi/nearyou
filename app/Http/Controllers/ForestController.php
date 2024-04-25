<?php

namespace App\Http\Controllers;

use App\Actions\Reviews\GetTrees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ForestController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Forest/Index', [
            'trees' => (new GetTrees)($request->user()),
        ]);
    }
}
