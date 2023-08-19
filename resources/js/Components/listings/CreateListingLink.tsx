import { Link } from '@inertiajs/react';
import { HiPlus } from 'react-icons/hi2';

export default function CreateListingLink() {
    return (
        <Link
            title="Create a new listing"
            href={route('listings.create')}
            className="fixed bottom-4 right-4 z-[20] flex rounded-full bg-teal p-3 text-white shadow transition-colors hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal focus:ring-offset-2 md:bottom-6 md:right-6"
        >
            <HiPlus className="h-10 w-10" />
        </Link>
    );
}
