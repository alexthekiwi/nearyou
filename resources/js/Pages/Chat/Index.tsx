import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import H2 from '@/Components/typography/H2';

interface Props {
    chats: PaginatedResults<App['Models']['Chat'][]>;
}

export default function ChatIndex({ chats }: Props) {
    console.log(chats);

    return (
        <Layout>
            <Head title="Chat" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Your active chats" />
                </div>

                <div className="container flex flex-col gap-y-4">
                    <NavBar links={primaryLinks} />

                    <H2 className="mt-8 text-center">
                        Near You chat coming soon.
                    </H2>
                </div>
            </div>
        </Layout>
    );
}
