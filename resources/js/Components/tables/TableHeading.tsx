import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableHeading({ className = '', children }: Props) {
    return (
        <th scope="col" className={cn(className, 'px-3 py-3.5 text-left font-display text-xs first:pl-6')}>
            {children}
        </th>
    );
}
