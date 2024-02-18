import { Link } from '@inertiajs/react';
import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import { formatDateRelative } from '@/lib/dates';
import Tags from './Tags';
import { getListingStatus } from '@/lib/listings';
import FavouriteButton from './FavouriteButton';
import Picture from '../common/Picture';

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
    const isFree = !listing.price;

    return (
        <article className="group relative grid grid-cols-6 gap-x-6 gap-y-4 focus:outline-none md:flex md:flex-col">
            <Link
                href={listingLink}
                className="relative col-span-2 overflow-hidden rounded-lg ring-teal ring-offset-2 transition-opacity hover:opacity-75 group-focus:ring-2 md:col-span-4"
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
            <div className="col-span-4 flex flex-col gap-2 text-sm md:col-span-8">
                <div className="flex justify-between gap-4">
                    <Link href={listingLink}>
                        <h3 className="leading-snug">{listing.title}</h3>
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

                <FavouriteButton
                    listing={listing}
                    favouriteListings={favouriteListings}
                    className="absolute right-0 top-0 md:hidden"
                    iconClassName="text-teal"
                />
            </div>

            {listing.tags && showTags && (
                <Tags tags={listing.tags} className="col-span-full" max={3} />
            )}
        </article>
    );
}
