import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import type { App, LinkItem, PaginatedResults } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import Pagination from '@/Components/common/Pagination';
import ListingPreview from '@/Components/listings/ListingPreview';
import H2 from '@/Components/typography/H2';
import Button from '@/Components/common/Button';
import H3 from '@/Components/typography/H3';

interface Props {
    listings: PaginatedResults<App['Models']['Listing'][]>;
    favouriteListings: App['Models']['Listing']['id'][];
}

export default function FavouritesIndex({
    listings,
    favouriteListings,
}: Props) {
    const links: LinkItem[] = [
        // { label: 'Profile', href: route('users.show', user.id) },
        // { label: 'Listings', href: route('user-listings.index', user.id) },
        // { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    return (
        <Layout>
            <Head title="Favourite Listings" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="My favourites" />

                <div className="flex flex-col gap-y-4">
                    <NavBar links={links} />

                    {listings.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-6">
                            <H3 as="h2">You don't have any favourites yet.</H3>
                            <Button
                                href={route('listings.index')}
                                theme="primary"
                            >
                                Browse listings
                            </Button>
                        </div>
                    )}

                    {listings.data.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {listings.data.map((listing) => (
                                    <ListingPreview
                                        key={listing.id}
                                        listing={listing}
                                        favouriteListings={favouriteListings}
                                    />
                                ))}
                            </div>

                            <Pagination
                                results={listings}
                                showPerPageSelector={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
