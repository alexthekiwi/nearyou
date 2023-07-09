import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableBody({ className = '', children }: Props) {
    return (
        <tbody className={cn(className, 'divide-y divide-gray-200 bg-white')}>
            {children}
        </tbody>
    );
}
