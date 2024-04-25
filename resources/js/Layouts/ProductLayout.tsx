import { PropsWithChildren, useState } from 'react';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/common/Modal';
import Toasts from '@/Components/common/Toasts';

export default function ProductLayout({
    title,
    canModify = false,
    children,
}: PropsWithChildren<{
    title: String;
    canModify?: boolean;
}>) {
    const [isShowModifyMenu, setShowModifyMenu] = useState(false);
    const [isShowListingDeleteModal, setShowListingDeleteModal] =
        useState(false);

    let backLink;

    const fromType = new URLSearchParams(location.search).get('type');
    const fromId = new URLSearchParams(location.search).get('id') || '';

    switch (fromType) {
        case 'chat': {
            backLink = route('chat.show', fromId);
            break;
        }
        default: {
            backLink = route('listings.index');
        }
    }

    console.log(
        '..?',
        new URLSearchParams(location.search).get('type'),
        new URLSearchParams(location.search).get('id')
    );

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="sticky top-0 z-[100] flex h-[52px] items-center justify-between bg-white px-4">
                <div className="flex">
                    <Link
                        className="flex h-[24px] w-[24px] items-center"
                        href={backLink}
                    >
                        <HiArrowSmallLeft />
                    </Link>

                    <span className="font-bold">{title}</span>
                </div>

                {canModify && (
                    <button
                        className="flex h-7 w-7 items-center justify-center"
                        onClick={() => setShowModifyMenu(!isShowModifyMenu)}
                    >
                        <BsThreeDots className="h-[80%] w-[80%]" />
                    </button>
                )}

                {isShowModifyMenu && (
                    <div
                        className="absolute left-0 top-full flex w-full translate-y-[-1px] flex-col rounded-b-lg bg-white pb-2 shadow-lg *:p-3 *:text-left *:text-black-light"
                        style={{
                            zIndex: 1,
                        }}
                    >
                        <button>Edit</button>

                        <button>Reserved</button>

                        <button>Sold</button>

                        <button onClick={() => setShowListingDeleteModal(true)}>
                            Delete
                        </button>
                    </div>
                )}
            </header>

            <main className="my-5">{children}</main>

            <Modal
                show={isShowListingDeleteModal}
                onClose={() => setShowListingDeleteModal(false)}
            >
                <p className="mb-8 text-center font-semibold text-gray-400">
                    Are you sure you want to delete this?
                </p>

                <div className="flex gap-5 px-6">
                    <button
                        className="flex-1 rounded-xl bg-gray-500 py-3 font-semibold text-white"
                        onClick={() => setShowListingDeleteModal(false)}
                    >
                        No
                    </button>

                    <button className="flex-1 rounded-xl bg-teal py-3 font-semibold text-white">
                        Yes
                    </button>
                </div>
            </Modal>

            <Toasts />
        </div>
    );
}
