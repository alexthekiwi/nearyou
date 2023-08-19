<?php

use App\Models\User;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home'));
});

Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
});

Breadcrumbs::for('listings.index', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Listings', route('listings.index'));
});

Breadcrumbs::for('listings.create', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Listings', route('user-listings.index', auth()->user()));
    $trail->push('New listing', route('listings.create'));
});

Breadcrumbs::for('chat.index', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Chat', route('chat.index'));
});

Breadcrumbs::for('favourites.index', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Favourites', route('favourites.index'));
});

Breadcrumbs::for('about', function (BreadcrumbTrail $trail) {
    if (auth()->check()) {
        $trail->push('Dashboard', route('dashboard'));
    }
    $trail->push('About', route('about'));
});

Breadcrumbs::for('support', function (BreadcrumbTrail $trail) {
    if (auth()->check()) {
        $trail->push('Dashboard', route('dashboard'));
    }
    $trail->push('Support', route('support'));
});

Breadcrumbs::for('privacy-policy', function (BreadcrumbTrail $trail) {
    if (auth()->check()) {
        $trail->push('Dashboard', route('dashboard'));
    }
    $trail->push('Privacy policy', route('privacy-policy'));
});

Breadcrumbs::for('terms-and-conditions', function (BreadcrumbTrail $trail) {
    if (auth()->check()) {
        $trail->push('Dashboard', route('dashboard'));
    }
    $trail->push('Terms of use', route('terms-and-conditions'));
});

Breadcrumbs::for('faq', function (BreadcrumbTrail $trail) {
    if (auth()->check()) {
        $trail->push('Dashboard', route('dashboard'));
    }
    $trail->push('FAQ', route('faq'));
});

Breadcrumbs::for('community', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Community', route('community'));
});

Breadcrumbs::for('profile.edit', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Edit Profile', route('profile.edit'));
});

Breadcrumbs::for('users.index', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Users', route('users.index'));
});

Breadcrumbs::for('users.show', function (BreadcrumbTrail $trail, User $user) {
    $name = $user->username;

    if ($user->is(auth()->user())) {
        $name = 'My profile';
        $trail->push('Dashboard', route('dashboard'));
    }

    $trail->push($name, route('users.show', $user));
});

Breadcrumbs::for('user-reviews.index', function (BreadcrumbTrail $trail, User $user) {
    if ($user->is(auth()->user())) {
        $trail->push('Dashboard', route('dashboard'));
    } else {
        $trail->push($user->username, route('users.show', $user));
    }

    $trail->push('Reviews', route('user-reviews.index', $user));
});

Breadcrumbs::for('user-listings.index', function (BreadcrumbTrail $trail, User $user) {
    if ($user->is(auth()->user())) {
        $trail->push('Dashboard', route('dashboard'));
    } else {
        $trail->push($user->username, route('users.show', $user));
    }

    $trail->push('Listings', route('user-listings.index', $user));
});

Breadcrumbs::for('users.create', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Users', route('users.index'));
    $trail->push('Create user', route('users.create'));
});
