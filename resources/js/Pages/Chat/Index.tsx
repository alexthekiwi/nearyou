import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import { App, PaginatedResults } from '@/types';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import H2 from '@/Components/typography/H2';
import { CDN_PATH } from '@/constants';
import { formatDateRelative } from '@/lib/dates';
import Picture from '@/Components/common/Picture';

type Chat = {
    id: string;
    thumbnail: string;
    oppositeUserId: string;
    suburb?: string;
    lastMsg: string;
    lastAt: number;
    isUnread: boolean;
};

interface Props {
    chats: PaginatedResults<Chat[]>;
    // chats: Chat[];
    redis: any;
}

export default function ChatIndex({ chats: paginatedChats, redis }: Props) {
    console.log({ redis });

    const [chats, setChats] = React.useState<Chat[]>(paginatedChats.data);
    // const [chats, setChats] = React.useState<Chat[]>(paginatedChats);

    console.log(chats);

    const arr = [1, 2];

    return (
        <Layout>
            <Head title="Chat" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Your active chats" />
                </div>

                <div className="container flex flex-col gap-y-4">
                    <NavBar links={primaryLinks} />

                    <ul className="flex flex-col gap-4">
                        {chats.map((e) => {
                            const thumbnail = `${CDN_PATH}${e.thumbnail}`;

                            return (
                                <li key={e.id}>
                                    <Link
                                        href={`/chat/${e.id}`}
                                        className="flex h-[3.625rem] gap-4"
                                    >
                                        <Picture
                                            src={e.thumbnail}
                                            alt=""
                                            imgClassName="h-full w-[3.625rem] rounded-lg object-cover"
                                        />

                                        <div className="flex flex-1 flex-col justify-center gap-1.5 pb-1">
                                            <div className="flex flex-1 gap-1">
                                                <p className="line-clamp-2 flex-1 text-xs">
                                                    {e.lastMsg}
                                                </p>

                                                {e.isUnread && (
                                                    <i className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-extrabold not-italic text-white">
                                                        N
                                                    </i>
                                                )}
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-xs font-bold">
                                                    {e.oppositeUserId}
                                                </span>

                                                <span className="text-xs text-gray-500">
                                                    {e.suburb && (
                                                        <>
                                                            <span>
                                                                {e.suburb}
                                                            </span>

                                                            <i className="mx-1">
                                                                ·
                                                            </i>
                                                        </>
                                                    )}

                                                    <span>
                                                        {formatDateRelative(
                                                            e.lastAt
                                                        )}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
