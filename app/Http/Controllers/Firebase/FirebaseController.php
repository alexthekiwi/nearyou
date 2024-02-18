<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Illuminate\Support\Facades\Log;

class FirebaseController extends Controller
{
    protected $firestore;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(storage_path(env('FIREBASE_CREDENTIALS')))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'));

        $this->firestore = $factory->createFirestore();

        Log::info('FirebaseController::__construct()');
    }

    public function index()
    {
        $database = $this->firestore->database();

        $collection = $database->collection('chat');

        Log::info('collection: ' . $collection);
        
        return '?';
    }
}
