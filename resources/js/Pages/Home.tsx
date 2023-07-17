import React from 'react';
import { Head, router } from '@inertiajs/react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import SetLocationForm from '@/Components/location/SetLocationForm';
import ListingPreview from '@/Components/listings/ListingPreview';

interface Props {
    listings: PaginatedResults<App['Models']['Listing'][]>;
}

export default function Home({ listings: paginatedListings }: Props) {
    const listings = paginatedListings.data;

    const [search, setSearch] = React.useState<string>('');
    const hasHitLimit = paginatedListings.total === listings.length;

    const [isSearching, setSearching] = React.useState(false);
    const [isLoadingMore, setLoadingMore] = React.useState(false);

    const endOfResultsRef = React.useRef(null);

    /**
     * Infinite loading on scroll
     */
    function loadMoreListings() {
        if (hasHitLimit || isLoadingMore) {
            return;
        }

        setLoadingMore(true);

        const resultCountOnPage =
            paginatedListings.per_page * paginatedListings.current_page;

        const searchParams = new URLSearchParams(window.location.search);

        searchParams.set('page', '1');
        searchParams.set('limit', String(resultCountOnPage + 10));

        router.get(
            `${window.location.pathname}?${searchParams.toString()}`,
            undefined,
            {
                preserveScroll: true,
            }
        );

        setLoadingMore(false);
    }

    /**
     * Memoise loadMoreListings to prevent infinite loop
     */
    const memoisedLoadMoreListings = React.useCallback(loadMoreListings, [
        paginatedListings.current_page,
        paginatedListings.per_page,
        hasHitLimit,
        isLoadingMore,
    ]);

    /**
     * Handle search form submission
     */
    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        setSearching(true);

        const searchParams = new URLSearchParams(window?.location.search);

        // Set the search term
        searchParams.set('search', search);

        // Reset the page back to 1
        searchParams.set('page', '1');

        // Reset the limit
        searchParams.set('limit', '20');

        router.get(`${window.location.pathname}?${searchParams.toString()}`);

        setSearching(false);
    }

    /**
     * Infinite scroll intersection observer
     */
    React.useEffect(() => {
        if (hasHitLimit || isLoadingMore) {
            return;
        }

        const observedRef = endOfResultsRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    memoisedLoadMoreListings();
                }
            },
            { threshold: 1 }
        );

        if (endOfResultsRef.current) {
            observer.observe(endOfResultsRef.current);
        }

        return () => {
            if (observedRef) {
                observer.unobserve(observedRef);
            }
        };
    }, [memoisedLoadMoreListings, hasHitLimit, isLoadingMore]);

    /**
     * Populate search input on load
     */
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);

            const searchQuery = searchParams.get('search') as string;

            if (searchQuery) {
                setSearch(searchQuery);
            }
        }
    }, []);

    return (
        <Layout>
            <Head title="Home" />
            <div className="my-6 flex flex-col gap-4">
                <div className="container">
                    <H1>Your local listings.</H1>
                </div>

                <div>
                    <div className="container flex flex-col gap-x-12 gap-y-4 md:flex-row md:items-center">
                        <SetLocationForm display="minimal" />
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-grow flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-4"
                        >
                            <input
                                className="flex-grow !border-0 !bg-transparent !p-0 !transition-none [appearance:textfield] focus:!ring-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                placeholder="Search"
                                type="text"
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.currentTarget.value)
                                }
                            />
                            <button type="submit" title="Search" className="">
                                <HiOutlineMagnifyingGlass className="h-6 w-6" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="container">
                    {isSearching && <div>Loading..</div>}

                    {listings.length > 0 && !isSearching && (
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-6">
                                {listings.map((listing) => (
                                    <ListingPreview
                                        key={listing.id}
                                        listing={listing}
                                    />
                                ))}
                            </div>
                            {isLoadingMore ? (
                                <p>Loading..</p>
                            ) : (
                                <div id="end" ref={endOfResultsRef} />
                            )}
                        </div>
                    )}

                    {listings.length === 0 && !isSearching && (
                        <p className="text-sm font-bold">
                            No results found. Please try another search.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
