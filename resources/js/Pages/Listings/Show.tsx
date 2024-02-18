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

interface Props {
    listing: App['Models']['Listing'];
    favouriteListings: App['Models']['Listing']['id'][];
    chatId: string | null;
}

export default function ListingsShow({
    listing,
    favouriteListings,
    chatId,
}: Props) {
    const { user } = useAuth();

    const canModify = user.is_admin || user.id === listing.seller_id;

    const onDelete = useSubmit({ message: 'Your listing has been deleted.' });

    const price = formatMoney(listing.price, 0);

    function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!confirm('Are you sure you want to delete this listing?')) {
            return;
        }

        router.delete(
            route('listings.destroy', { listing: listing.id }),
            onDelete
        );
    }

    const createChat = () => {
        router.post(route('chat.store'), {
            listing_id: listing.id,
        });
    };

    return (
        <ProductLayout title="Product" canModify={canModify}>
            <div className="mb-9 px-4">
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
                    {!canModify && (
                        <FavouriteButton
                            listing={listing}
                            favouriteListings={favouriteListings}
                            className="mr-4 md:hidden"
                            iconClassName="text-teal"
                        />
                    )}

                    <div className="font-semibold">{price}</div>
                </div>

                {!canModify &&
                    (chatId ? (
                        <Link
                            href={route('chat.show', { chat: chatId })}
                            className="flex h-10 w-1/2 items-center justify-center rounded-xl bg-teal font-semibold text-white"
                        >
                            Deal with neighbor
                        </Link>
                    ) : (
                        <button
                            className="h-10 w-1/2 rounded-xl bg-teal font-semibold text-white"
                            onClick={createChat}
                        >
                            Deal with neighbor
                        </button>
                    ))}
            </div>
        </ProductLayout>
    );
}
