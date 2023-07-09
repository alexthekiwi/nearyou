import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useAuth } from '@/lib/auth';
import H1 from '@/Components/typography/H1';

interface Props {
    //
}

export default function Home({}: Props) {
    const { user } = useAuth();

    return (
        <Layout>
            <Head title="Home" />

            <div className="container mb-24 mt-12 flex flex-col gap-12">
                <H1 className="pb-6">Kia ora {user.username}.</H1>
            </div>
        </Layout>
    );
}
