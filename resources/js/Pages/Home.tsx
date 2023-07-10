import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';

interface Props {
    //
}

export default function Home({}: Props) {
    return (
        <Layout>
            <Head title="Home" />
            <H1>Home</H1>
        </Layout>
    );
}
