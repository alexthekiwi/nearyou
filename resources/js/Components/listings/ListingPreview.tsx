import { Link } from '@inertiajs/react';
import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import { formatDateRelative } from '@/lib/dates';
import Tags from './Tags';
import { getListingStatus } from '@/lib/listings';
import FavouriteButton from './FavouriteButton';
import Picture from '../common/Picture';
import { FavouriteProvider } from '@/lib/favourites';

interface Props {
    listing: App['Models']['Listing'];
    showTags?: boolean;
    favouriteListings?: App['Models']['Listing']['id'][];
}

export default function ListingPreview({
    listing,
    showTags,
    favouriteListings,
}: Props) {
    const listingLink = `/listings/${listing.id}`;

    return (
        <article className="group relative flex focus:outline-none md:flex md:flex-col">
            <Link
                href={listingLink}
                className="relative mr-6 w-[28%] overflow-hidden rounded-lg ring-teal ring-offset-2 transition-opacity hover:opacity-75 group-focus:ring-2 md:col-span-4 md:w-full"
            >
                {listing.status !== 1 && (
                    <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black bg-opacity-50 font-bold text-white">
                        {getListingStatus(listing)}
                    </div>
                )}
                <Picture
                    src={listing.images[0]}
                    alt=""
                    width="120"
                    height="120"
                    imgClassName="relative z-[1] aspect-square h-full w-full object-cover"
                />
            </Link>
            <div className="flex flex-1 flex-col gap-2 overflow-hidden text-sm md:col-span-8">
                <div className="flex justify-between gap-4">
                    <Link href={listingLink} className="w-full">
                        <h3 className="overflow-hidden text-ellipsis text-nowrap leading-snug">
                            {listing.title}
                        </h3>
                    </Link>
                </div>

                <p className="font-bold text-teal">
                    {formatMoney(listing.price, 0)}
                </p>

                <p className="mt-auto flex flex-wrap gap-1 text-xs text-gray-500">
                    {listing.suburb && (
                        <>
                            <span>{listing.suburb}</span>

                            <i className="mx-1">·</i>
                        </>
                    )}

                    <span>{formatDateRelative(listing.created_at)}</span>
                </p>
            </div>
            <FavouriteProvider>
                <FavouriteButton
                    listing={listing}
                    favouriteListings={favouriteListings}
                    className="col-span-1 h-fit md:hidden"
                    iconClassName="text-teal"
                />
            </FavouriteProvider>

            {listing.tags && showTags && (
                <Tags tags={listing.tags} className="col-span-full" max={3} />
            )}
        </article>
    );
}
