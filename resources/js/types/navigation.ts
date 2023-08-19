export type LinkItem = {
    href: string;
    label: string;
};

export type DashLinkProps = {
    href?: string;
    target?: '_blank' | '_self';
    onClick?: Function;
    title: string;
    description?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    hidden?: boolean;
};

export type DashLinkGroupProps = {
    title: string;
    links: DashLinkProps[];
    showTitle?: boolean;
    hidden?: boolean;
};

export type DashNavigation = {
    groups: DashLinkGroupProps[];
};
