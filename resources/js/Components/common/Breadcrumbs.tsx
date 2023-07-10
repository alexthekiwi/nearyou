import { Link } from '@inertiajs/react';
import cn from 'classnames';

export type BreadcrumbProps = {
    current?: boolean;
    title: string;
    url?: string;
};

export type Props = {
    breadcrumbs: BreadcrumbProps[];
};

export default function Breadcrumbs({ breadcrumbs }: Props) {
    return (
        <nav className="-pb-px flex w-full flex-wrap gap-6 border-b border-gray-300">
            {breadcrumbs.map((breadcrumb, index) => (
                <div key={index} className="-mb-px flex items-center gap-3">
                    {breadcrumb.url ? (
                        <Link
                            href={breadcrumb.url}
                            className={cn('border-b pb-3 hover:underline', {
                                'border-black font-bold': breadcrumb.current,
                                'border-gray-300': !breadcrumb.current,
                            })}
                        >
                            {breadcrumb.title}
                        </Link>
                    ) : (
                        <span className="font-bold">{breadcrumb.title}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
