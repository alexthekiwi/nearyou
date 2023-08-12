import React, { PropsWithChildren } from 'react';
import { router } from '@inertiajs/react';
import { useIntersectionObserver } from 'usehooks-ts';
import { App, PaginatedResults } from '@/types';
import ListingPreview from '@/Components/listings/ListingPreview';
import Loader from '../common/Loader';

interface Props extends PropsWithChildren {
    data: PaginatedResults<App['Models']['Listing'][]>;
}

export default function Listings({ data: paginatedListings, children }: Props) {
    const [listings, setListings] = React.useState<App['Models']['Listing'][]>(
        paginatedListings.data
    );

    const [isLoadingMore, setIsLoadingMore] = React.useState(false);

    function loadMore() {
        if (!paginatedListings.next_page_url || isLoadingMore) {
            return;
        }

        router.get(
            paginatedListings.next_page_url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onStart() {
                    setIsLoadingMore(true);
                },
                onSuccess() {
                    const searchParams = new URLSearchParams(
                        window.location.search
                    );

                    // Clear the "page" query param for when the user refreshes
                    searchParams.delete('page');

                    window.history.replaceState(
                        {},
                        '',
                        `${window.location.pathname}?${searchParams.toString()}`
                    );

                    // Reduce the listings to remove duplicates
                    setListings((prev) =>
                        [...prev, ...paginatedListings.data].reduce(
                            (acc, curr) => {
                                if (
                                    acc.find(
                                        (listing) => listing.id === curr.id
                                    )
                                ) {
                                    return acc;
                                }

                                return [...acc, curr];
                            },
                            [] as App['Models']['Listing'][]
                        )
                    );
                },
                onFinish() {
                    window.setTimeout(() => {
                        setIsLoadingMore(false);
                    }, 500);
                },
            }
        );
    }

    const memoisedLoadMore = React.useCallback(loadMore, [
        paginatedListings.next_page_url,
        paginatedListings.data,
        isLoadingMore,
    ]);

    const endOfResultsRef = React.useRef<HTMLDivElement | null>(null);
    const endOfResults = useIntersectionObserver(endOfResultsRef, {
        threshold: 1,
        root: null,
        rootMargin: '0px 0px 150px 0px',
    });

    /**
     * Infinite scroll intersection observer
     */
    React.useEffect(() => {
        if (endOfResults?.isIntersecting && !isLoadingMore) {
            memoisedLoadMore();
        }
    }, [endOfResults?.isIntersecting, memoisedLoadMore, isLoadingMore]);

    return (
        <div className="flex flex-col gap-6 md:gap-10">
            {children && <div>{children}</div>}

            <div className="container flex flex-col">
                {listings.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {listings.map((listing) => (
                                <ListingPreview
                                    key={listing.id}
                                    listing={listing}
                                    showTags
                                />
                            ))}
                        </div>
                    </div>
                )}

                {isLoadingMore && (
                    <Loader className="mx-auto my-8 inline-flex text-teal" />
                )}

                <div id="end" ref={endOfResultsRef} />

                {listings.length === 0 && (
                    <p className="text-center text-lg font-bold">
                        No results found. Please try another search.
                    </p>
                )}
            </div>
        </div>
    );
}
