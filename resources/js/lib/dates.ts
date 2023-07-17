import { format, formatDistance } from 'date-fns';

export function formatDateNice(dateTimeString: string | null) {
    if (!dateTimeString) {
        return '';
    }

    return format(new Date(dateTimeString), 'dd MMM yyyy');
}

export function formatDateRelative(dateTimeString: string | null) {
    if (!dateTimeString) {
        return '';
    }

    return formatDistance(new Date(dateTimeString), new Date(), {
        addSuffix: true,
    });
}
