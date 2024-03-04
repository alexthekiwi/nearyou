import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { LinkItem } from '@/types';
import { selectSomeUnread } from '@/lib/chatStore';
import NewIcon from './NewIcon';

interface NavBarProps extends PropsWithChildren {
    className?: string;
    links?: LinkItem[];
}

interface NavBarLinkProps extends PropsWithChildren {
    href: string;
}

export default function NavBar({ links = [], className = '' }: NavBarProps) {
    const someUnread = useSelector(selectSomeUnread);

    if (links.length === 0) {
        return null;
    }

    return (
        <nav className={cn('flex w-full justify-center', className)}>
            <div className="flex max-w-lg flex-grow justify-between gap-8 overflow-x-auto">
                {links.map((link) => (
                    <NavBarLink href={link.href} key={link.href}>
                        {link.label}

                        {link.label === 'Chat' && someUnread && (
                            <NewIcon className="absolute right-[-1rem] top-0" />
                        )}
                    </NavBarLink>
                ))}
            </div>
        </nav>
    );
}

function NavBarLink({ href, children }: NavBarLinkProps) {
    const isActive = window?.location.pathname === new URL(href).pathname;

    return (
        <Link
            href={href}
            className={cn(
                'relative flex flex-col items-center gap-y-1 whitespace-nowrap py-3 font-bold transition-colors hover:text-gray-600',
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
