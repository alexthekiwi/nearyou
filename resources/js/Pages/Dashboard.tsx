import { MdManageAccounts } from 'react-icons/md';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useAuth } from '@/lib/auth';
import Card from '@/Components/common/Card';
import Button from '@/Components/common/Button';
import PageHeader from '@/Components/common/PageHeader';
import SetLocationForm from '@/Components/location/SetLocationForm';
import { useMessage } from '@/lib/message';
import Message from '@/Components/common/Message';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    const { user, logout } = useAuth();
    const message = useMessage();

    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="Kia ora!" />

                <div className="flex flex-col gap-6">
                    {message && <Message {...message} />}
                    <SetLocationForm />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {user.is_admin && (
                        <Card className="flex flex-col gap-8">
                            <Button
                                href={route('users.index')}
                                className="mt-auto"
                                theme="success"
                            >
                                Users
                            </Button>
                        </Card>
                    )}

                    <Card className="flex flex-col gap-8">
                        <Button
                            href={route('home')}
                            className="mt-auto"
                            theme="success"
                        >
                            Browse listings
                        </Button>
                    </Card>

                    <Card className="flex flex-col gap-8">
                        <Button
                            href={route('profile.edit')}
                            className="mt-auto"
                            theme="success"
                        >
                            My Account
                        </Button>
                    </Card>

                    <Card className="flex flex-col gap-8">
                        <Button
                            type="button"
                            className="mt-auto"
                            theme="success"
                            onClick={logout}
                        >
                            Log out
                        </Button>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
