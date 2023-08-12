import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import NavBar from '@/Components/common/NavBar';

interface Props {
    //
}

export default function Community({}: Props) {
    return (
        <Layout>
            <Head title="Community" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>Community</H1>
                </div>

                <div className="container flex flex-col gap-y-4">
                    <div className="flex w-full justify-center">
                        <NavBar className="max-w-lg flex-grow" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
