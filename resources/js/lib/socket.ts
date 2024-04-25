import { io, Socket } from 'socket.io-client';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { Chat } from '@/types/api/chat';
import {
    setChats,
    readChat,
    updateLastMsg,
    addChatRoom,
    changeStatus,
} from './chatStore';
import { LISTING_STATUS } from '@/constants';

export enum SOCKET_EVENT_NAME {
    CHAT_JOIN = 'chat/join',
    CHAT_MESSAGE = 'chat/message',
    CHAT_MESSAGE_SUCCESS = 'chat/message/success',
    CHAT_LAST_MESSAGE = 'chat/last-message',
    CHAT_MORE_LOAD = 'chat/more-load',
    CHAT_READ = 'chat/read',
    CHAT_RESERVED = 'chat/reserved',
    CHAT_SOLD = 'chat/sold',
    CHAT_LEAVE = 'chat/leave',
    CHAT_ADD_ROOM = 'chat/add-room',
    CHAT_REVIEW = 'chat/review',
    CHAT_REVIEW_SUCCESS = 'chat/review/success',

    RESERVED = 'reserved',
    SOLD = 'sold',

    ERROR = 'error',
    SUCCESS = 'success',
}

type SocketSuccess = {
    someUnread: boolean;
    chats: Chat[];
};

interface SockerData {
    socket: Socket;
    someUnread: boolean;
    chats: Chat[];
}

let isSocketConnected = false;

let _socket: Socket | null = null;
let socketPromise: Promise<SockerData> | null = null;

const initSocket = (jwt: string): Promise<SockerData> => {
    if (!socketPromise) {
        socketPromise = new Promise((resolve, reject) => {
            const socket = io(':3000', {
                auth: { jwt },
            });

            socket.once(
                SOCKET_EVENT_NAME.SUCCESS,
                ({ someUnread, chats }: SocketSuccess) => {
                    resolve({ socket, someUnread, chats });
                }
            );

            socket.on('error', () => {
                reject();
            });

            socket.on('disconnect', () => {
                _socket = null;
            });
        });
    }

    return socketPromise;
};

export const getSocket = async () => {
    let socket: Socket | null = null;

    if (_socket) {
        socket = _socket;
    } else if (socketPromise) {
        ({ socket } = await socketPromise);
    }

    return socket;
};

export const closeSocket = async () => {
    if (!isSocketConnected) return;

    isSocketConnected = false;

    const socket = await getSocket();

    if (socket) {
        socket.close();

        _socket = null;
        socketPromise = null;
    }
};

export default async ({
    dispatch = useDispatch(),
    jwt,
}: {
    dispatch?: Dispatch;
    jwt: string;
}) => {
    if (isSocketConnected) return;

    isSocketConnected = true;
    const { socket, chats: _chats } = await initSocket(jwt);

    _socket = socket;
    dispatch(setChats(_chats));

    socket.on(SOCKET_EVENT_NAME.CHAT_READ, (id: string) => {
        dispatch(readChat(id));
    });

    socket.on(SOCKET_EVENT_NAME.CHAT_LAST_MESSAGE, (arg) => {
        dispatch(updateLastMsg(arg));
    });

    socket.on(SOCKET_EVENT_NAME.CHAT_ADD_ROOM, (arg) => {
        dispatch(addChatRoom(arg));
    });

    socket.on(SOCKET_EVENT_NAME.RESERVED, (id) => {
        dispatch(changeStatus({ id, status: LISTING_STATUS.RESERVED }));
    });

    socket.on(SOCKET_EVENT_NAME.SOLD, (id) => {
        console.log('sold 1');

        dispatch(changeStatus({ id, status: LISTING_STATUS.SOLD }));
    });
};
