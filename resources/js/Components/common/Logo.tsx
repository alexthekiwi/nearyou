import cn from 'classnames';

interface Props {
    className?: string;
}

export default function Logo({ className = '' }: Props) {
    return (
        <img
            src="/img/brand/logo.svg"
            alt="Near You"
            className={cn('w-auto', className)}
        />
    );
}
