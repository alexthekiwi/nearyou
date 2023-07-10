import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Layout from '@/Layouts/Layout';
import Card from '@/Components/common/Card';
import PageHeader from '@/Components/common/PageHeader';
import Button from '@/Components/common/Button';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <Layout>
            <Head title="Profile" />
            <div className="container mb-24 mt-12 flex flex-col gap-12">
                <PageHeader heading="Profile" />

                <div className="mx-auto flex max-w-2xl flex-col gap-12">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <UpdatePasswordForm />
                    <DeleteUserForm />
                </div>
            </div>
        </Layout>
    );
}
