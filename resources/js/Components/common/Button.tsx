import { Link } from '@inertiajs/react';
import cn from 'classnames';

export interface ButtonProps {
    className?: string;
    theme?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default';
    href?: string;
    target?: '_blank' | '_self';
    onClick?: Function;
    type?: 'button' | 'submit';
    children: React.ReactNode;
    disabled?: boolean;
    as?: 'link' | 'button' | 'a';
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
}

export default function Button({
    className,
    href,
    theme = 'default',
    target,
    onClick,
    type,
    children,
    disabled = false,
    as,
    method = 'get',
}: ButtonProps) {
    const baseClasses =
        'inline-flex items-center gap-3 font-bold justify-center text-center rounded-xl transition-all py-3 px-6 xl:py-4 xl:px-12 hover:opacity-75';

    const themeClass =
        (theme === 'primary' && 'bg-teal text-white') ||
        (theme === 'success' && 'bg-teal text-white') ||
        (theme === 'info' && 'bg-blue-400 text-white') ||
        (theme === 'danger' && 'bg-red-500 text-white') ||
        (theme === 'warning' && 'bg-yellow-400 text-white') ||
        'bg-gray-600 text-white';

    const classes = cn(className, themeClass, baseClasses);

    if (onClick) {
        return (
            <button
                className={classes}
                type={type ?? 'button'}
                onClick={(e: React.MouseEvent) => onClick(e)}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    if (type) {
        return (
            <button
                className={classes}
                type={type ?? 'button'}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    if (href) {
        if (href.includes('http') || target === '_blank' || as === 'a') {
            return (
                <a href={href} target={target ?? '_self'} className={classes}>
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={classes} method={method}>
                {children}
            </Link>
        );
    }

    return <p className="text-sm text-red-500">[Invalid button]</p>;
}
