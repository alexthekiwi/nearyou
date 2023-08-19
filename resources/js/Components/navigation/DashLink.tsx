import cn from 'classnames';
import { Link } from '@inertiajs/react';
import Card from '../common/Card';
import { DashLinkProps } from '@/types';

export default function DashLink(props: DashLinkProps) {
    if (props.onClick) {
        return (
            <button onClick={() => props.onClick?.()}>
                <Card className="h-full">
                    <DashLinkContent {...props} />
                </Card>
            </button>
        );
    }

    if (props.href && props.target !== '_blank') {
        return (
            <Link href={props.href}>
                <Card className="h-full">
                    <DashLinkContent {...props} />
                </Card>
            </Link>
        );
    }

    if (props.href && props.target === '_blank') {
        return (
            <a href={props.href}>
                <Card className="h-full">
                    <DashLinkContent {...props} />
                </Card>
            </a>
        );
    }

    return (
        <Card className="h-full">
            <DashLinkContent {...props} />
        </Card>
    );
}

function DashLinkContent({
    icon,
    title,
    description,
    disabled,
    hidden,
}: DashLinkProps) {
    if (hidden) {
        return null;
    }

    return (
        <div
            className={cn('group flex flex-col gap-6', {
                'pointer-events-none opacity-90': disabled,
            })}
        >
            {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-xlight transition-colors group-hover:bg-teal-light">
                    {icon}
                </div>
            )}
            <div className="flex flex-col items-start gap-2">
                <span className="text-left font-bold">{title}</span>

                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
            </div>
        </div>
    );
}
