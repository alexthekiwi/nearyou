import React from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/common/Button';
import { handleChange, useSubmit } from '@/lib/forms';
import H2 from '@/Components/typography/H2';
import { useToast } from '@/lib/toast';

interface Props {
    className?: string;
}

export default function UpdatePasswordForm({ className }: Props) {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { addToast } = useToast();

    function onSuccess() {
        reset();
        addToast({
            message: 'Password updated successfully!',
            status: 'success',
        });
    }

    function onError() {
        if (errors.password) {
            reset('password_confirmation');
        }

        if (errors.current_password) {
            reset('current_password');
        }
    }

    const onSubmit = useSubmit({
        message: 'Password updated!',
        onSuccess,
        onError,
        preserveScroll: true,
    });

    function updatePassword(e: React.FormEvent) {
        e.preventDefault();

        put(route('password.update'), onSubmit);
    }

    return (
        <section className={className}>
            <header>
                <H2>Update password</H2>

                <p className="mt-2 text-sm text-gray-600">
                    Keep your account secure by never sharing your password.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6">
                <label>
                    Password
                    <input
                        id="current_password"
                        type="password"
                        name="current_password"
                        className={errors.current_password ? 'error' : ''}
                        value={data.current_password}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.current_password && (
                        <span className="error">{errors.current_password}</span>
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
                <label>
                    Confirm password
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        className={errors.password_confirmation ? 'error' : ''}
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

                <div className="flex items-center justify-end gap-4">
                    <Button type="submit" disabled={processing} theme="success">
                        Update password
                    </Button>
                </div>
            </form>
        </section>
    );
}
