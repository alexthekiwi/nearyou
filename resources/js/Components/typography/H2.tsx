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
        'text-4xl font-black !leading-tight lg:text-5xl'
    );

    return React.createElement(as, { className: classes }, children);
}
