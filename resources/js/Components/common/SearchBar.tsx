import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import { useSearch } from '@/lib/search';

interface Props {
    placeholder?: string;
    clearable?: boolean;
    autoFocus?: boolean;
    name?: string;
    id?: string;
}

export default function SearchBar({
    placeholder = 'Search',
    name = 'search',
    id = 'search',
    clearable = false,
    autoFocus = false,
}: Props) {
    const { search, setSearch, handleSearch, handleClearSearch } = useSearch();

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-grow flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-4"
        >
            <input
                className="flex-grow !rounded-[3px] !border-0 !bg-transparent !p-0 !transition-none [appearance:textfield] focus:!ring-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder={placeholder}
                type="text"
                name={name}
                id={id}
                autoFocus={autoFocus}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <div className="flex items-center gap-4">
                {clearable && search && (
                    <button type="button" onClick={handleClearSearch}>
                        <HiOutlineXMark className="h-6 w-6" />
                    </button>
                )}
                <button type="submit" title="Search" className="">
                    <HiOutlineMagnifyingGlass className="h-6 w-6" />
                </button>
            </div>
        </form>
    );
}
