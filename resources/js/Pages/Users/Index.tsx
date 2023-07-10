import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Button from '@/Components/common/Button';
import { PaginatedResults } from '@/types';
import Pagination from '@/Components/common/Pagination';
import SearchBar from '@/Components/common/SearchBar';
import { useAuth } from '@/lib/auth';
import { useSubmit } from '@/lib/forms';
import Table from '@/Components/tables/Table';
import TableRow from '@/Components/tables/TableRow';
import TableHeader from '@/Components/tables/TableHeader';
import TableHeading from '@/Components/tables/TableHeading';
import TableBody from '@/Components/tables/TableBody';
import TableData from '@/Components/tables/TableData';
import TableActions from '@/Components/tables/TableActions';
import type { App } from '@/types';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    users: PaginatedResults<App['Models']['User'][]>;
}

export default function UsersIndex({ users }: Props) {
    const { can } = useAuth();

    const isAdmin = can('admin');

    const onProxy = useSubmit({
        message: 'You are now impersonating another user.',
    });

    const onDelete = useSubmit({
        message: 'User deleted successfully.',
    });

    function handleUserProxy(id: number) {
        if (!isAdmin) {
            return;
        }

        router.post('/user-proxy', { user_id: id }, onProxy);
    }

    function handleDeleteUser(user: App['Models']['User']) {
        if (!confirm(`Are you sure you want to delete ${user.name}?`)) {
            return;
        }

        router.delete(`/users/${user.id}`, onDelete);
    }

    return (
        <Layout>
            <Head title="Users" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="Users">
                    <Button
                        href="/users/create"
                        theme="success"
                        className="text-sm"
                    >
                        Create user
                    </Button>
                </PageHeader>

                <SearchBar path={route('users.index')} />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Email</TableHeading>
                            <TableHeading className="text-right">
                                Actions
                            </TableHeading>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableData className="whitespace-nowrap">
                                    {user.name}
                                </TableData>
                                <TableData className="whitespace-nowrap">
                                    {user.email}
                                </TableData>
                                <TableActions>
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="underline"
                                    >
                                        Edit
                                    </Link>

                                    {isAdmin && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleUserProxy(user.id)
                                            }
                                            className="underline"
                                        >
                                            Impersonate
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteUser(user)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </TableActions>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {users.data.length === 0 && (
                    <p className="text-center">No results found</p>
                )}

                <Pagination
                    results={users}
                    sortOptions={[
                        { name: 'Name, asc', value: 'name_asc' },
                        { name: 'Name, desc', value: 'name_desc' },
                        { name: 'Email, asc', value: 'email_asc' },
                        { name: 'Email, desc', value: 'email_desc' },
                    ]}
                />
            </div>
        </Layout>
    );
}
