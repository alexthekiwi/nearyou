import { router } from '@inertiajs/react';
import { App } from '@/types';
import { useSubmit } from './forms';

type FavouriteParams = {
    listing: App['Models']['Listing'];
};

export function useFavourites() {
    const onAddFavourite = useSubmit({
        message: 'Added to favourites!',
        preserveScroll: true,
    });

    const onRemoveFavourite = useSubmit({
        message: 'Removed from favourites!',
        preserveScroll: true,
    });

    function addFavourite({ listing }: FavouriteParams) {
        router.post(
            route('favourites.store', { listing: listing.id }),
            {},
            onAddFavourite
        );
    }

    function removeFavourite({ listing }: FavouriteParams) {
        router.delete(
            route('favourites.destroy', { listing: listing.id }),
            onRemoveFavourite
        );
    }

    return { addFavourite, removeFavourite };
}
