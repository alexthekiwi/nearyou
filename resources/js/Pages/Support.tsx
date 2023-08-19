import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import NavBar from '@/Components/common/NavBar';
import { helpLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';

interface Props {
    //
}

export default function Support({}: Props) {
    return (
        <Layout>
            <Head title="Support" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Support" />
                </div>

                <div className="container flex flex-col gap-y-4">
                    <NavBar links={helpLinks} />
                </div>
            </div>
        </Layout>
    );
}
