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

export function isAvailable(
    listing: App['Models']['Listing'],
    user: App['Models']['User'],
    includeReserved = true
) {
    if (user && user.id === listing.seller_id) {
        return false;
    }

    const statuses = includeReserved ? [1, 3] : [1];

    return statuses.includes(listing.status);
}
