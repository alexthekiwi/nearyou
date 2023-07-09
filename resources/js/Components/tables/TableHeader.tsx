import cn from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function TableHeader({ className = '', children }: Props) {
    return (
        <thead className={cn(className, 'bg-gray text-white hover:bg-gray')}>
            {children}
        </thead>
    );
}
