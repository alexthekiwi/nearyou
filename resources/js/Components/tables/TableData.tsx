import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableData({ className = '', children }: Props) {
    return (
        <td className={cn(className, 'px-3 py-4 text-sm text-gray first:pl-6')}>
            {children}
        </td>
    );
}
