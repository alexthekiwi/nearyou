import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableRow({ className = '', children }: Props) {
    return <tr className={cn(className, '')}>{children}</tr>;
}
