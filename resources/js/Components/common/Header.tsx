import { Link } from '@inertiajs/react';
import { useAuth } from '@/lib/auth';
import NavLink from './NavLink';
import Logo from './Logo';
import Dropdown from '../Dropdown';

export default function Header() {
    const { logout } = useAuth();

    function handleLogout(e: React.FormEvent) {
        e.preventDefault();

        logout();
    }

    return (
        <header className="sticky top-0 z-[100] w-full bg-white py-4 shadow-sm">
            <nav className="container flex items-center justify-between gap-8">
                <Link
                    href="/"
                    className="font-bold text-white transition-all hover:opacity-50"
                >
                    <Logo className="h-12" />
                </Link>

                <div className="flex items-center gap-6 font-bold text-black">
                    <NavLink href={route('home')}>Browse</NavLink>
                    <NavLink href={route('dashboard')}>Dashboard</NavLink>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="transition-colors hover:text-teal">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                    />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <ul className="flex flex-col items-start gap-3 p-4">
                                <li>
                                    <Link
                                        href={route('profile.edit')}
                                        className="transition-colors hover:text-teal"
                                    >
                                        My profile
                                    </Link>
                                </li>
                                <li>
                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            className="flex transition-colors hover:text-teal"
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </nav>
        </header>
    );
}
