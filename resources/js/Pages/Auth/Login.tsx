import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Card from '@/Components/common/Card';
import { handleChange } from '@/lib/forms';
import Button from '@/Components/common/Button';
import Layout from '@/Layouts/Layout';
import GuestLayout from '@/Layouts/GuestLayout';
import Logo from '@/Components/common/Logo';
import H2 from '@/Components/typography/H2';
import Message from '@/Components/common/Message';

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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('login'));
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col gap-8">
                <Logo className="mx-auto h-12" />
                <div className="mx-auto w-full max-w-lg">
                    <H2 className="mb-6">Login</H2>

                    <Message status="success" className="mb-6">
                        {status}
                    </Message>

                    <form
                        className="flex flex-col gap-8"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Email
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className={errors.email ? 'error' : ''}
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
                                className={errors.password ? 'error' : ''}
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
                </div>
            </div>
        </GuestLayout>
    );
}
