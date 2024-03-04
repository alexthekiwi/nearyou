import React from 'react';
import { ToastProvider } from '@/lib/toast';
import { FavouriteProvider } from '@/lib/favourites';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <FavouriteProvider>{children}</FavouriteProvider>
        </ToastProvider>
    );
}
