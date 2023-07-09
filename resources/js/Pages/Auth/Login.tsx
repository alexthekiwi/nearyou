import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Card from '@/Components/common/Card';
import { handleChange } from '@/lib/forms';
import Button from '@/Components/common/Button';
import Layout from '@/Layouts/Layout';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(
        () => () => {
            reset('password');
        },
        []
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Layout>
            <Head title="Log in" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-teal-600">
                            {status}
                        </div>
                    )}
                    <form className="flex flex-col gap-8" onSubmit={submit}>
                        <label>
                            Email
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.email && (
                                <span className="error">{errors.email}</span>
                            )}
                        </label>
                        <label>
                            Password
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </label>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                value={data.remember.toString()}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            <span>Remember me</span>
                        </label>
                        <div className="flex items-center gap-6">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
