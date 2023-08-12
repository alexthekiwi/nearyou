<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->getSeedData()->each(
            fn (string $tag) => Tag::factory()->create(['title' => $tag])
        );
    }

    /**
     * Get the seed data for the model.
     * – Thank you ChatGPT
     */
    public function getSeedData()
    {
        return collect([
            'Clothes',
            'Computers',
            'Furniture',
            'Electronics',
            'Appliances',
            'Books',
            'Beauty',
            'Toys',
            'Sports',
            'Health',
            'Jewelry',
            'Accessories',
            'Shoes',
            'Bags',
            'Home Decor',
            'Garden',
            'Kitchen',
            'Food',
            'Beverages',
            'Office Supplies',
            'Crafts',
            'Art',
            'Music',
            'Movies',
            'Pet Supplies',
            'Automotive',
            'Baby',
            'Party Supplies',
            'Travel',
            'Fitness',
            'Outdoor',
            'Tools',
            'School Supplies',
            'Tech Gadgets',
            'Hobbies',
            'Stationery',
            'Vintage',
            'Antiques',
            'Collectibles',
            'Gifts',
            'Handmade',
            'DIY',
            'Fashion',
            'Electrical',
            'Smart Home',
            'Phones',
            'Tablets',
            'Watches',
            'Video Games',
            'Board Games',
            'Cameras',
            'Photography',
            'Home Improvement',
            'Craft Supplies',
            'Baby Gear',
            'Musical Instruments',
            'Fitness Equipment',
            'Costumes',
            'Baby Clothing',
            'Party Decorations',
            'Cookware',
            'Bedding',
            'Bath',
            'Fragrances',
            'Skincare',
            'Haircare',
            'Makeup',
            'Puzzles',
            'Camping Gear',
            'Fishing Gear',
            'Hiking Gear',
            'Swimwear',
            'Sunglasses',
            'Wallets',
            'Luggage',
            'Purses',
            'Dresses',
            'Jeans',
            'T-shirts',
            'Sweaters',
            'Suits',
            'Hoodies',
            'Sneakers',
            'Boots',
            'Sandals',
            'Rings',
            'Necklaces',
            'Earrings',
            'Bracelets',
            'Scarves',
            'Hats',
            'Gloves',
            'Belts',
            'Ties',
            'Socks',
            'Blankets',
            'Candles',
            'Posters',
            'Sculptures',
            'Paintings',
            'Gardening Tools',
            'Cooking Utensils',
            'Bakeware',
            'Cutlery',
        ]);
    }
}
