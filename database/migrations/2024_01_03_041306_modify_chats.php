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
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chats');

        Schema::create('chats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->softDeletes();
            $table->timestamps();
            $table->foreignUuid('listing_id')->constrained('listings');
            $table->foreignUuid('buyer_id')->constrained('users');
            // has uread by buyer
            $table->boolean('has_unread_by_buyer')->default(true);
            // has uread by seller
            $table->boolean('has_unread_by_seller')->default(false);
            $table->unique(['listing_id', 'buyer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
