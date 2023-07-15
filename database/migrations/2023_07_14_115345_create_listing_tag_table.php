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
        Schema::create('listing_tag', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignUuid('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->foreignUuid('listing_id')->constrained('listings')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listing_tag');
    }
};
