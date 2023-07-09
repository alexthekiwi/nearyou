import cn from 'classnames';

interface Props {
    className?: string;
    tableClasses?: string;
    children: React.ReactNode;
}

export default function Table({
    className = '',
    tableClasses = '',
    children,
}: Props) {
    return (
        <div
            className={cn(
                '-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8',
                className
            )}
        >
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table
                        className={cn(
                            tableClasses,
                            'min-w-full divide-y divide-gray-300'
                        )}
                    >
                        {children}
                    </table>
                </div>
            </div>
        </div>
    );
}
