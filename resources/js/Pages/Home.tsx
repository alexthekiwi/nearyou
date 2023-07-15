import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import SetLocationForm from '@/Components/location/SetLocationForm';
import { useAuth } from '@/lib/auth';

interface Props {
    //
}

export default function Home({}: Props) {
    return (
        <Layout>
            <Head title="Home" />
            <div className="container">TODO: Listings go here.</div>
        </Layout>
    );
}
