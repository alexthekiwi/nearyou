import { usePage } from '@inertiajs/react';
import { Toast } from './toast';

export type MessageStatus = Toast['status'];

export type MessageText = Toast['message'];

export type Message = {
    status: MessageStatus;
    message: MessageText;
};

export function useMessage() {
    const { props } = usePage<{ message?: Message }>();
    console.log(props);

    return props.message;
}
