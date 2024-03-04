import { usePage } from '@inertiajs/react';
import { Toast } from './toast';

export type MessageStatus = Toast['status'];

export type MessageText = Toast['message'];

export type Message = {
    status: MessageStatus;
    message: MessageText;
};

export function useMessage() {
    const { props } = usePage<{ message?: Message | string }>();

    if (typeof props.message === 'string') {
        const defaultStatus: MessageStatus = 'success';
        return { status: defaultStatus, message: props.message };
    }

    return {
        status: props.message?.status ?? 'success',
        message: props.message?.message ?? '',
    };
}
