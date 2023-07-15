<?php

use App\Enums\ListingStatus;
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
        Schema::create('listings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->foreignUuid('seller_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->foreignUuid('buyer_id')->nullable()->constrained('users', 'id')->nullOnDelete();
            $table->string('title', 255);
            $table->bigInteger('price');
            $table->string('status')->default(ListingStatus::AVAILABLE->value);
            $table->dateTime('sold_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
