import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import { useAuth } from '@/lib/auth';
import Button from '@/Components/common/Button';
import { handleChange, useSubmit } from '@/lib/forms';
import H2 from '@/Components/typography/H2';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}: Props) {
    const { user } = useAuth();

    const onSubmit = useSubmit({
        message: 'Profile saved!',
        preserveScroll: true,
    });

    const { data, setData, put, errors, processing } = useForm({
        username: user.username,
        name: user.name,
        email: user.email,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('profile.update'), onSubmit);
    }

    return (
        <section className={className}>
            <header>
                <H2>Profile Information</H2>

                <p className="mt-2 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6">
                <label>
                    Username
                    <input
                        id="username"
                        type="text"
                        name="username"
                        className={errors.username ? 'error' : ''}
                        value={data.username}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.username && (
                        <span className="error">{errors.username}</span>
                    )}
                </label>

                {/* <label>
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className={errors.name ? 'error' : ''}
                        value={data.name}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </label> */}

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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.&nbsp;
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-teal-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-end gap-4">
                    <Button type="submit" disabled={processing} theme="success">
                        Save profile
                    </Button>
                </div>
            </form>
        </section>
    );
}
