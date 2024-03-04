import { createSlice } from '@reduxjs/toolkit';
import type { Chat } from '@/types/api/chat';

export interface ChatStoreState {
    chats: Chat[];
}

export const socketSlice = createSlice({
    name: 'chat',
    initialState: {
        value: {
            chats: [],
        } as ChatStoreState,
    },
    reducers: {
        setChats: (state, action) => {
            state.value.chats = action.payload;
        },
        readChat: (state, action) => {
            const chats = state.value.chats as Chat[];

            state.value.chats = chats.map((e) => {
                if (e.id === action.payload) {
                    e.isUnread = false;
                }

                return e;
            });
        },
        updateLastMsg: (state, action) => {
            const chats = state.value.chats as Chat[];

            console.log('updateLastMsg', action.payload, chats);

            const idx = chats.findIndex((e) => e.id === action.payload.id);

            if (idx > -1) {
                const [chat] = chats.splice(idx, 1);

                chat.lastMsg = action.payload.message;
                chat.isUnread = true;
                chat.lastAt = action.payload.createdAt;

                state.value.chats = [chat, ...chats];
            }
        },
        addChatRoom: (state, action) => {
            state.value.chats = [action.payload, ...state.value.chats];
        },
        changeStatus: (state, action) => {
            state.value.chats = state.value.chats.map((e) => {
                if (e.id === action.payload.id) {
                    e.status = action.payload.status;
                }

                return e;
            });
        },
    },
    selectors: {
        selectChats: (state) => state.value.chats,
        selectSomeUnread: (state) => state.value.chats.some((e) => e.isUnread),
    },
});

export const {
    actions: { setChats, readChat, updateLastMsg, addChatRoom, changeStatus },
    selectors: { selectChats, selectSomeUnread },
} = socketSlice;

export default socketSlice.reducer;
