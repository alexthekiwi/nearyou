import { Head, Link } from '@inertiajs/react';
import { HiPlus } from 'react-icons/hi';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import Listings from '@/Components/listings/Listings';
import SetLocationForm from '@/Components/location/SetLocationForm';
import SearchBar from '@/Components/common/SearchBar';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import CreateListingLink from '@/Components/listings/CreateListingLink';

interface Props {
    listings: PaginatedResults<App['Models']['Listing'][]>;
    favouriteListings: App['Models']['Listing']['id'][];
}

export default function ListingsIndex({ listings, favouriteListings }: Props) {
    function handleSetLocation() {
        window.location.reload();
    }

    return (
        <Layout>
            <Head title="Your Local Listings" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Your local listings" />
                </div>

                <Listings data={listings} favouriteListings={favouriteListings}>
                    <div className="container flex flex-col gap-y-4">
                        <NavBar links={primaryLinks} />
                        <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row">
                            <SetLocationForm onSuccess={handleSetLocation} />
                            <SearchBar name="query" id="query" clearable />
                        </div>
                    </div>
                </Listings>

                <CreateListingLink />
            </div>
        </Layout>
    );
}
