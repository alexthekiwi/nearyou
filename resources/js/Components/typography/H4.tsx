import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H4({ children, className, as = 'h4' }: Props) {
    const classes = cn(
        className,
        'max-w-[650px] text-2xl font-normal md:text-3xl'
    );

    return React.createElement(as, { className: classes }, children);
}
