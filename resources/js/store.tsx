import { configureStore } from '@reduxjs/toolkit';
import chatSlice from '@/lib/chatStore';

export default configureStore({
    reducer: {
        chat: chatSlice,
    },
});
