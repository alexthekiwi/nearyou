import cn from 'classnames';
import { useError } from '@/lib/errors';
import { getFieldName, handleFileInput } from '@/lib/forms';
import { FieldComponentProps } from '@/types';

export default function FileUpload({
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
                type="file"
                name={fieldId}
                id={fieldId}
                onChange={(event) => handleFileInput({ event, data, setData })}
                className={cn({
                    error: Boolean(error),
                })}
            />
        </label>
    );
}
