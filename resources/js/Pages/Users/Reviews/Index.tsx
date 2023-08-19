import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import type { App, LinkItem, PaginatedResults } from '@/types';
import PageHeader from '@/Components/common/PageHeader';
import NavBar from '@/Components/common/NavBar';
import Review from '@/Components/reviews/Review';
import Pagination from '@/Components/common/Pagination';
import { useAuth } from '@/lib/auth';
import H3 from '@/Components/typography/H3';

interface Props {
    user: App['Models']['User'];
    reviews: PaginatedResults<App['Models']['Review'][]>;
}

export default function UserReviewsIndex({ user, reviews }: Props) {
    const { user: authUser } = useAuth();

    const links: LinkItem[] = [
        { label: 'Profile', href: route('users.show', user.id) },
        { label: 'Listings', href: route('user-listings.index', user.id) },
        { label: 'Reviews', href: route('user-reviews.index', user.id) },
    ];

    const title =
        authUser.id === user.id ? 'My reviews' : `Reviews for ${user.username}`;

    return (
        <Layout>
            <Head title={title} />

            <div className="container mb-24 mt-6 flex flex-col gap-8">
                <PageHeader heading={title} />

                <div className="flex flex-col gap-y-4">
                    <NavBar links={links} />

                    <div className="mx-auto mt-5 grid max-w-5xl gap-12">
                        {reviews.data.length === 0 && (
                            <H3 className="text-center">No reviews found.</H3>
                        )}

                        <div className="flex flex-col gap-4">
                            {reviews.data.map((review) => (
                                <Review key={review.id} review={review} />
                            ))}
                        </div>
                        <Pagination
                            results={reviews}
                            showPerPageSelector={false}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
