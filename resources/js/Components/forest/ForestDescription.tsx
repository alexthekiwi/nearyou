import { useState } from 'react';
import Modal from '@/Components/Modal';

const data = [
    [
        {
            title: 'Give planting a tree a go!',
            description:
                'After a second-hand trade, if the other person leaves a 4 or 5-leaf review,\na tree is automatically planted.',
            image: '/img/forest/tree_type3.png',
        },
        {
            title: 'Animals are popping into the bush!',
            description:
                'The bushier the forest gets,\nthe more animals show up.',
            image: '/img/forest/animal_type1.png',
        },
    ],
    [
        {
            title: 'Caution!',
            description:
                'If you get a low review from someone\nafter a second-hand trade, a tree disappears!',
            image: '/img/forest/tree_type1.png',
        },
        {
            title: 'Green second-hand trading!',
            description:
                'Trade with someone who has a green forest,\nbusy with warm transactions\namong many neighbors!',
            image: '/img/forest/animal_type2.png',
        },
    ],
];

export default function ForestDescription({ close }: { close: () => void }) {
    const [page, setPage] = useState(1);

    console.log({ setPage });

    return (
        <Modal show isFull>
            <div className="px-5 py-10 text-center">
                <h2 className="mb-10 text-center text-lg font-semibold text-gray-400">
                    Plant a tree in your forest
                </h2>

                {page <= data.length ? (
                    <div>
                        {data[page - 1].map((e, i) => (
                            <div
                                className="mb-10 flex flex-col items-center gap-4"
                                key={i}
                            >
                                <i
                                    className="h-8 w-7 bg-contain bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${e.image})`,
                                    }}
                                />

                                <h3 className="h-5 text-sm font-bold">
                                    {e.title}
                                </h3>

                                <p className="min-h-12 whitespace-pre-line px-2 text-xs font-bold text-gray-400">
                                    {e.description}
                                </p>
                            </div>
                        ))}

                        <button
                            className="w-full rounded-lg bg-teal py-3 font-semibold text-white"
                            onClick={setPage.bind(null, page + 1)}
                        >
                            Next
                        </button>
                    </div>
                ) : (
                    <div className="flex h-[24.5rem] flex-col">
                        <div className="flex flex-1 flex-col items-center">
                            <img alt="" src="/img/logo.png" className="h-28" />

                            <h3 className="mb-5 text-sm font-bold">Near You</h3>

                            <p className="whitespace-pre-line px-2 text-xs font-bold tracking-wider text-gray-400">
                                Invite friends who love nature like you
                                <br />
                                to start to start second-hand trading
                            </p>
                        </div>

                        <button
                            className="mb-3 w-full rounded-lg bg-gray-500 py-3 font-semibold text-white"
                            onClick={close}
                        >
                            Later
                        </button>

                        <a
                            className="w-full rounded-lg bg-teal py-3 font-semibold text-white"
                            href="sms:&body=Do You Like Ronaldo%3F %F0%9F%87%B5%F0%9F%87%B9"
                        >
                            Invite via SMS
                        </a>
                    </div>
                )}
            </div>
        </Modal>
    );
}
