import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App } from '@/types';
import Button from '@/Components/common/Button';
import { useAuth } from '@/lib/auth';
import { useSubmit } from '@/lib/forms';
import FavouriteButton from '@/Components/listings/FavouriteButton';

interface Props {
    listing: App['Models']['Listing'];
    favouriteListings: App['Models']['Listing']['id'][];
}

export default function ListingsShow({ listing, favouriteListings }: Props) {
    const { user } = useAuth();

    const canModify = user.is_admin || user.id === listing.seller_id;

    const onDelete = useSubmit({ message: 'Your listing has been deleted.' });

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

    return (
        <Layout>
            <Head title={listing.title} />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>{listing.title}</H1>

                    {canModify && (
                        <div className="flex items-center gap-4">
                            <Button
                                href={route('listings.edit', {
                                    listing: listing.id,
                                })}
                                theme="primary"
                            >
                                Edit listing
                            </Button>
                            <form onSubmit={handleDelete}>
                                <Button type="submit" theme="danger">
                                    Delete listing
                                </Button>
                            </form>
                        </div>
                    )}

                    <Button
                        href={
                            listing.seller_id
                                ? route('users.show', {
                                      user: listing.seller_id,
                                  })
                                : '#0'
                        }
                        theme="primary"
                    >
                        View seller
                    </Button>

                    <FavouriteButton
                        listing={listing}
                        favouriteListings={favouriteListings}
                        showText
                        iconClassName="text-teal"
                    />
                </div>
            </div>
        </Layout>
    );
}
