import { Head } from '@inertiajs/react';
import {
    HiOutlineLockClosed,
    HiOutlineTrash,
    HiOutlineUser,
} from 'react-icons/hi2';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Layout from '@/Layouts/Layout';
import PageHeader from '@/Components/common/PageHeader';
import Card from '@/Components/common/Card';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <Layout>
            <Head title="Profile" />
            <div className="container mb-24 mt-6 flex flex-col gap-12">
                <PageHeader heading="Profile" />

                <div className="mx-auto grid max-w-2xl items-start gap-12">
                    <Card className="flex flex-col items-start gap-6">
                        <div className="rounded-full bg-teal-xlight p-4">
                            <HiOutlineUser className="h-8 w-8" />
                        </div>
                        <div className="w-full">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </Card>
                    <Card className="flex flex-col items-start gap-6">
                        <div className="rounded-full bg-teal-xlight p-4">
                            <HiOutlineLockClosed className="h-8 w-8" />
                        </div>
                        <div className="w-full">
                            <UpdatePasswordForm />
                        </div>
                    </Card>
                    <Card className="flex flex-col items-start gap-6">
                        <div className="rounded-full bg-red-50 p-4">
                            <HiOutlineTrash className="h-8 w-8" />
                        </div>
                        <div className="w-full">
                            <DeleteUserForm />
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
