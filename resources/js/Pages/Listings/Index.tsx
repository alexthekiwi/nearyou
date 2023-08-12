import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import Listings from '@/Components/listings/Listings';
import SetLocationForm from '@/Components/location/SetLocationForm';
import SearchBar from '@/Components/common/SearchBar';
import NavBar from '@/Components/common/NavBar';

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
                    <div className="container flex flex-col gap-x-12 gap-y-4 md:flex-row md:items-center">
                        <SetLocationForm onSuccess={handleSetLocation} />
                        <SearchBar name="search" id="search" clearable />
                        <NavBar />
                    </div>
                </Listings>
            </div>
        </Layout>
    );
}
