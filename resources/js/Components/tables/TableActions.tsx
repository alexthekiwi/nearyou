import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableActions({ className = '', children }: Props) {
    return (
        <td
            className={cn(
                className,
                'relative flex justify-end gap-6 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
            )}
        >
            {children}
        </td>
    );
}
