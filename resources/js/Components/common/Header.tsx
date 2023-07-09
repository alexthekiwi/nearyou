import { Link } from '@inertiajs/react';
import { useAuth } from '@/lib/auth';

export default function Header() {
    const { isAuth } = useAuth();

    return (
        <header className="relative z-[100] bg-teal py-4">
            <nav className="container flex items-center justify-between gap-8">
                <a
                    href="https://www.nzhf.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white transition-all hover:opacity-75"
                >
                    Near You
                </a>

                <div className="flex items-center gap-6 font-bold text-white">
                    <Link href="/">Home</Link>
                    {isAuth && (
                        <Link
                            href="/dashboard"
                            className="transition-all hover:opacity-75"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
