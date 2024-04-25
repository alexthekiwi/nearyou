import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import type { Socket } from 'socket.io-client';
import Modal from '@/Components/Modal';
import { SOCKET_EVENT_NAME } from '@/lib/socket';

interface Props {
    show: boolean;
    chatId: string;
    socket: Socket | null;
    onClose: () => void;
    onReviewSuccess: () => void;
}

const textareaPlaceholder = `Please leave an honest review!

* Selecting five leaves gifts one tree
to your neighbor.`;

export default function ReviewModal({
    show,
    chatId,
    socket,
    onClose,
    onReviewSuccess,
}: Props) {
    let isSending = false;

    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const [leavesCount, setLeavesCount] = useState(0);

    const [description, setDescription] = useState('');

    useEffect(
        () => () => {
            if (socket) {
                socket.off(SOCKET_EVENT_NAME.CHAT_REVIEW_SUCCESS);
            }
        },
        []
    );

    useEffect(() => {
        if (socket && !isSocketConnected) {
            setIsSocketConnected(true);

            socket.on(SOCKET_EVENT_NAME.CHAT_REVIEW_SUCCESS, () => {
                onReviewSuccess();

                onClose();
            });
        }
    }, [socket, onClose, isSocketConnected, onReviewSuccess]);

    const send = () => {
        if (socket) {
            if (!leavesCount) {
                alert('Please select the number of leaves');
                return;
            }

            if (!description.trim()) {
                alert('Please write a review');
                return;
            }

            if (isSending) return;

            isSending = true;

            socket.emit(SOCKET_EVENT_NAME.CHAT_REVIEW, {
                chatId,
                description,
                stars: leavesCount,
            });
        }
    };

    return (
        <Modal show={show} closeable isFull onClose={onClose}>
            <div className="p-5">
                <h1 className="mb-8 text-center text-lg font-semibold text-gray-400">
                    Review
                </h1>

                <div className="mb-10 flex justify-center gap-3.5">
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <button
                                className="relative h-6 w-6"
                                key={i}
                                onClick={() => setLeavesCount(i + 1)}
                            >
                                <i
                                    className="absolute bottom-0 left-0 right-0 top-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage:
                                            'url("/img/leaf_off.png")',
                                    }}
                                />

                                <Transition
                                    appear={leavesCount > i}
                                    show={leavesCount > i}
                                    className="absolute bottom-0 left-0 right-0"
                                    enter="transition-height duration-500"
                                    enterFrom="h-0"
                                    enterTo="h-full"
                                    leave="transition-height duration-300"
                                    leaveFrom="h-full"
                                    leaveTo="h-0"
                                >
                                    <i
                                        className="block h-full bg-[length:1.5rem_1.5rem] bg-bottom bg-no-repeat"
                                        style={{
                                            backgroundImage:
                                                'url("/img/leaf_on.png")',
                                        }}
                                    />
                                </Transition>
                            </button>
                        ))}
                </div>

                <textarea
                    className="h-64 w-full resize-none rounded-lg border border-gray-input-border bg-gray-100 p-3 text-sm placeholder:text-[#c7c7c7] focus:bg-white"
                    placeholder={textareaPlaceholder}
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="mb-8 text-right text-xs text-gray-400">
                    {description.length}/500
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
