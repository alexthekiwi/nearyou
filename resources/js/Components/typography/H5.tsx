import cn from 'classnames';
import React from 'react';
import { HeadingElement } from '@/types';

interface Props {
    children?: React.ReactNode;
    className?: string;
    as?: HeadingElement;
}

export default function H5({ children, className, as = 'h5' }: Props) {
    const classes = cn(
        className,
        'max-w-[650px] text-xl font-normal md:text-2xl'
    );

    return React.createElement(as, { className: classes }, children);
}
