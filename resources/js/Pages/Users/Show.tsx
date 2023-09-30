import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Button from '@/Components/common/Button';
import type { App, LinkItem } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import Card from '@/Components/common/Card';
import H2 from '@/Components/typography/H2';
import ListingPreview from '@/Components/listings/ListingPreview';
import Review from '@/Components/reviews/Review';
import { useAuth } from '@/lib/auth';
import H3 from '@/Components/typography/H3';

interface Props {
    user: App['Models']['User'];
    listings: App['Models']['Listing'][];
    reviews: App['Models']['Review'][];
    greenScore: number;
    favouriteListings: App['Models']['Listing']['id'][];
}

export default function UsersShow({
    user,
    listings,
    reviews,
    greenScore,
    favouriteListings,
}: Props) {
    const { user: authUser } = useAuth();

    const links: LinkItem[] = [
        { label: 'Profile', href: route('users.show', user.id) },
        { label: 'Listings', href: route('user-listings.index', user.id) },
        { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    const title = authUser.id === user.id ? 'My profile' : `${user.username}`;

    return (
        <Layout>
            <Head title={title} />

            <div className="container mb-24 mt-6 flex flex-col gap-8">
                <PageHeader heading={title} />

                <div className="flex flex-col gap-y-4">
                    <NavBar links={links} />

                    <div className="mx-auto mt-5 grid max-w-5xl gap-12">
                        <Card>
                            <div className="flex flex-col gap-4">
                                <H2>Green score: {greenScore}%</H2>
                                <div className="rounded-full border border-gray-300 p-1">
                                    <div
                                        className="h-4 rounded-full bg-teal"
                                        style={{ width: `${greenScore}%` }}
                                    />
                                </div>
                            </div>
                        </Card>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between gap-6">
                                <H2>Listings</H2>
                                {listings.length > 0 && (
                                    <Button
                                        href={route('user-listings.index', {
                                            user: user.id,
                                        })}
                                        theme="primary"
                                    >
                                        View all listings
                                    </Button>
                                )}
                            </div>

                            {listings.length === 0 && (
                                <H3>No listings found.</H3>
                            )}

                            {listings.length > 0 && (
                                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {listings.map((listing) => (
                                        <ListingPreview
                                            key={listing.id}
                                            listing={listing}
                                            showTags
                                            favouriteListings={
                                                favouriteListings
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between gap-6">
                                <H2>Reviews</H2>
                                {reviews.length > 0 && (
                                    <Button
                                        href={route('user-reviews.index', {
                                            user: user.id,
                                        })}
                                        theme="primary"
                                    >
                                        View all reviews
                                    </Button>
                                )}
                            </div>

                            {reviews.length === 0 && <H3>No reviews found.</H3>}

                            {reviews.length > 0 && (
                                <div className="flex flex-col gap-4">
                                    {reviews.map((review) => (
                                        <Review
                                            key={review.id}
                                            review={review}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
