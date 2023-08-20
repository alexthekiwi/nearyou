import cn from 'classnames';
import { App } from '@/types';
import Tag from './Tag';

interface Props {
    tags?: App['Models']['Tag'][];
    className?: string;
    max?: number;
}

export default function Tags({ tags, className = '', max = 5 }: Props) {
    if (!tags) return null;

    const tagsToDisplay = tags.slice(0, max);

    return (
        <nav className={cn('flex flex-wrap gap-2', className)}>
            {tagsToDisplay.map((tag) => (
                <Tag key={tag.slug} tag={tag} />
            ))}
        </nav>
    );
}
