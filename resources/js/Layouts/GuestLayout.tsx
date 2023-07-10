import { PropsWithChildren } from 'react';
import Toasts from '@/Components/common/Toasts';

interface Props extends PropsWithChildren {
    background?: string;
}

export default function GuestLayout({ background, children }: Props) {
    return (
        <div
            className={`flex min-h-screen flex-col ${background || 'bg-white'}`}
        >
            <main className="container relative z-[2] flex h-screen min-h-[900px] flex-grow flex-col py-8 md:py-16">
                {children}
            </main>
            <div className="h-24" />
            <Toasts />
        </div>
    );
}
