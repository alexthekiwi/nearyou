import { Link, router } from '@inertiajs/react';
import { Carousel } from 'react-responsive-carousel';
import { App } from '@/types';
import { useAuth } from '@/lib/auth';
import { useSubmit } from '@/lib/forms';
import ProductLayout from '@/Layouts/ProductLayout';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FavouriteButton from '@/Components/listings/FavouriteButton';
import { formatMoney } from '@/lib/money';
import Picture from '@/Components/common/Picture';
import { LISTING_STATUS } from '@/constants';
import { getListingStatus } from '@/lib/listings';
import { FavouriteProvider } from '@/lib/favourites';

interface Props {
    listing: App['Models']['Listing'];
    chatId: string | null;
    isFavourite: boolean;
}

export default function ListingsShow({ listing, chatId, isFavourite }: Props) {
    const { user } = useAuth();

    const canModify = user.is_admin || user.id === listing.seller_id;

    const price = formatMoney(listing.price, 0);

    const createChat = () => {
        router.post(route('chat.store'), {
            listing_id: listing.id,
        });
    };

    const isSold = listing.status === LISTING_STATUS.SOLD;

    return (
        <ProductLayout title="Product" canModify={canModify}>
            <div className="relative mb-9 px-4">
                {listing.status !== 1 && (
                    <div className="pointer-events-none absolute left-4 top-0 z-[2] flex h-full w-[calc(100%_-_2rem)] items-center justify-center rounded-lg bg-black bg-opacity-50 text-2xl font-bold text-white">
                        {getListingStatus(listing)}
                    </div>
                )}
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    dynamicHeight={false}
                    className="gap-1"
                >
                    {listing.images.map((image, i) => (
                        <div key={i} className="w-full">
                            <Picture
                                src={image}
                                alt={`${listing.title}-${i}`}
                                imgClassName="aspect-square rounded-lg object-cover"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="mb-9 px-7">
                <div className="font-black">{listing.seller}</div>
                <div className="text-xs" style={{ color: '#b5b5b5' }}>
                    {listing.suburb && `${listing.suburb}, `}
                    {listing.location}
                </div>
            </div>

            <h1 className="mb-3 px-7 text-xl text-black-light">
                {listing.title}
            </h1>

            <div className="mb-11 px-7 text-xl font-black text-teal">
                {price}
            </div>

            <hr className="mb-6" />

            <div className="mb-6 px-7">
                <h2 className="mb-5 text-xl text-black-light">Details</h2>

                <p style={{ color: '#575758' }}>{listing.description}</p>
            </div>

            {listing.tags.length > 0 && (
                <>
                    <hr className="mb-6" />

                    <div className="mb-14 px-7">
                        <h2 className="mb-5 text-xl text-black-light">Tags</h2>

                        {listing.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="mr-2 inline-block h-6 rounded px-3 text-sm font-bold text-teal"
                                style={{ backgroundColor: '#edfcfb' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}

            <div className="fixed bottom-0 flex w-full justify-between bg-white px-7 py-3.5">
                <div className="flex items-center">
                    <FavouriteProvider>
                        <FavouriteButton
                            listing={listing}
                            className="mr-4 md:hidden"
                            iconClassName="text-teal"
                            isFavourite={isFavourite}
                        />
                    </FavouriteProvider>

                    <div className="font-semibold">{price}</div>
                </div>

                {!canModify &&
                    (chatId ? (
                        <Link
                            href={route('chat.show', { chat: chatId })}
                            className="flex h-10 w-fit items-center justify-center rounded-xl bg-teal px-4 font-semibold text-white"
                        >
                            Go to chat
                        </Link>
                    ) : (
                        !isSold && (
                            <button
                                className="h-10 w-1/2 rounded-xl bg-teal font-semibold text-white"
                                onClick={createChat}
                            >
                                Deal with neighbor
                            </button>
                        )
                    ))}
            </div>
        </ProductLayout>
    );
}
