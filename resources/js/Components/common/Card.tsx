import { PropsWithChildren } from 'react';
import cn from 'classnames';

interface Props extends PropsWithChildren {
    className?: string;
}

export default function Card({ className = '', children }: Props) {
    const baseClasses =
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8';

    return <div className={cn(className, baseClasses)}>{children}</div>;
}
