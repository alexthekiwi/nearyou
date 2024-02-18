import { PropsWithChildren, useState } from 'react';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/common/Modal';

export default function ChatLayout({
    children,
}: PropsWithChildren<{
    title?: String;
}>) {
    const [isShowModifyMenu, setShowModifyMenu] = useState(false);
    const [isShowListingDeleteModal, setShowListingDeleteModal] =
        useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="sticky top-0 z-[100] flex h-[52px] items-center justify-between bg-white px-4">
                <div className="flex">
                    <Link
                        className="flex h-[24px] w-[24px] items-center"
                        href={route('listings.index')}
                    >
                        <HiArrowSmallLeft />
                    </Link>

                    <span className="font-bold">Ronaldo</span>
                </div>
            </header>

            <main className="my-5">{children}</main>
        </div>
    );
}
