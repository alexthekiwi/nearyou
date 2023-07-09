import cn from 'classnames';
import { useError } from '@/lib/errors';
import { getFieldName, handleChange } from '@/lib/forms';
import { FieldComponentProps } from '@/types';

export default function Dropdown({
    field,
    data,
    setData,
}: FieldComponentProps) {
    const fieldId = getFieldName(field.id);
    const error = useError(fieldId);

    return (
        <label>
            {field.label}
            <select
                name={fieldId}
                id={fieldId}
                value={data[fieldId] || ''}
                onChange={(event) => handleChange({ event, data, setData })}
                className={cn({
                    error: Boolean(error),
                })}
            >
                <option value="">Select option</option>
                {Object.entries(field.settings.properties.choices).map(
                    ([value, label]) => (
                        <option
                            key={value?.toString() || label.toString()}
                            value={value?.toString() || label.toString()}
                        >
                            {label?.toString() || value.toString()}
                        </option>
                    )
                )}
            </select>
            {field.description && (
                <span className="text-sm">{field.description}</span>
            )}
            {error && <span className="error">{error}</span>}
        </label>
    );
}
