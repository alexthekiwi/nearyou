import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H1({ children, className, as = 'h1' }: Props) {
    const classes = cn(className, 'text-5xl font-black lg:text-6xl');

    return React.createElement(as, { className: classes }, children);
}
