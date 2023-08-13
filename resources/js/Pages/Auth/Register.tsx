import { useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { handleChange, useSubmit } from '@/lib/forms';
import Button from '@/Components/common/Button';
import H2 from '@/Components/typography/H2';
import GuestLayout from '@/Layouts/GuestLayout';
import Logo from '@/Components/common/Logo';
import Message from '@/Components/common/Message';

interface Props {
    phoneNumber: string;
}

export default function Register({ phoneNumber }: Props) {
    const onRemovePhoneNumber = useSubmit({ message: 'Phone number reset!' });

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        name: '',
        email: '',
        phone: '',
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

        post(route('register'));
    }

    function handleRemoveVerifiedPhoneNumber() {
        router.delete('/signup/verify', onRemovePhoneNumber);
    }

    return (
        <GuestLayout background="">
            <Head title="Register" />

            <div className="container flex flex-col gap-8">
                <div className="mx-auto w-full max-w-lg">
                    <H2 className="mb-6">Create your account</H2>

                    {status && (
                        <div className="mb-6 text-sm font-medium text-teal-600">
                            {status}
                        </div>
                    )}

                    <Message className="mb-6" status="success">
                        <div className="flex flex-col items-start gap-1">
                            <p className="font-bold text-teal">
                                Your verified phone number is {phoneNumber}.{' '}
                            </p>
                            <button
                                onClick={handleRemoveVerifiedPhoneNumber}
                                className="text-black underline"
                            >
                                Change phone number?
                            </button>
                        </div>
                    </Message>

                    <form
                        className="flex w-full flex-col gap-8"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Username
                            <input
                                id="username"
                                type="text"
                                name="username"
                                className={errors.username ? 'error' : ''}
                                value={data.username}
                                onChange={(e) =>
                                    handleChange({
                                        event: e,
                                        data,
                                        setData,
                                    })
                                }
                            />
                            <span className="text-sm">
                                This is what is shown to other traders to
                                protect your privacy.
                                <br />
                                It can be your real name if you like.
                            </span>
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
                                    handleChange({
                                        event: e,
                                        data,
                                        setData,
                                    })
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
                                    handleChange({
                                        event: e,
                                        data,
                                        setData,
                                    })
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
                                    handleChange({
                                        event: e,
                                        data,
                                        setData,
                                    })
                                }
                            />
                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </label>
                        <label>
                            Confirm password
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    handleChange({
                                        event: e,
                                        data,
                                        setData,
                                    })
                                }
                            />
                            {errors.password_confirmation && (
                                <span className="error">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </label>
                        <div className="flex items-center gap-6">
                            <Link
                                href={route('login')}
                                className="text-sm underline"
                            >
                                Already registered?
                            </Link>
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
