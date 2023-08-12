import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';

interface Props {
    //
}

export default function ReviewsIndex({}: Props) {
    return (
        <Layout>
            <Head title="Reviews" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>Reviews</H1>
                </div>
            </div>
        </Layout>
    );
}
