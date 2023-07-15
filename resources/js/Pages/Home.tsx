import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App } from '@/types';
import { formatMoney } from '@/lib/money';
import ListingPreview from '@/Components/listings/ListingPreview';

interface Props {
    listings: App['Models']['Listing'][];
}

export default function Home({ listings }: Props) {
    return (
        <Layout>
            <Head title="Home" />
            <div className="container my-12 flex flex-col gap-8">
                <H1>Your local listings.</H1>

                <div className="grid gap-6">
                    {listings.map((listing) => (
                        <ListingPreview key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
