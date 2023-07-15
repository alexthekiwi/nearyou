import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import H2 from '../typography/H2';
import Button from '../common/Button';
import { useSubmit } from '@/lib/forms';
import Message from '../common/Message';

type Stage = 'phone_number' | 'verification_code';

export default function RegisterPhoneNumberForm() {
    const [stage, setStage] = React.useState<Stage>('phone_number');

    const { data, setData, post, errors, reset } = useForm({
        country_code: '+64',
        phone_number: '',
        verification_code: '',
    });

    const onRegister = useSubmit({
        preserveScroll: true,
        message: 'Verification code sent!',
        onSuccess: () => {
            setStage('verification_code');
        },
    });

    const onVerify = useSubmit({
        preserveScroll: false,
        message: 'Phone verification complete!',
    });

    function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
        let { value } = e.currentTarget;

        // Remove all non-numeric characters
        value = value.replace(/\D/g, '');

        setData({
            ...data,
            [e.currentTarget.name]: value,
        });
    }

    function handleReset() {
        setStage('phone_number');
        reset();
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (stage === 'phone_number') {
            return post('/signup', onRegister);
        }

        return post('/signup/verify', onVerify);
    }

    return (
        <div className="flex flex-col gap-12">
            <H2 as="h1">
                {stage === 'phone_number'
                    ? "What's your phone number?"
                    : `Enter the code we sent to ${data.country_code}${data.phone_number}.`}
            </H2>

            <div className="flex flex-col gap-3">
                {Object.values(errors).map((error) => (
                    <Message key={error} message={error} status="error" />
                ))}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-x-4 gap-y-6 lg:flex-row lg:flex-wrap"
                >
                    {stage === 'phone_number' && (
                        <label className="form-control group relative flex !max-w-none flex-grow flex-row items-center focus-within:border-teal focus-within:ring focus-within:ring-teal focus-within:ring-opacity-50">
                            <span className="sr-only">
                                Enter your phone number
                            </span>
                            <span className="pointer-events-none !text-base">
                                {data.country_code}
                            </span>
                            <input
                                type="number"
                                name="phone_number"
                                id="phone_number"
                                placeholder="21 234 5678"
                                className="flex-grow !border-0 !p-0 !transition-none [appearance:textfield] focus:!ring-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                value={data.phone_number}
                                onChange={handleChange}
                            />
                        </label>
                    )}

                    {stage === 'verification_code' && (
                        <label
                            htmlFor="verification_code"
                            className="form-control group relative flex !max-w-none flex-grow flex-row items-center focus-within:border-teal focus-within:ring focus-within:ring-teal focus-within:ring-opacity-50"
                        >
                            <input
                                type="number"
                                name="verification_code"
                                id="verification_code"
                                className="flex-grow !border-0 !p-0 !transition-none [appearance:textfield] focus:!ring-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                value={data.verification_code}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <Button type="submit" theme="primary">
                        {stage === 'phone_number' ? 'Send code' : 'Verify code'}
                    </Button>
                </form>

                {stage === 'phone_number' && (
                    <p className="text-sm font-bold">
                        We’ll text you to confirm your number. Standard message
                        and data rates apply.
                    </p>
                )}

                {stage === 'verification_code' && (
                    <p className="text-sm font-bold">
                        This may take up to 2 minutes to come through.{' '}
                        <button className="underline" onClick={handleReset}>
                            Incorrect phone number?
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
