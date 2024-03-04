import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import { MessageStatus } from '@/lib/message';

interface Props extends PropsWithChildren {
    message?: string;
    status?: MessageStatus;
    className?: string;
    canToggle?: boolean;
}

export default function Message({
    message,
    children,
    status = 'default',
    className: additionalClasses = '',
    canToggle = true,
}: Props) {
    const [show, setShow] = React.useState(true);

    const defaultClasses =
        'border p-4 rounded-xl w-full font-bold flex justify-between items-center gap-6';

    const className = cn(additionalClasses, defaultClasses, {
        'bg-teal-xlight border-teal text-teal': status === 'success',
        'bg-red-50 border-red-500 text-red-500': status === 'error',
        'bg-yellow-50 border-yellow-500 text-yellow-500': status === 'warning',
        'bg-gray-100 border-black text-black': status === 'default',
    });

    if ((!children && !message) || !show) return null;

    return (
        <div className={className}>
            <div>{children || message}</div>
            {canToggle && (
                <button title="Hide message" onClick={() => setShow(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
