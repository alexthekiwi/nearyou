import { Link } from '@inertiajs/react';
import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import { formatDateRelative } from '@/lib/dates';
import Tags from './Tags';

interface Props {
    listing: App['Models']['Listing'];
}

export default function ListingPreview({ listing }: Props) {
    const thumbnail =
        listing.images?.[0].file || '/img/placeholders/thumbnail.png';

    const listingLink = `/listings/${listing.id}`;
    const isFree = !listing.price;
    const hasSuburb = Boolean(listing.suburb);

    return (
        <article className="group grid grid-cols-6 gap-x-6 gap-y-4 focus:outline-none md:flex md:flex-col">
            <Link
                href={listingLink}
                className="col-span-2 overflow-hidden rounded-lg ring-teal ring-offset-2 transition-opacity hover:opacity-75 group-focus:ring-2 md:col-span-4"
            >
                <img
                    src={thumbnail}
                    width="120"
                    height="120"
                    className="aspect-square h-full w-full object-cover"
                    alt=""
                />
            </Link>
            <div className="col-span-4 flex flex-col gap-2 text-sm md:col-span-8">
                <Link href={listingLink}>
                    <h3 className="font-bold leading-snug">{listing.title}</h3>
                </Link>
                <p className="font-bold text-teal">
                    {isFree ? '🌎 Freecycle' : formatMoney(listing.price)}
                </p>
                <p className="mt-auto flex flex-wrap gap-1 text-xs text-gray-500">
                    {hasSuburb && (
                        <>
                            {listing.suburb?.name}
                            <span>•</span>
                        </>
                    )}
                    {formatDateRelative(listing.created_at)}
                </p>
            </div>
            {listing.tags && (
                <Tags tags={listing.tags} className="col-span-full" max={3} />
            )}
        </article>
    );
}
