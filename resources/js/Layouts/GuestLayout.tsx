import { PropsWithChildren } from 'react';
import { router, usePage } from '@inertiajs/react';
import Toasts from '@/Components/common/Toasts';
import Button from '@/Components/common/Button';
import Header from '@/Components/common/Header';
import Footer from '@/Components/common/Footer';

interface Props extends PropsWithChildren {
    background?: string;
}

export default function GuestLayout({ background, children }: Props) {
    const { props } = usePage();

    function handleLocalLogin() {
        router.post('/local-login', undefined, {});
    }

    return (
        <div
            className={`flex min-h-screen flex-col ${background || 'bg-white'}`}
        >
            <Header />
            <main className="container relative z-[2] flex h-screen min-h-[900px] flex-grow flex-col py-8 md:py-16">
                {children}
            </main>
            <Footer />
            <Toasts />
            {props.environment === 'local' && (
                <Button
                    type="button"
                    className="fixed bottom-4 right-4 z-[100] !px-6 !text-xs"
                    onClick={() => handleLocalLogin()}
                >
                    Admin login
                </Button>
            )}
        </div>
    );
}
