import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Card from '@/Components/common/Card';
import { handleChange } from '@/lib/forms';
import Button from '@/Components/common/Button';
import Layout from '@/Layouts/Layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
                    <form className="flex flex-col gap-8" onSubmit={submit}>
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
