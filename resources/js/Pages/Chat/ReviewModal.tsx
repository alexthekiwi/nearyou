import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function ReviewModal({ listingId }: { listingId: string }) {
    const [leafCount, setLeafCount] = useState(0);

    const [review, setReview] = useState('');

    const send = () => {};

    return (
        <Modal show closeable={false} isFull>
            <div className="p-5">
                <h1 className="mb-8 text-center text-lg font-semibold text-gray-400">
                    Review
                </h1>

                <div className="mb-10 flex justify-center gap-3.5">
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <button
                                className="h-6 w-6 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(/img/leaf_${
                                        leafCount > i ? 'on' : 'off'
                                    }.png)`,
                                }}
                                onClick={() => setLeafCount(i + 1)}
                            />
                        ))}
                </div>

                <div className="relative h-64 w-full">
                    <textarea
                        className="h-full w-full rounded-lg border border-gray-input-border bg-gray-100 p-3 text-sm focus:bg-white"
                        placeholder="Please leave an honest review!"
                        maxLength={500}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />

                    <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                        {review.length}/500
                    </div>
                </div>

                <button
                    className="w-full rounded-lg bg-teal py-3 font-semibold text-white"
                    onClick={send}
                >
                    Send
                </button>
            </div>
        </Modal>
    );
}
