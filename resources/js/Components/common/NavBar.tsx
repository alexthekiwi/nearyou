import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import cn from 'classnames';

interface NavBarProps extends PropsWithChildren {
    className?: string;
}

interface NavBarLinkProps extends PropsWithChildren {
    href: string;
}

const links = [
    { href: route('listings.index'), label: 'Browse' },
    { href: route('chat.index'), label: 'Chat' },
    { href: route('about.show'), label: 'About' },
    { href: route('community.index'), label: 'Community' },
];

export default function NavBar({ className = '' }: NavBarProps) {
    return (
        <nav
            className={cn(
                `flex justify-between gap-8 overflow-x-auto`,
                className
            )}
        >
            {links.map((link) => (
                <NavBarLink href={link.href} key={link.href}>
                    {link.label}
                </NavBarLink>
            ))}
        </nav>
    );
}

function NavBarLink({ href, children }: NavBarLinkProps) {
    const isActive = window?.location.pathname === new URL(href).pathname;

    return (
        <Link
            href={href}
            className={cn(
                'flex flex-col items-center gap-y-1 whitespace-nowrap py-2 font-bold transition-colors hover:text-gray-600',
                {
                    'text-gray-700': isActive,
                    'text-gray-400': !isActive,
                }
            )}
        >
            {children}
            {isActive && (
                <span className="block h-2 w-2 rounded-full bg-teal" />
            )}
        </Link>
    );
}
