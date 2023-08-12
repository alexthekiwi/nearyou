import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';

interface Props {
    //
}

export default function ListingsIndex({}: Props) {
    return (
        <Layout>
            <Head title="Your Local Listings" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>List an item.</H1>
                </div>
            </div>
        </Layout>
    );
}
