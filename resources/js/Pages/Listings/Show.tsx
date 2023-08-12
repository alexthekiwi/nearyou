import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App } from '@/types';

interface Props {
    listing: App['Models']['Listing'];
}

export default function ListingsShow({ listing }: Props) {
    console.log(listing);

    return (
        <Layout>
            <Head title="Home" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>{listing.title}</H1>
                </div>
            </div>
        </Layout>
    );
}
