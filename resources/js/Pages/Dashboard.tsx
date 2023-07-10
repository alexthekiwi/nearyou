import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useAuth } from '@/lib/auth';
import H1 from '@/Components/typography/H1';
import Card from '@/Components/common/Card';
import Button from '@/Components/common/Button';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    const { user } = useAuth();

    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container mb-24 mt-12 flex flex-col gap-12">
                <PageHeader heading="Kia ora!" />

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
                            method="post"
                            href="/logout"
                            className="mt-auto"
                            theme="success"
                        >
                            Log out
                        </Button>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
