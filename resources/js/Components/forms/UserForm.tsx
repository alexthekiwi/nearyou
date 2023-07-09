import React from 'react';
import { useForm } from '@inertiajs/react';
import { handleChange, useSubmit } from '@/lib/forms';
import Button from '../common/Button';
import { App } from '@/types';
import { useAuth } from '@/lib/auth';

interface Props {
    user?: App['Models']['User'];
}

export default function UserForm({ user }: Props) {
    const { user: authUser } = useAuth();

    const { data, setData, post, put, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        username: user?.username || '',
        password: '',
        password_confirmation: '',
        is_admin: user?.is_admin || false,
    });

    const message = user
        ? 'User updated!'
        : 'User created! A welcome email has been sent.';

    const onSubmit = useSubmit({ message });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (user) {
            put(`/users/${user.id}`, onSubmit);
            return;
        }

        post(`/users`, onSubmit);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <fieldset className="flex flex-col gap-6">
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
                        {errors.username && (
                            <span className="error">{errors.username}</span>
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

                    <div className="flex flex-col gap-6 md:flex-row">
                        <label className="flex-grow">
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
                            <span className="text-xs">
                                {user ? 'Leave blank to remain unchanged' : ''}
                            </span>
                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </label>

                        <label className="flex-grow">
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
                    </div>

                    {authUser.is_admin && (
                        <label className="flex flex-row gap-2">
                            <input
                                type="checkbox"
                                name="is_admin"
                                id="is_admin"
                                value="1"
                                checked={data.is_admin}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            Admin user?
                        </label>
                    )}
                </fieldset>

                <div className="flex justify-end gap-6">
                    <Button type="submit" theme="success">
                        Save user
                    </Button>
                </div>
            </form>
        </div>
    );
}
