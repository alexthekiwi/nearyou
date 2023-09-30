<?php

use App\Enums\ListingStatus;
use App\Models\Listing;
use App\Models\Location;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $location = Location::factory()->create();

    // Buyer and seller must be from the same location
    $this->buyer = User::factory()->create([
        'location_id' => $location->id,
    ]);

    $this->seller = User::factory()->create([
        'location_id' => $location->id,
    ]);

    $this->listing = Listing::factory()->create([
        'seller_id' => $this->seller->id,
        'location_id' => $location->id,
        'status' => ListingStatus::AVAILABLE,
    ]);
});

test('user can add an item to favourites', function () {
    // Assert we could make the request
    actingAs($this->buyer)
        ->post("/favourites/{$this->listing->id}")
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    // Assert the listing is in the user's favourites
    $this->assertTrue(
        $this->buyer->favourites->contains($this->listing)
    );

    // Assert that there is only one listing in the user's favourites
    $this->assertEquals(
        1,
        $this->buyer->favourites->count()
    );
});

test('user can remove an item from favourites', function () {
    // First  the listing to the user's favourites
    $this->buyer->favourites()->attach($this->listing->id);

    // Assert we could make the request
    actingAs($this->buyer)
        ->delete("/favourites/{$this->listing->id}")
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    // Assert the listing is in the user's favourites
    $this->assertTrue(
        ! $this->buyer->favourites->contains($this->listing)
    );
});

test('user cannot favourite a listing from another location', function () {
    /** @var Authenticatable */
    $outsideBuyer = User::factory()->create([
        'location_id' => Location::factory()->create()->id,
    ]);

    // Assert we could not make the request
    actingAs($outsideBuyer)
        ->post("/favourites/{$this->listing->id}")
        ->assertStatus(403);

    // Assert the listing is not in the user's favourites
    $this->assertTrue(
        ! $this->buyer->favourites->contains($this->listing)
    );
});
