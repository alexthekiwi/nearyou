import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App } from '@/types';

interface Props {
    chat: App['Models']['Chat'];
}

export default function ChatShow({ chat }: Props) {
    console.log(chat);

    return (
        <Layout>
            <Head title="Chat" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>Chat</H1>
                </div>
            </div>
        </Layout>
    );
}
