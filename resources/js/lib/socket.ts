import { io, Socket } from 'socket.io-client';

type SocketSuccess = {
    someUnread: boolean;
};

type Chat = {
    id: string;
    thumbnail: string;
    oppositeUserId: string;
    suburb?: string;
    lastMsg: string;
    lastAt: number;
    isUnread: boolean;
};

let socket: Socket | null = null;
let socketPromise: Promise<Socket> | null = null;

let _someUnread = false;
let _chatArr: Chat[] = [];

export const setChatArr = (chatArr: Chat[]) => {
    _chatArr = chatArr;
};

export const socketData = {
    get someUnread() {
        return _someUnread;
    },
    get chatArr() {
        return _chatArr;
    },
};

export const initSocket = (sessionID: string): Promise<Socket> => {
    if (!socketPromise) {
        socketPromise = new Promise((resolve, reject) => {
            const _socket = io('http://localhost:3000', {
                auth: { sessionID },
            });

            _socket.on('success', ({ someUnread }: SocketSuccess) => {
                socket = _socket;

                _someUnread = someUnread;

                resolve(_socket);
            });

            _socket.on('error', () => {
                reject();
            });

            _socket.on('disconnect', () => {
                socket = null;
            });
        });
    }

    return socketPromise;
};

export const getSocket = async () => {
    let _socket: Socket | null = null;

    if (socket) {
        _socket = socket;
    } else if (socketPromise) {
        _socket = await socketPromise;
    }

    return _socket;
};
