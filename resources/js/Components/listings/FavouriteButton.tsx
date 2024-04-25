import cn from 'classnames';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { App } from '@/types';
import { useFavourites } from '@/lib/favourites';
import { isAvailable } from '@/lib/listings';
import { useAuth } from '@/lib/auth';

interface Props {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    listing?: App['Models']['Listing'];
    favouriteListings?: App['Models']['Listing']['id'][];
    showText?: boolean;
    isFavourite?: boolean;
}

export default function FavouriteButton({
    className = '',
    iconClassName = '',
    textClassName = '',
    listing,
    favouriteListings = [],
    showText = false,
    isFavourite,
}: Props) {
    const { user } = useAuth();

    const { addFavourite, removeFavourite } = useFavourites();

    if (!listing) {
        return null;
    }

    const canFavourite = isAvailable(listing, user, true);

    if (!canFavourite) {
        return null;
    }

    const _isFavourite =
        typeof isFavourite === 'boolean'
            ? isFavourite
            : favouriteListings?.includes(listing.id);
    const text = _isFavourite ? 'Remove favourite' : 'Add to favourites';

    const iconClass = cn('h-8 w-8 flex-shrink-0', iconClassName);

    return (
        <button
            type="button"
            className={cn(className, 'flex items-center gap-2 text-current')}
            title={text}
            onClick={() =>
                _isFavourite
                    ? removeFavourite({ listing })
                    : addFavourite({ listing })
            }
        >
            {_isFavourite ? (
                <HiHeart className={iconClass} />
            ) : (
                <HiOutlineHeart className={iconClass} />
            )}

            {showText && (
                <span
                    className={cn(
                        'text-sm font-bold text-current',
                        textClassName
                    )}
                >
                    {text}
                </span>
            )}
        </button>
    );
}
