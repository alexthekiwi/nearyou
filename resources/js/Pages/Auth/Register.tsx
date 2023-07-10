import { useEffect, FormEventHandler } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card from '@/Components/common/Card';
import { handleChange, useSubmit } from '@/lib/forms';
import Button from '@/Components/common/Button';
import Layout from '@/Layouts/Layout';

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    function handleRemoveVerifiedPhoneNumber() {
        router.delete('/signup/verify', onRemovePhoneNumber);
    }

    return (
        <Layout>
            <Head title="Register" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-teal-600">
                            {status}
                        </div>
                    )}

                    <div className="mb-4 flex flex-col items-start gap-1 rounded-xl bg-gray-100 p-4">
                        <p className="font-bold text-teal">
                            You have verified your phone number as {phoneNumber}
                            .{' '}
                        </p>
                        <button
                            onClick={handleRemoveVerifiedPhoneNumber}
                            className="underline"
                        >
                            Change phone number?
                        </button>
                    </div>

                    <form className="flex flex-col gap-8" onSubmit={submit}>
                        <label>
                            Username
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            <span className="text-sm">
                                This is what is shown to other traders to
                                protect your privacy. We'll create one for you
                                if you leave this field blank.
                            </span>
                            {errors.username && (
                                <span className="error">{errors.name}</span>
                            )}
                        </label>

                        <label>
                            Name
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.name && (
                                <span className="error">{errors.name}</span>
                            )}
                        </label>

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
                                id="password_confirmation"
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
                </Card>
            </div>
        </Layout>
    );
}
