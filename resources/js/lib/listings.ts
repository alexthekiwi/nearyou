import { router } from '@inertiajs/react';
import { App } from '@/types';

const listingStatuses = {
    1: 'Available',
    2: 'Processing',
    3: 'Reserved',
    4: 'Sold',
};

export function getListingStatus(input: number | App['Models']['Listing']) {
    const status = (
        typeof input === 'number' ? input : input.status
    ) as keyof typeof listingStatuses;

    return listingStatuses[status] || 'Unknown';
}
