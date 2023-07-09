import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Button from '@/Components/common/Button';
import Card from '@/Components/common/Card';
import Layout from '@/Layouts/Layout';
import { handleChange } from '@/lib/forms';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Layout>
            <Head title="Forgot Password" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

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
                        <div className="flex gap-6">
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Email Link
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
