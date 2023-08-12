import { Link } from '@inertiajs/react';
import { App } from '@/types';

interface Props {
    tag: App['Models']['Tag'];
}

export default function Tag({ tag }: Props) {
    const searchLink = route('listings.index', {
        query: tag.title,
    });

    return (
        <Link
            href={searchLink}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-black transition-colors hover:bg-gray-200"
        >
            {tag.title}
        </Link>
    );
}
