import cn from 'classnames';
import { useError } from '@/lib/errors';
import { getFieldName, handleChange } from '@/lib/forms';
import { FieldComponentProps } from '@/types';

export default function TextInput({
    field,
    data,
    setData,
}: FieldComponentProps) {
    const fieldId = getFieldName(field.id);
    const error = useError(fieldId);

    return (
        <label>
            {field.label}
            <input
                type="text"
                name={fieldId}
                id={fieldId}
                value={data[fieldId] || ''}
                onChange={(event) => handleChange({ event, data, setData })}
                className={cn({
                    error: Boolean(error),
                })}
            />
            {field.description && (
                <span className="text-sm">{field.description}</span>
            )}
            {error && <span className="error">{error}</span>}
        </label>
    );
}
