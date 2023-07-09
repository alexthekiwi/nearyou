import { FieldComponentProps } from '@/types';

export default function Text({ field }: FieldComponentProps) {
    return <p className="font-bold">{field.label}</p>;
}
