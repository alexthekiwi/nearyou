import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';

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
                    <H1>Chat</H1>
                </div>

                <div className="container flex flex-col gap-y-4">
                    <NavBar links={primaryLinks} />
                </div>
            </div>
        </Layout>
    );
}
