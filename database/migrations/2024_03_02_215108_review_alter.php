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
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex('reviews_listing_id_index');

            $table->dropColumn('listing_id');
        });


        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign('reviews_buyer_id_foreign');
            $table->dropForeign('reviews_seller_id_foreign');
            $table->dropIndex('reviews_buyer_id_foreign');
            $table->dropIndex('reviews_seller_id_foreign');
            $table->dropColumn('buyer_id');
            $table->dropColumn('seller_id');

            $table->foreignUuid('listing_id')->nullable(false)->constrained('listings');
            $table->tinyInteger('type')->unsigned()->default(0)->nullable(false);
            $table->foreignUuid('writer_id')->nullable(false)->constrained('users');
            $table->foreignUuid('target_id')->nullable(false)->constrained('users');
            $table->unique(['listing_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
        });
    }
};
