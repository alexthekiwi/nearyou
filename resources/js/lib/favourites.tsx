import React from 'react';
import { router } from '@inertiajs/react';
import { App } from '@/types';
import { useSubmit } from './forms';

type FavouriteParams = {
    listing: App['Models']['Listing'];
};

type TFavouriteContext = {
    addFavourite: (params: FavouriteParams) => void;
    removeFavourite: (params: FavouriteParams) => void;
    favouriteIds: App['Models']['Listing']['id'][];
};

const FavouriteContext = React.createContext<TFavouriteContext>({
    addFavourite: () => {},
    removeFavourite: () => {},
    favouriteIds: [],
});

export function FavouriteProvider({ children }: { children: React.ReactNode }) {
    // TODO: Decide if we want to include these to avoid prop-drilling
    const favouriteIds: App['Models']['Listing']['id'][] = [];

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

    return (
        <FavouriteContext.Provider
            value={{
                addFavourite,
                removeFavourite,
                favouriteIds,
            }}
        >
            {children}
        </FavouriteContext.Provider>
    );
}

export const useFavourites = () => React.useContext(FavouriteContext);
