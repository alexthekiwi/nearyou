import { Link } from '@inertiajs/react';
import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import { formatDateRelative } from '@/lib/dates';
import Tags from './Tags';
import { getListingStatus } from '@/lib/listings';
import FavouriteButton from './FavouriteButton';

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
    const thumbnail =
        listing.images?.[0].file || '/img/placeholders/thumbnail.png';

    const listingLink = `/listings/${listing.id}`;
    const isFree = !listing.price;
    const hasSuburb = Boolean(listing.suburb);

    const suburbLink = listing.suburb
        ? route('listings.index', {
              query: listing.suburb?.name,
          })
        : '#0';

    return (
        <article className="group relative grid grid-cols-6 gap-x-6 gap-y-4 focus:outline-none md:flex md:flex-col">
            <FavouriteButton
                listing={listing}
                favouriteListings={favouriteListings}
                className="hidden md:absolute md:right-4 md:top-4 md:z-[3] md:block"
                iconClassName="text-white drop-shadow-md"
            />

            <Link
                href={listingLink}
                className="relative col-span-2 overflow-hidden rounded-lg ring-teal ring-offset-2 transition-opacity hover:opacity-75 group-focus:ring-2 md:col-span-4"
            >
                {listing.status !== 1 && (
                    <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black bg-opacity-50 font-bold text-white">
                        {getListingStatus(listing)}
                    </div>
                )}
                <img
                    src={thumbnail}
                    width="120"
                    height="120"
                    className="relative z-[1] aspect-square h-full w-full object-cover"
                    alt=""
                />
            </Link>
            <div className="col-span-4 flex flex-col gap-2 text-sm md:col-span-8">
                <div className="flex justify-between gap-4">
                    <Link href={listingLink}>
                        <h3 className="font-bold leading-snug">
                            {listing.title}
                        </h3>
                    </Link>
                    <FavouriteButton
                        listing={listing}
                        favouriteListings={favouriteListings}
                        className="md:hidden"
                        iconClassName="text-teal"
                    />
                </div>
                <p className="font-bold text-teal">
                    {isFree ? '🌎 Freecycle' : formatMoney(listing.price, 0)}
                </p>

                <p className="mt-auto flex flex-wrap gap-1 text-xs text-gray-500">
                    {hasSuburb && (
                        <>
                            <Link href={suburbLink}>
                                {listing.suburb?.name}
                            </Link>
                            <span>•</span>
                        </>
                    )}
                    {formatDateRelative(listing.created_at)}
                </p>
            </div>

            {listing.tags && showTags && (
                <Tags tags={listing.tags} className="col-span-full" max={3} />
            )}
        </article>
    );
}
