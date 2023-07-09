import { usePage } from '@inertiajs/react';
import { getFieldName } from './forms';

export function useError(nameOrId: string | number) {
    let key = nameOrId;

    if (typeof nameOrId === 'number') {
        key = getFieldName(nameOrId);
    }

    const { errors } = usePage().props;

    if (
        Object.keys(errors).length === 0 ||
        !Object.keys(errors).some((err) => err === key)
    ) {
        return null;
    }

    if (Array.isArray(errors[key])) {
        return errors[key][0];
    }

    return errors[key];
}
