export type Chat = {
    id: string;
    thumbnail: string;
    oppositeUserId: string;
    suburb?: string;
    lastMsg: string;
    lastAt: number;
    isUnread: boolean;
    status: number;
};
