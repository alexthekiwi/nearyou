import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import PageHeader from '@/Components/common/PageHeader';
import SetLocationForm from '@/Components/location/SetLocationForm';
import { useMessage } from '@/lib/message';
import Message from '@/Components/common/Message';
import DashNav from '@/Components/navigation/DashNav';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    const message = useMessage();

    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container mb-24 mt-6 flex flex-col gap-8">
                <PageHeader heading="Kia ora!" />

                <div className="flex flex-col items-start gap-6">
                    {message && <Message {...message} />}
                    <SetLocationForm />
                </div>

                <DashNav />
            </div>
        </Layout>
    );
}
