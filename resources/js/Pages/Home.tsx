import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import Listings from '@/Components/listings/Listings';

interface Props {
    listings: PaginatedResults<App['Models']['Listing'][]>;
}

export default function Home({ listings }: Props) {
    return (
        <Layout>
            <Head title="Home" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>Your local listings.</H1>
                </div>

                <Listings data={listings} />
            </div>
        </Layout>
    );
}
