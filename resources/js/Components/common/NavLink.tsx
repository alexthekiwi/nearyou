import { Link } from '@inertiajs/react';
import cn from 'classnames';
import React from 'react';

interface Props extends React.PropsWithChildren {
    href: string;
    className?: string;
}

export default function NavLink({ href, className = '', children }: Props) {
    const isActive = window?.location.pathname === new URL(href).pathname;

    return (
        <Link
            href={href}
            className={cn(className, 'transition-colors hover:text-teal', {
                'text-teal': isActive,
            })}
        >
            {children}
        </Link>
    );
}
