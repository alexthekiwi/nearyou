import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import UserForm from '@/Components/forms/UserForm';
import Button from '@/Components/common/Button';
import Card from '@/Components/common/Card';
import type { App } from '@/types';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    user: App['Models']['User'];
}

export default function UsersEdit({ user }: Props) {
    return (
        <Layout>
            <Head title={`${user.name} | Users`} />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading={`Edit user: ${user.name}`}>
                    <Button className="text-sm" href="/users">
                        Go back
                    </Button>
                </PageHeader>

                <div className="mx-auto w-full max-w-2xl rounded-lg bg-teal-xlight p-6">
                    <UserForm user={user} />
                </div>
            </div>
        </Layout>
    );
}
