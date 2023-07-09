import { PropsWithChildren } from 'react';
import Toasts from '@/Components/common/Toasts';
import Footer from '@/Components/common/Footer';
import Header from '@/Components/common/Header';
import UserImpersonationBar from '@/Components/common/UserImpersonationBar';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="relative z-[2] flex-grow pb-24 pt-12">
                {children}
            </main>
            <Footer />
            <Toasts />
            <UserImpersonationBar />
        </div>
    );
}
