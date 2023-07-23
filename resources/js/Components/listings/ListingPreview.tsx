import { Link } from '@inertiajs/react';
import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import H3 from '../typography/H3';
import H4 from '../typography/H4';
import { formatDateNice, formatDateRelative } from '@/lib/dates';

interface Props {
    listing: App['Models']['Listing'];
}

export default function ListingPreview({ listing }: Props) {
    const thumbnail =
        listing.images?.[0].file || '/img/placeholders/thumbnail.png';

    const isFree = !listing.price;
    const hasSuburb = Boolean(listing.suburb);

    return (
        <article>
            <Link
                href={`/listings/${listing.id}`}
                className="grid grid-cols-6 gap-x-6 gap-y-4 md:flex md:flex-col"
            >
                <div className="col-span-2 md:col-span-4">
                    <img
                        src={thumbnail}
                        width="120"
                        height="120"
                        className="aspect-square h-full w-full rounded-lg object-cover"
                        alt=""
                    />
                </div>
                <div className="col-span-4 flex flex-col gap-2 text-sm md:col-span-8">
                    <h3 className="font-bold leading-snug">{listing.title}</h3>
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
            </Link>
        </article>
    );
}
