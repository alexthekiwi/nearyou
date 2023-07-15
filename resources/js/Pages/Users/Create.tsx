import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import UserForm from '@/Components/forms/UserForm';
import Button from '@/Components/common/Button';
import Card from '@/Components/common/Card';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    //
}

export default function UsersCreate({}: Props) {
    return (
        <Layout>
            <Head title="Create | Users" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="Users">
                    <Button className="text-sm" href="/users">
                        Go back
                    </Button>
                </PageHeader>

                <div className="mx-auto w-full max-w-2xl rounded-lg bg-teal-xlight p-6">
                    <UserForm />
                </div>
            </div>
        </Layout>
    );
}
