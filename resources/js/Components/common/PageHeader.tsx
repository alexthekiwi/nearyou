import cn from 'classnames';
import H1 from '../typography/H1';

interface Props {
    className?: string;
    children?: React.ReactNode;
    heading: string;
}

export default function PageHeader({
    className = '',
    heading,
    children,
}: Props) {
    return (
        <div
            className={cn(
                className,
                'mb-6 flex flex-col gap-6 border-b-2 border-teal pb-6 lg:flex-row lg:items-end lg:justify-between'
            )}
        >
            <H1>{heading}</H1>

            <div className="flex max-w-full items-center gap-6 overflow-x-scroll">
                {children}
            </div>
        </div>
    );
}
