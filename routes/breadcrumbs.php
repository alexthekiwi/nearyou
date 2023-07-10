<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home'));
});

Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
});

Breadcrumbs::for('profile.edit', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Edit Profile', route('profile.edit'));
});

Breadcrumbs::for('users.index', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Users', route('users.index'));
});

Breadcrumbs::for('users.create', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('dashboard'));
    $trail->push('Users', route('users.index'));
    $trail->push('Create user', route('users.create'));
});
