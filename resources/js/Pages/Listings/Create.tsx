import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    //
}

export default function ListingsIndex({}: Props) {
    return (
        <Layout>
            <Head title="Your Local Listings" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="List an item" />
                </div>
            </div>
        </Layout>
    );
}
