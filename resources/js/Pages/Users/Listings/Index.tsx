import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import type { App, LinkItem, PaginatedResults } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import ListingPreview from '@/Components/listings/ListingPreview';
import Pagination from '@/Components/common/Pagination';
import { useAuth } from '@/lib/auth';
import H3 from '@/Components/typography/H3';
import CreateListingLink from '@/Components/listings/CreateListingLink';

interface Props {
    user: App['Models']['User'];
    listings: PaginatedResults<App['Models']['Listing'][]>;
    favouriteListings: App['Models']['Listing']['id'][];
}

export default function UserListingsIndex({
    user,
    listings,
    favouriteListings,
}: Props) {
    const { user: authUser } = useAuth();

    const links: LinkItem[] = [
        { label: 'Profile', href: route('users.show', user.id) },
        { label: 'Listings', href: route('user-listings.index', user.id) },
        { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    const isAuthUser = authUser.id === user.id;

    const title = isAuthUser ? 'My listings' : `Listings by ${user.username}`;

    return (
        <Layout>
            <Head title={title} />

            <div className="container mb-24 mt-6 flex flex-col gap-8">
                <PageHeader heading={title} />

                <div className="flex flex-col gap-y-4">
                    <NavBar links={links} />

                    <div className="mx-auto mt-5 grid max-w-5xl gap-12">
                        {listings.data.length === 0 && (
                            <H3 className="text-center">No listings found.</H3>
                        )}

                        {listings.data.length > 0 && (
                            <>
                                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {listings.data.map((listing) => (
                                        <ListingPreview
                                            key={listing.id}
                                            listing={listing}
                                            favouriteListings={
                                                favouriteListings
                                            }
                                        />
                                    ))}
                                </div>

                                <Pagination
                                    results={listings}
                                    showPerPageSelector={false}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isAuthUser && <CreateListingLink />}
        </Layout>
    );
}
