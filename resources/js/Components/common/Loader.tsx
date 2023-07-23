import cn from 'classnames';

interface Props {
    className?: string;
}

export default function Loader({ className = '' }: Props) {
    return <div className={cn('loader', className)} />;
}
