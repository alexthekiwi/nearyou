import * as React from 'react';
import { v4 as uuid } from 'uuid';

export interface Toast {
    _id?: string;
    message: string;
    status?: 'success' | 'error' | 'default' | 'warning';
    timeout?: number;
}

interface ToastContextInterface {
    toasts: Toast[];
    addToast: (toast: Toast) => void;
    removeToast: (id: Toast['_id']) => void;
}

const ToastContext = React.createContext<ToastContextInterface>({
    toasts: [],
    addToast: () => {},
    removeToast: () => {},
});

export function ToastProvider({ children }: any) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    /**
     * Add a new toast popup message
     */
    function addToast({ message, status, timeout = 4000 }: Toast) {
        const newToast: Toast = { message, status, timeout };

        newToast._id = uuid();

        setToasts((curr) => [...curr, newToast]);

        setTimeout(() => {
            removeToast(newToast._id);
        }, timeout);
    }

    /**
     * Memoise the addToast function so we can use it in dependency arrays
     */
    const memoisedToast = React.useCallback(addToast, []);

    /**
     * Remove a toast message
     */
    function removeToast(id: Toast['_id']) {
        setToasts((curr) => curr.filter((toast) => toast._id !== id));
    }

    const context: ToastContextInterface = {
        toasts,
        addToast: memoisedToast,
        removeToast,
    };

    return (
        <ToastContext.Provider value={context}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => React.useContext(ToastContext);
