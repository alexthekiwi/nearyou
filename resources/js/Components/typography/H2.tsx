import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H2({ children, className, as = 'h2' }: Props) {
    const classes = cn(
        className,
        'max-w-[650px] text-2xl leading-tight font-bold text-teal'
    );

    return React.createElement(as, { className: classes }, children);
}
