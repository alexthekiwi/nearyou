import { PropsWithChildren } from 'react';
import Toasts from '@/Components/common/Toasts';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <main className="container relative z-[2] flex h-screen min-h-[900px] flex-grow flex-col py-16 pb-24">
                {children}
            </main>
            <Toasts />
        </div>
    );
}
