import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { handleChange } from '@/lib/forms';
import Button from '@/Components/common/Button';
import Message from '@/Components/common/Message';
import H2 from '@/Components/typography/H2';
import Logo from '@/Components/common/Logo';
import GuestLayout from '@/Layouts/GuestLayout';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    useEffect(
        () => () => {
            reset('password', 'password_confirmation');
        },
        []
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('password.store'));
    }

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="flex flex-col gap-8">
                <Logo className="mx-auto h-12" />
                <div className="mx-auto w-full max-w-lg">
                    <H2 className="mb-6">Reset your password</H2>

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
                        <label>
                            Confirm password
                            <input
                                id="password"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.password_confirmation && (
                                <span className="error">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </label>
                        <div className="flex gap-6">
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
