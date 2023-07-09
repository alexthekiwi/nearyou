import cn from 'classnames';
import { getFieldName, handleChange } from '@/lib/forms';
import { FieldComponentProps } from '@/types';
import { useError } from '@/lib/errors';

export default function Numeric({ field, data, setData }: FieldComponentProps) {
    const fieldId = getFieldName(field.id);
    const error = useError(fieldId);

    const { minNumber, maxNumber } = field.settings.properties;
    const min = minNumber ? parseInt(minNumber) : undefined;
    const max = maxNumber ? parseInt(maxNumber) : undefined;

    function handleInput(event: React.SyntheticEvent<HTMLInputElement>) {
        // Ensure the user can't enter a value lower or higher than the min or max
        if (min && parseInt(event.currentTarget.value) < min) {
            event.currentTarget.value = min.toString();
        }

        if (max && parseInt(event.currentTarget.value) > max) {
            event.currentTarget.value = max.toString();
        }

        handleChange({ event, data, setData });
    }

    return (
        <label>
            {field.label}
            <input
                type="number"
                name={fieldId}
                id={fieldId}
                min={min}
                max={max}
                value={data[fieldId] || ''}
                onChange={handleInput}
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
