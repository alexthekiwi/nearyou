import { Link } from '@inertiajs/react';
import { useAuth } from '@/lib/auth';
import NavLink from './NavLink';
import Logo from './Logo';

export default function Header() {
    const { isAuth } = useAuth();

    return (
        <header className="fixed top-0 z-[100] w-full bg-white py-4 shadow-sm">
            <nav className="container flex items-center justify-between gap-8">
                <Link
                    href="/"
                    className="font-bold text-white transition-all hover:opacity-50"
                >
                    <Logo className="h-12" />
                </Link>

                <div className="flex items-center gap-6 font-bold text-black">
                    <NavLink href="/">Browse</NavLink>
                    {isAuth && <NavLink href="/dashboard">Dashboard</NavLink>}
                </div>
            </nav>
        </header>
    );
}
