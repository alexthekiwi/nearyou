import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import UserForm from '@/Components/forms/UserForm';
import Button from '@/Components/common/Button';
import Card from '@/Components/common/Card';
import PageHeader from '@/Components/common/PageHeader';
import SupportRequestForm from '@/Components/forms/SupportRequestForm';

interface Props {
    //
}

export default function SupportRequestsCreate({}: Props) {
    return (
        <Layout>
            <Head title="Create | Users" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="New support request">
                    <Button className="text-sm" href="/support">
                        Go back
                    </Button>
                </PageHeader>

                <div className="mx-auto w-full max-w-2xl">
                    <SupportRequestForm />
                </div>
            </div>
        </Layout>
    );
}
