import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/lib/toast';
import store from '@/store';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider>{children}</ToastProvider>
        </Provider>
    );
}
