import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import Button from '@/Components/common/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import Modal from '@/Components/Modal';
import RegisterPhoneNumberForm from '@/Components/forms/RegisterPhoneNumberForm';

interface Props {
    //
}

export default function Splash({}: Props) {
    const { url } = usePage();

    const [isSignupModalActive, setSignupModalActive] = React.useState(
        !!url.includes('signup')
    );

    return (
        <GuestLayout>
            <Head title="No Fees - No Fakes - Trade Local" />

            <div className="grid gap-x-12 gap-y-4 md:grid-cols-12 md:items-center">
                <div className="flex flex-col items-start gap-12 md:col-span-4 lg:col-span-6">
                    <div className="flex flex-col items-start gap-6">
                        <h1 className="flex max-w-2xl flex-col text-6xl font-black lg:text-7xl xl:text-8xl">
                            <span className="-mb-1 text-teal">
                                No&nbsp;fees.
                            </span>
                            <span className="-mb-1 text-teal">
                                No&nbsp;scams.
                            </span>
                            <span>Trade local.</span>
                        </h1>
                    </div>
                    <div className="flex flex-row items-center gap-6">
                        <Button
                            onClick={() => setSignupModalActive(true)}
                            theme="primary"
                        >
                            Sign up
                        </Button>
                        <Link
                            href={route('login')}
                            className="font-bold text-teal transition-opacity hover:opacity-50"
                        >
                            Login
                        </Link>
                    </div>
                </div>
                <img
                    src="/img/screenshots/splash-screenshot.png"
                    alt="NearYou app screenshot on iPhone"
                    className="h-auto w-full md:col-span-8 lg:col-span-6"
                />
            </div>

            <nav className="mt-auto flex flex-col items-start gap-x-12 gap-y-4 font-bold text-gray md:flex-row md:justify-center">
                <Link
                    className="transition-colors hover:text-teal"
                    href={route('terms-and-conditions')}
                >
                    Terms &amp; Conditions
                </Link>
                <Link
                    className="transition-colors hover:text-teal"
                    href={route('privacy-policy')}
                >
                    Privacy Policy
                </Link>
                <Link
                    className="transition-colors hover:text-teal"
                    href={route('support')}
                >
                    Support
                </Link>
            </nav>

            <Modal
                show={isSignupModalActive}
                onClose={() => setSignupModalActive(false)}
            >
                <div className="p-8">
                    <RegisterPhoneNumberForm />
                </div>
            </Modal>
        </GuestLayout>
    );
}
