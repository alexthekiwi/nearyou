import { useError } from '@/lib/errors';
import { getFieldName, handleChange } from '@/lib/forms';
import { FieldComponentProps } from '@/types';
import HelpText from './HelpText';

export default function Checkbox({
    field,
    data,
    setData,
}: FieldComponentProps) {
    const fieldId = getFieldName(field.id);
    const error = useError(fieldId);

    return (
        <div>
            <p className="mb-3 w-full">{field.label}</p>
            <div className="flex flex-row flex-wrap gap-10">
                {Object.entries(field.settings.properties.choices).map(
                    ([value, label]) => (
                        <label
                            key={typeof label === 'string' ? label : value}
                            className="flex flex-row items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                name={fieldId}
                                id={`${fieldId}-${value}`}
                                value={value?.toString() || label.toString()}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setData({
                                            ...data,
                                            [fieldId]: [
                                                ...data[fieldId],
                                                value,
                                            ],
                                        });
                                    } else {
                                        setData({
                                            ...data,
                                            [fieldId]: data[fieldId].filter(
                                                (v: string) => v !== value
                                            ),
                                        });
                                    }
                                }}
                            />
                            <span>{label?.toString() || value.toString()}</span>
                        </label>
                    )
                )}
            </div>

            {field.description && (
                <HelpText
                    description={field.description}
                    className="mt-2 block"
                />
            )}

            {error && <span className="error">{error}</span>}
        </div>
    );
}
