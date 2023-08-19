import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import type { App, LinkItem, PaginatedResults } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import Review from '@/Components/reviews/Review';
import Pagination from '@/Components/common/Pagination';

interface Props {
    user: App['Models']['User'];
    listings: PaginatedResults<App['Models']['Listing'][]>;
    reviews: PaginatedResults<App['Models']['Review'][]>;
}

export default function UserReviewsIndex({ user, listings, reviews }: Props) {
    const links: LinkItem[] = [
        { label: 'Profile', href: route('users.show', user.id) },
        { label: 'Listings', href: route('user-listings.index', user.id) },
        { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    return (
        <Layout>
            <Head title={`${user.username} Reviews`} />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading={`${user.username} reviews`} />

                <div className="flex flex-col gap-y-4">
                    <NavBar links={links} />

                    <div className="flex flex-col gap-4">
                        {reviews.data.map((review) => (
                            <Review key={review.id} review={review} />
                        ))}
                    </div>
                    <Pagination results={reviews} showPerPageSelector={false} />
                </div>
            </div>
        </Layout>
    );
}
