import React from 'react';
import { useToast } from './toast';

interface ChangeProps {
    event: React.SyntheticEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
    data: Record<string, any>;
    setData: Function;
}

interface FileInputProps {
    event: React.SyntheticEvent<HTMLInputElement>;
    data: Record<string, any>;
    setData: Function;
}

export function handleChange({ event, data, setData }: ChangeProps) {
    if (!Object.keys(data).includes(event.currentTarget.name)) {
        return;
    }

    if (
        'checked' in event.currentTarget &&
        event.currentTarget.type === 'checkbox'
    ) {
        setData(
            event.currentTarget.name,
            event.currentTarget.checked ? true : null
        );
        return;
    }

    setData(event.currentTarget.name, event.currentTarget.value);
}

export function handleFileInput({ event, data, setData }: FileInputProps) {
    setData({
        ...data,
        [event.currentTarget.name]: event.currentTarget.files?.[0],
    });
}

interface UseSubmitOptions {
    message?: string;
    onError?: () => void;
    onSuccess?: () => void;
    onFinish?: () => void;
    preserveScroll?: boolean;
}

export function useSubmit({
    message,
    onSuccess,
    onError,
    onFinish,
    preserveScroll = false,
}: UseSubmitOptions = {}): any {
    const { addToast } = useToast();

    return {
        preserveScroll,
        onSuccess: () => {
            if (onSuccess) {
                onSuccess();
            } else if (message) {
                addToast({
                    message,
                    status: 'success',
                });
            }
        },
        onError: () => {
            if (onError) {
                onError();
            } else {
                addToast({
                    message: 'Oops! There was an error.',
                    status: 'error',
                });
            }
        },
        onFinish: () => {
            if (onFinish) {
                onFinish();
            }
        },
    };
}
