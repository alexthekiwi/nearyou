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
            $table->dropColumn('has_unread_by_buyer');
            $table->dropColumn('has_unread_by_seller');
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->uuid('listing_id')->nullable();
            $table->index('listing_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chats', function (Blueprint $table) {
            $table->boolean('has_unread_by_buyer')->default(true);
            $table->boolean('has_unread_by_seller')->default(false);
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('listing_id');
        });
    }
};
