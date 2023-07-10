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
        'text-lg font-black !leading-tight lg:text-xl'
    );

    return React.createElement(as, { className: classes }, children);
}
