import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import type { Socket } from 'socket.io-client';
import { differenceInMinutes } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { FaCamera, FaPen } from 'react-icons/fa';
import {
    IoArrowBack,
    IoAlarm,
    IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegMessage } from 'react-icons/fa6';
import { App } from '@/types';
import { useAuth } from '@/lib/auth';
import { getSocket } from '@/lib/socket';
import { formatDateChat1, formatDateChat2, formatDateNice } from '@/lib/dates';
import Picture from '@/Components/common/Picture';
import { formatMoney } from '@/lib/money';
import Modal from '@/Components/Modal';
import SoldItFirstModal from './SoldItFirstModal';
import ReviewModal from './ReviewModal';

interface Props {
    chat: App['Models']['Chat'];
}

enum Writer {
    SYSTEM = 0,
    BUYER = 1,
    SELLER = 2,
    TIME = -2,
}

type Chat = {
    id: string;
    writer: Writer;
    message: string;
    createdAt: string;
};

type ChatJoin = {
    chatId: string;
    chatArr: Chat[];
};

export default function ChatShow({ chat }: Props) {
    const { user } = useAuth();

    console.log({ chat });

    const isBuyer = chat.buyer_id === user.id;
    const isSeller = !isBuyer;

    const [isJoined, setIsJoined] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [chatArr, setChatArr] = useState<Chat[]>([]);

    const [socket, setSocket] = useState<Socket | null>(null);

    const [isSending, setIsSending] = useState(false);

    const [tmpMessage, setTmpMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [isNoMoreChat, setIsNoMoreChat] = useState(false);
    const [isPauseScrollEvt, setIsPauseScrollEvt] = useState(false);

    const [status, setStatus] = useState(chat.status);

    const [isShowSoldItFirstModal, setIsShowSoldItFirstModal] = useState(false);
    const [isShowReviewModal, setIsShowReviewModal] = useState(false);

    const chatRefs = useRef<any[]>([]);

    let lastChatRefs = [...chatRefs.current];

    // 채팅 메세지에 시간 추가
    const addCharArrTimestamp = (_chatArr: Chat[]) => {
        const lastTimestamp = _chatArr[0].createdAt;
        let lastTimestampDate = new Date(lastTimestamp);

        _chatArr.splice(0, 0, {
            writer: Writer.TIME,
            createdAt: lastTimestamp,
            message: formatDateChat1(lastTimestamp),
            id: uuidv4(),
        });

        const newChatArr: Chat[] = [];

        _chatArr.reduce((a, b) => {
            const createdAtDate = new Date(b.createdAt);

            // 날짜가 바뀌었을 때
            if (
                formatDateNice(createdAtDate) !==
                formatDateNice(lastTimestampDate)
            ) {
                a.push({
                    writer: Writer.TIME,
                    createdAt: b.createdAt,
                    message: formatDateChat1(b.createdAt),
                    id: uuidv4(),
                });

                lastTimestampDate = new Date(b.createdAt);
            } else {
                const diffMin = differenceInMinutes(
                    createdAtDate,
                    lastTimestampDate
                );

                // 10분 이상 차이날 때
                if (diffMin >= 10) {
                    a.push({
                        writer: Writer.TIME,
                        createdAt: b.createdAt,
                        message: formatDateChat2(b.createdAt),
                        id: uuidv4(),
                    });

                    lastTimestampDate = new Date(b.createdAt);
                }
            }

            a.push(b);

            return a;
        }, newChatArr);

        return newChatArr;
    };

    useEffect(() => {
        let _socket: Socket | null = null;

        (async () => {
            _socket = await getSocket();

            setSocket(_socket);

            if (_socket) {
                // 채팅방 연결
                _socket.on(
                    'chat-join',
                    ({ chatId, chatArr: _chatArr }: ChatJoin) => {
                        if (chatId === chat.id) {
                            setIsJoined(true);

                            setIsPauseScrollEvt(true);

                            setChatArr(addCharArrTimestamp(_chatArr));

                            if (_chatArr.length < 30) {
                                setIsNoMoreChat(true);
                            }
                        }
                    }
                );

                // 채팅 메세지 수신
                _socket.on('chat-message', (_chat: Chat) => {
                    if (chatContainerRef.current) {
                        const { scrollHeight, offsetHeight, scrollTop } =
                            chatContainerRef.current;

                        if (scrollHeight - offsetHeight === scrollTop)
                            setIsPauseScrollEvt(true);
                    }

                    setChatArr((prevChatArr) => {
                        const newChatArr = [...prevChatArr];

                        // lastFind
                        const tmpChatArr = [...newChatArr].reverse();

                        const lastTimestamp = tmpChatArr.find(
                            ({ writer: _writer }) => _writer === Writer.TIME
                        )?.createdAt;

                        if (lastTimestamp) {
                            const createdAtDate = new Date(_chat.createdAt);
                            const lastTimestampDate = new Date(lastTimestamp);

                            // 날짜가 바뀌었을 때
                            if (
                                formatDateNice(createdAtDate) !==
                                formatDateNice(lastTimestampDate)
                            ) {
                                newChatArr.push({
                                    writer: Writer.TIME,
                                    createdAt: _chat.createdAt,
                                    message: formatDateChat1(_chat.createdAt),
                                    id: uuidv4(),
                                });
                            } else {
                                const diffMin = differenceInMinutes(
                                    createdAtDate,
                                    lastTimestampDate
                                );

                                // 10분 이상 차이날 때
                                if (diffMin >= 10) {
                                    newChatArr.push({
                                        writer: Writer.TIME,
                                        createdAt: _chat.createdAt,
                                        message: formatDateChat2(
                                            _chat.createdAt
                                        ),
                                        id: uuidv4(),
                                    });
                                }
                            }
                        }

                        newChatArr.push(_chat);

                        _socket?.emit('chat-read', chat.id);

                        return newChatArr;
                    });
                });

                // 채팅 메세지 전송 성공
                _socket.on('chat-message-success', () => {
                    setIsSending(false);
                });

                // 채팅 메세지 더 불러오기 완료
                _socket.on('chat-more-load', (_chatArr: Chat[]) => {
                    if (_chatArr.length === 0) {
                        setIsNoMoreChat(true);
                    } else {
                        if (_chatArr.length < 30) {
                            setIsNoMoreChat(true);
                        }

                        setChatArr((prevChatArr) => [
                            ...addCharArrTimestamp(_chatArr),
                            ...prevChatArr,
                        ]);
                    }

                    setIsLoading(false);
                    setIsPauseScrollEvt(false);
                });

                // 채팅 예약 완료
                _socket.on('chat-reserved', () => {
                    chat.status = 3;
                    setStatus(3);
                });

                // 채팅 판매 완료
                _socket.on('chat-sold', () => {
                    chat.status = 4;
                    setStatus(4);
                });

                _socket.emit('chat-join', chat.id);
            } else {
                console.log('socket is null');
            }
        })();

        return () => {
            if (_socket) {
                _socket.emit('chat-leave');
                _socket.removeListener('chat-join');
                _socket.removeListener('chat-message');
                _socket.removeListener('chat-message-success');
                _socket.removeListener('chat-more-load');
            }
        };
    }, []);

    // 메세지 보내기
    const sendMessage = () => {
        if (!isSending && socket && inputMessage.trim()) {
            setTmpMessage(inputMessage);

            socket.emit('chat-message', chat.id, inputMessage);

            setInputMessage('');

            setIsSending(true);
        }
    };

    // 무한 스크롤 이벤트
    const checkMoreLoadByScroll = (
        e: React.UIEvent<HTMLDivElement, UIEvent>
    ) => {
        if (isPauseScrollEvt) return;

        if (isNoMoreChat) return;

        const { scrollTop, scrollHeight } = e.target as HTMLDivElement;

        if (
            !isLoading && // 로딩 중이 아닐 때
            scrollTop / scrollHeight < 0.1 // 스크롤이 상단 10% 이하일 때
        ) {
            setIsLoading(true);

            const topChat = chatArr.find(
                ({ writer: _writer }) => _writer !== Writer.TIME
            );

            if (topChat) {
                setIsPauseScrollEvt(true);

                socket?.emit(
                    'chat-more-load',
                    chat.id,
                    new Date(topChat.createdAt).getTime()
                );
            }
        }
    };

    useEffect(() => {
        if (isPauseScrollEvt) {
            const newChatRef = chatRefs.current.filter(
                (e) => !lastChatRefs.includes(e)
            ) as HTMLParagraphElement[];

            if (newChatRef.length && chatContainerRef.current) {
                const bottomChatRef = newChatRef.pop();

                if (bottomChatRef) {
                    chatContainerRef.current.scrollTop =
                        bottomChatRef.offsetTop -
                        chatContainerRef.current.offsetTop -
                        chatContainerRef.current.offsetHeight +
                        bottomChatRef.offsetHeight;
                }
            }

            setIsPauseScrollEvt(false);
        }

        lastChatRefs = [...chatRefs.current];
    }, [chatArr]);

    const reserved = () => {
        socket?.emit('chat-reserved', chat.id);
    };

    const sold = () => {
        socket?.emit('chat-sold', chat.id);
    };

    return (
        <main className="flex h-screen flex-col pb-8">
            <header className="flex h-[52px] items-center px-4">
                <Link
                    className="flex h-10 basis-10 items-center justify-center"
                    href={route('chat.index')}
                >
                    <IoArrowBack className="h-1/2 w-1/2" />
                </Link>

                <div className="flex flex-1 items-center justify-center gap-1.5 font-semibold">
                    <p className="text-lg">{chat.oppositeUserId}</p>

                    <p className="h-5 rounded-full bg-teal px-1.5 text-xs leading-5 text-white">
                        999+ Trees
                    </p>
                </div>

                <button className="flex h-10 basis-10 items-center justify-center">
                    <BsThreeDots className="h-1/2 w-1/2" />
                </button>
            </header>

            <div className="flex h-28 flex-col gap-2 bg-gray-100 px-4 py-2.5">
                <Link
                    href={`/listings/${chat.listing_id}`}
                    className="grid h-[3.625rem] gap-x-2.5"
                    style={{
                        gridTemplateColumns: '3.625rem 1fr',
                        gridTemplateRows: '0.8fr 1fr',
                    }}
                >
                    <Picture
                        src={chat.thumbnail}
                        alt={chat.title}
                        imgClassName="aspect-square h-full rounded-lg object-cover"
                        pictureClassName="row-start-1 row-end-3"
                    />

                    <p className="flex items-center text-xs">{chat.title}</p>

                    <p className="flex items-center text-sm font-semibold text-teal">
                        {formatMoney(chat.price, 0)}
                    </p>
                </Link>

                <div className="flex flex-1 gap-2 py-0.5 *:flex *:flex-1 *:items-center *:gap-[0.7rem] *:rounded-md *:border *:border-white-dirty *:bg-white *:pl-2 *:text-sm *:font-semibold *:text-gray-400">
                    <button
                        className={
                            status >= 3
                                ? 'pointer-events-none !border-teal !text-teal'
                                : ''
                        }
                        onClick={reserved}
                    >
                        <IoAlarm className="h-4 w-4" />

                        <p>Reserved</p>
                    </button>

                    <button
                        className={
                            status === 4
                                ? 'pointer-events-none !border-teal !text-teal'
                                : ''
                        }
                        onClick={sold}
                    >
                        <IoCheckmarkCircleOutline className="h-4 w-4" />

                        <p>Sold</p>
                    </button>

                    <button
                        onClick={() =>
                            status === 4
                                ? setIsShowReviewModal(true)
                                : setIsShowSoldItFirstModal(true)
                        }
                    >
                        <FaRegMessage className="h-3 w-4" />

                        <p>Review</p>
                    </button>
                </div>
            </div>

            <div className="relative mb-6 flex-1 overflow-hidden">
                {isPauseScrollEvt && <div className="absolute h-full w-full" />}

                <div
                    ref={chatContainerRef}
                    onScroll={checkMoreLoadByScroll}
                    className="flex h-full flex-col gap-2.5 overflow-y-auto scroll-auto whitespace-pre-line px-4 text-sm"
                >
                    {isJoined ? (
                        !isNoMoreChat && (
                            <p className="text-center text-xs text-gray-light first:mt-2">
                                Scroll up for more
                            </p>
                        )
                    ) : (
                        <p className="text-center text-xs text-gray-light first:mt-2">
                            Loading...
                        </p>
                    )}

                    {chatArr.map(({ message, writer: _writer, id }, i) => {
                        let cls = 'first:mt-2';

                        if (_writer === Writer.TIME) {
                            cls +=
                                ' text-center text-xs text-gray-light font-semibold';
                        } else {
                            cls += ' rounded-2xl px-3 py-4 ';

                            if (_writer === Writer.SYSTEM) {
                                cls +=
                                    'w-full bg-red-300 font-semibold text-black-light text-center';
                            } else {
                                cls += 'w-fit text-white ';

                                if (
                                    (isBuyer && _writer === Writer.BUYER) ||
                                    (isSeller && _writer === Writer.SELLER)
                                ) {
                                    cls += 'self-end bg-green-semi-dark';
                                } else {
                                    cls += 'bg-gray-light';
                                }
                            }
                        }

                        return (
                            <p
                                key={id}
                                ref={(el) => (chatRefs.current[i] = el)}
                                className={cls}
                            >
                                {message}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* Input */}
            <div className="flex h-10 gap-1.5 px-3">
                <button
                    type="button"
                    className="relative flex w-10 items-center justify-center rounded-lg bg-teal-semi-light"
                >
                    <FaCamera className="h-full w-[45%] text-white" />

                    <input
                        className="absolute h-full w-full opacity-0"
                        type="file"
                        accept="image/*"
                        multiple
                    />
                </button>

                <div className="relative flex-1">
                    <input
                        className="h-full w-full !border-gray-input-border !pr-11"
                        type="text"
                        placeholder="Write"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                !e.nativeEvent.isComposing
                            ) {
                                sendMessage();
                            }
                        }}
                    />

                    <button
                        type="button"
                        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-lg bg-teal-dark"
                        onClick={sendMessage}
                    >
                        <FaPen className="h-full w-1/2 text-white" />
                    </button>
                </div>
            </div>

            {isShowSoldItFirstModal && (
                <SoldItFirstModal
                    close={() => setIsShowSoldItFirstModal(false)}
                />
            )}

            {isShowReviewModal && <ReviewModal listingId={chat.listing_id} />}
        </main>
    );
}
