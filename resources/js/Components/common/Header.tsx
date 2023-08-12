import { Link } from '@inertiajs/react';
import { HiOutlineUser } from 'react-icons/hi2';
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
        <header className="md: relative z-[100] w-full bg-white py-4 shadow-sm">
            <nav className="container flex items-center justify-between gap-8">
                <Link
                    href="/"
                    className="font-bold text-white transition-all hover:opacity-50"
                >
                    <Logo className="h-10 md:h-12" />
                </Link>

                <div className="flex items-center gap-6 font-bold text-black">
                    <NavLink
                        href={route('home')}
                        className="hidden md:inline-flex"
                    >
                        Browse listings
                    </NavLink>
                    <NavLink
                        href={route('dashboard')}
                        className="hidden md:inline-flex"
                    >
                        Dashboard
                    </NavLink>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="transition-colors hover:cursor-pointer hover:text-teal">
                                <HiOutlineUser className="h-6 w-6" />
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <ul className="flex flex-col items-start gap-3 p-4">
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        className="transition-colors hover:text-teal"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
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
