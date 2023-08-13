import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import type { App, LinkItem, PaginatedResults } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import ListingPreview from '@/Components/listings/ListingPreview';
import Pagination from '@/Components/common/Pagination';

interface Props {
    user: App['Models']['User'];
    listings: PaginatedResults<App['Models']['Listing'][]>;
}

export default function UserListingsIndex({ user, listings }: Props) {
    const links: LinkItem[] = [
        { label: 'Profile', href: route('users.show', user.id) },
        { label: 'Listings', href: route('user-listings.index', user.id) },
        { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    return (
        <Layout>
            <Head title={`${user.username} Listings`} />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading={`Listings by ${user.username}`} />

                <div className="container flex flex-col gap-y-4">
                    <NavBar links={links} />

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between gap-6" />
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {listings.data.map((listing) => (
                                <ListingPreview
                                    key={listing.id}
                                    listing={listing}
                                    showTags
                                />
                            ))}
                        </div>

                        <Pagination results={listings} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
