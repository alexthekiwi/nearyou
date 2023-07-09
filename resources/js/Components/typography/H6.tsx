import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H6({ children, className, as = 'h6' }: Props) {
    const classes = cn(className, 'max-w-[650px] text-lg font-normal');

    return React.createElement(as, { className: classes }, children);
}
