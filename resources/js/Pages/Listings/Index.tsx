import { Head, Link } from '@inertiajs/react';
import { HiPlus } from 'react-icons/hi';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import Listings from '@/Components/listings/Listings';
import SetLocationForm from '@/Components/location/SetLocationForm';
import SearchBar from '@/Components/common/SearchBar';
import NavBar from '@/Components/common/NavBar';
import Button from '@/Components/common/Button';

interface Props {
    listings: PaginatedResults<App['Models']['Listing'][]>;
}

export default function ListingsIndex({ listings }: Props) {
    function handleSetLocation() {
        window.location.reload();
    }

    return (
        <Layout>
            <Head title="Your Local Listings" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>Your local listings.</H1>
                </div>

                <Listings data={listings}>
                    <div className="container flex flex-col gap-y-4">
                        <div className="flex w-full justify-center">
                            <NavBar className="max-w-lg flex-grow" />
                        </div>
                        <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row">
                            <SetLocationForm onSuccess={handleSetLocation} />
                            <SearchBar name="query" id="query" clearable />
                            <Button href="/random" theme="primary">
                                I'm feeling lucky
                            </Button>
                        </div>
                    </div>
                </Listings>

                <Link
                    title="Create a new listing"
                    href={route('listings.create')}
                    className="fixed bottom-4 right-4 z-[20] flex rounded-full bg-teal p-3 text-white shadow transition-colors hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal focus:ring-offset-2 md:bottom-6 md:right-6"
                >
                    <HiPlus className="h-10 w-10" />
                </Link>
            </div>
        </Layout>
    );
}
