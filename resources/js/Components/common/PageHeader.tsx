import cn from 'classnames';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import H1 from '../typography/H1';
import Breadcrumbs, { BreadcrumbProps } from './Breadcrumbs';

interface Props extends PropsWithChildren {
    className?: string;
    heading: string;
    showBreadcrumbs?: boolean;
}

export default function PageHeader({
    showBreadcrumbs = true,
    className = '',
    heading,
    children,
}: Props) {
    const { breadcrumbs } = usePage().props;

    return (
        <nav className="flex flex-col">
            <div
                className={cn(
                    className,
                    'mb-6 flex flex-col gap-6 border-b border-gray-300 pb-6'
                )}
            >
                {breadcrumbs && showBreadcrumbs && (
                    <Breadcrumbs
                        breadcrumbs={breadcrumbs as BreadcrumbProps[]}
                    />
                )}
                <H1>{heading}</H1>
            </div>

            {children && (
                <div className="flex items-start gap-4">{children}</div>
            )}
        </nav>
    );
}
