import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H3({ children, className, as = 'h3' }: Props) {
    const classes = cn(
        className,
        'max-w-[650px] text-xl leading-tight font-bold'
    );

    return React.createElement(as, { className: classes }, children);
}
