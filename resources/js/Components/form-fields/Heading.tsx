import { FieldComponentProps } from '@/types';

export default function Heading({ field }: FieldComponentProps) {
    return (
        <h2 className="border-b-2 border-teal pb-6 text-xl font-bold text-teal [&:not(:first-child)]:mt-10">
            {field.label}
        </h2>
    );
}
