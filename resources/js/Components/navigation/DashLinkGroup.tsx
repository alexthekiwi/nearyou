import { DashLinkGroupProps } from '@/types';
import DashLink from './DashLink';

export default function DashLinkGroup({
    title,
    links,
    showTitle = true,
    hidden = false,
}: DashLinkGroupProps) {
    if (hidden) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3">
            {showTitle && (
                <p className="text-lg font-bold text-gray-400">{title}</p>
            )}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {links.map((link) => (
                    <DashLink key={link.href} {...link} />
                ))}
            </div>
        </div>
    );
}
