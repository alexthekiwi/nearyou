import { Link } from '@inertiajs/react';
import { HiOutlineUser } from 'react-icons/hi2';
import { useAuth } from '@/lib/auth';
import NavLink from './NavLink';
import Logo from './Logo';
import Dropdown from '../Dropdown';
import NavMenu from '../navigation/NavMenu';

export default function Header() {
    const { logout, isAuth } = useAuth();

    function handleLogout(e: React.FormEvent) {
        e.preventDefault();

        logout();
    }

    return (
        <header className="sticky top-0 z-[100] flex h-[80px] w-full items-center border-b border-gray-200 bg-white py-4">
            <nav className="container flex items-center justify-between gap-8">
                <Link
                    href="/"
                    className="font-bold text-white transition-all hover:opacity-50"
                >
                    <Logo className="h-10 md:h-12" showTagline />
                </Link>

                <div className="flex items-center gap-6 font-bold text-black">
                    {isAuth ? (
                        <>
                            <NavLink
                                href={route('listings.index')}
                                className="hidden md:inline-flex"
                            >
                                Browse listings
                            </NavLink>
                            <NavLink
                                href={route('about')}
                                className="hidden md:inline-flex"
                            >
                                About
                            </NavLink>
                            <NavLink
                                href={route('dashboard')}
                                className="hidden md:inline-flex"
                            >
                                Dashboard
                            </NavLink>

                            <NavMenu />
                        </>
                    ) : (
                        <>
                            <NavLink
                                href={route('about')}
                                className="hidden md:inline-flex"
                            >
                                About
                            </NavLink>
                            <NavLink
                                href={route('home', { signup: true })}
                                className="hidden md:inline-flex"
                            >
                                Sign up
                            </NavLink>
                            <NavLink
                                href={route('login')}
                                className="hidden md:inline-flex"
                            >
                                Login
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
