import cn from 'classnames';
import { getFieldName, handleChange } from '@/lib/forms';
import { FieldComponentProps } from '@/types';
import { useError } from '@/lib/errors';

export default function TextArea({
    field,
    data,
    setData,
}: FieldComponentProps) {
    const fieldId = getFieldName(field.id);
    const error = useError(fieldId);

    return (
        <label>
            {field.label}
            <textarea
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
