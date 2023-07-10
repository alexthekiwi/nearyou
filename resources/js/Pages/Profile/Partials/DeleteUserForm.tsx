import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/common/Modal';
import Button from '@/Components/common/Button';
import { handleChange, useSubmit } from '@/lib/forms';
import H2 from '@/Components/typography/H2';

interface Props {
    className?: string;
}

export default function DeleteUserForm({ className = '' }: Props) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    function onSuccess() {
        closeModal();
        reset();
    }

    function onError() {
        passwordInput.current?.focus();
        reset();
    }

    const onDelete = useSubmit({
        message: 'Account deleted successfully',
        onSuccess,
        onError,
        preserveScroll: true,
    });

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    function confirmUserDeletion() {
        setConfirmingUserDeletion(true);
    }

    function deleteUser(e: React.FormEvent) {
        e.preventDefault();

        destroy(route('profile.destroy'), onDelete);
    }

    function closeModal() {
        setConfirmingUserDeletion(false);

        reset();
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <H2>Delete Account</H2>
                <p className="mt-3 text-sm">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <div className="flex justify-end">
                <Button theme="danger" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser}>
                    <p>
                        Please enter your password to confirm you would like to
                        permanently delete your account. Please note, there is
                        no way to recover this.
                    </p>

                    <label>
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className={errors.password ? 'error' : ''}
                            onChange={(e) =>
                                handleChange({ event: e, data, setData })
                            }
                        />
                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </label>

                    <div className="mt-6 flex justify-end gap-6">
                        <Button type="button" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                            theme="danger"
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
