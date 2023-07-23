import React from 'react';
import { router } from '@inertiajs/react';

type Props = {
    param?: string;
    path?: string;
    limit?: number;
};

/**
 * Hook for handling common search features
 */
export function useSearch({
    param = 'search',
    path = undefined,
    limit = undefined,
}: Props = {}) {
    const [search, setSearch] = React.useState<string>('');
    const [isSearching, setSearching] = React.useState(false);

    /**
     * Populate search state on initial render
     */
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);

            const searchQuery = searchParams.get(param) as string;

            if (searchQuery) {
                setSearch(searchQuery);
            }
        }
    }, [param]);

    function handleSearch(e: React.FormEvent | undefined = undefined) {
        if (e) {
            e.preventDefault();
        }

        setSearching(true);

        const searchParams = new URLSearchParams(window?.location.search);

        // Set the search term
        searchParams.set('search', search);

        // Reset the page back to 1
        searchParams.set('page', '1');

        // Reset the limit
        if (limit) {
            searchParams.set('limit', limit.toString());
        }

        router.get(
            `${path ?? window.location.pathname}?${searchParams.toString()}`
        );

        setSearching(false);
    }

    function handleClearSearch() {
        setSearch('');

        const searchParams = new URLSearchParams(window?.location.search);

        searchParams.delete(param);

        router.get(
            `${path ?? window.location.pathname}?${searchParams.toString()}`
        );
    }

    return {
        search,
        setSearch,
        isSearching,
        handleSearch,
        handleClearSearch,
    };
}
