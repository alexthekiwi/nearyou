<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('chats', function (Blueprint $table) {
            DB::statement('ALTER TABLE chats MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });

        Schema::table('listing_images', function (Blueprint $table) {
            DB::statement('ALTER TABLE listing_images MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });

        Schema::table('listing_tags', function (Blueprint $table) {
            DB::statement('ALTER TABLE listing_tags MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });

        Schema::table('listings', function (Blueprint $table) {
            DB::statement('ALTER TABLE listings MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });

        Schema::table('reviews', function (Blueprint $table) {
            DB::statement('ALTER TABLE reviews MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });

        Schema::table('user_favourites', function (Blueprint $table) {
            DB::statement('ALTER TABLE user_favourites MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chats', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });

        Schema::table('listing_images', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });

        Schema::table('listing_tags', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });

        Schema::table('listings', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });

        Schema::table('user_favourites', function (Blueprint $table) {
            $table->timestamp('created_at')->default(null)->nullable()->change();
            $table->timestamp('updated_at')->default(null)->nullable()->change();
        });
    }
};
