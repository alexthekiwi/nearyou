import { format, formatDistance } from 'date-fns';

export function formatDateNice(dateTimeString: string | Date | null) {
    if (!dateTimeString) {
        return '';
    }

    return format(new Date(dateTimeString), 'dd MMM yyyy');
}

export function formatDateRelative(date: string | number | null) {
    if (!date) {
        return '';
    }

    return formatDistance(new Date(date), new Date(), {
        addSuffix: true,
    });
}

export const formatDateChat1 = (dateTimeString: string) =>
    format(new Date(dateTimeString), 'dd MMM yyyy HH:mm');

export const formatDateChat2 = (dateTimeString: string) =>
    format(new Date(dateTimeString), 'HH:mm');
