import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Button from '@/Components/common/Button';
import Logo from '@/Components/common/Logo';
import GuestLayout from '@/Layouts/GuestLayout';
import Modal from '@/Components/Modal';
import RegisterPhoneNumberForm from '@/Components/forms/RegisterPhoneNumberForm';

interface Props {
    //
}

export default function Splash({}: Props) {
    const [isSignupModalActive, setSignupModalActive] = React.useState(false);

    return (
        <GuestLayout>
            <Head title="No Fees - No Fakes - Trade Local" />

            <div className="my-auto grid gap-x-12 gap-y-4 md:grid-cols-12 md:items-center">
                <div className="flex flex-col items-start gap-12 md:col-span-4 lg:col-span-6">
                    <div className="flex flex-col items-start gap-6">
                        <Logo className="h-12" />
                        <h1 className="flex max-w-2xl flex-col text-6xl font-black lg:text-7xl xl:text-8xl">
                            <span className="-mb-1 text-teal">
                                No&nbsp;fees.
                            </span>
                            <span className="-mb-1 text-teal">
                                No&nbsp;fakes.
                            </span>
                            <span>Trade local.</span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                        <Button
                            onClick={() => setSignupModalActive(true)}
                            theme="primary"
                        >
                            Get started
                        </Button>
                        <Link
                            href="/about"
                            className="font-bold text-teal transition-opacity hover:opacity-50"
                        >
                            About us
                        </Link>
                    </div>
                </div>
                <img
                    src="/img/screenshots/splash-screenshot.png"
                    alt="NearYou app screenshot on iPhone"
                    className="h-auto w-full md:col-span-8 lg:col-span-6"
                />
            </div>

            <nav className="flex flex-col items-start gap-x-12 gap-y-4 font-bold text-gray md:flex-row md:justify-center">
                <Link
                    className="transition-colors hover:text-teal"
                    href="/terms-and-conditions"
                >
                    Terms &amp; Conditions
                </Link>
                <Link
                    className="transition-colors hover:text-teal"
                    href="/privacy-policy"
                >
                    Privacy Policy
                </Link>
                <Link
                    className="transition-colors hover:text-teal"
                    href="/support"
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