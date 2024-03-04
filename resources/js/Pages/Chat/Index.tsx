import { Head, Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import Layout from '@/Layouts/Layout';
import type { Chat } from '@/types/api/chat';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import { formatDateRelative } from '@/lib/dates';
import Picture from '@/Components/common/Picture';
import { selectChats } from '@/lib/chatStore';
import { getListingStatus } from '@/lib/listings';

export default function ChatIndex() {
    const chats: Chat[] = useSelector(selectChats);

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
                        {chats.map((e) => (
                            <li key={e.id}>
                                <Link
                                    href={`/chat/${e.id}`}
                                    className="flex h-[3.625rem] gap-4"
                                >
                                    <div className="relative h-full w-[3.625rem] overflow-hidden rounded-lg">
                                        {e.status !== 1 && (
                                            <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black bg-opacity-50 text-[0.7rem] font-bold text-white">
                                                {getListingStatus(e.status)}
                                            </div>
                                        )}

                                        <Picture
                                            src={e.thumbnail}
                                            alt=""
                                            imgClassName="h-full w-full object-cover"
                                        />
                                    </div>

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
                                                        <span>{e.suburb}</span>

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
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
