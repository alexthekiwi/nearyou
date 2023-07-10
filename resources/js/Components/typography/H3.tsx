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
        'text-xl font-black !leading-tight lg:text-2xl'
    );

    return React.createElement(as, { className: classes }, children);
}
