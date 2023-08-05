import React from 'react';
import { router } from '@inertiajs/react';
import { useIntersectionObserver } from 'usehooks-ts';
import { App, PaginatedResults } from '@/types';
import SetLocationForm from '@/Components/location/SetLocationForm';
import ListingPreview from '@/Components/listings/ListingPreview';
import { useSearch } from '@/lib/search';
import Loader from '../common/Loader';
import SearchBar from '../common/SearchBar';

interface Props {
    data: PaginatedResults<App['Models']['Listing'][]>;
}

export default function Listings({ data: paginatedListings }: Props) {
    const [listings, setListings] = React.useState<App['Models']['Listing'][]>(
        paginatedListings.data
    );

    const [isProcessing, setProcessing] = React.useState(false);

    function loadMore() {
        if (!paginatedListings.next_page_url || isProcessing) {
            return;
        }

        router.get(
            paginatedListings.next_page_url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onStart() {
                    setProcessing(true);
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
                        setProcessing(false);
                    }, 500);
                },
            }
        );
    }

    const memoisedLoadMore = React.useCallback(loadMore, [
        paginatedListings.next_page_url,
        paginatedListings.data,
        isProcessing,
    ]);

    const { search, setSearch, isSearching, handleSearch } = useSearch();

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
        if (endOfResults?.isIntersecting && !isProcessing) {
            memoisedLoadMore();
        }
    }, [endOfResults?.isIntersecting, memoisedLoadMore, isProcessing]);

    return (
        <div className="flex flex-col gap-6 md:gap-10">
            <div>
                <div className="container flex flex-col gap-x-12 gap-y-4 md:flex-row md:items-center">
                    <SetLocationForm />
                    <SearchBar />
                </div>
            </div>

            <div className="container flex flex-col">
                {listings.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {listings.map((listing) => (
                                <ListingPreview
                                    key={listing.id}
                                    listing={listing}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <Loader className="mx-auto my-8 inline-flex text-teal" />
                )}

                <div id="end" ref={endOfResultsRef} />

                {listings.length === 0 && !isSearching && (
                    <p className="text-sm font-bold">
                        No results found. Please try another search.
                    </p>
                )}
            </div>
        </div>
    );
}
