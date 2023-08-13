import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/common/Button';
import { handleChange } from '@/lib/forms';
import GuestLayout from '@/Layouts/GuestLayout';
import Logo from '@/Components/common/Logo';
import H2 from '@/Components/typography/H2';
import Message from '@/Components/common/Message';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('password.email'));
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col gap-8">
                <div className="mx-auto w-full max-w-lg">
                    <H2 className="mb-6">Reset your password</H2>

                    <Message status="success" className="mb-6">
                        {status}
                    </Message>

                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

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
                        <div className="flex items-center justify-between gap-6">
                            <Link href="/login" className="text-sm underline">
                                Back to login
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Email Link
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
