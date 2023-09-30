import {
    HiOutlineShoppingBag,
    HiOutlineHeart,
    HiOutlineUser,
    HiOutlineInformationCircle,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineUserGroup,
    HiOutlineBookOpen,
    HiOutlineLockClosed,
    HiOutlineNewspaper,
    HiOutlineChatBubbleLeft,
    HiOutlineQuestionMarkCircle,
    HiOutlineCheckBadge,
    HiOutlinePlus,
} from 'react-icons/hi2';
import cn from 'classnames';
import { DashNavigation } from '@/types';
import { useAuth } from '@/lib/auth';
import DashLinkGroup from '@/Components/navigation/DashLinkGroup';

interface Props {
    className?: string;
}

export default function DashNav({ className = '' }: Props) {
    const { user, logout } = useAuth();

    const iconClasses = 'h-6 w-6';

    const navigation: DashNavigation = {
        groups: [
            {
                title: 'Buying',
                links: [
                    {
                        title: 'Browse listings',
                        href: route('listings.index'),
                        description: 'Browse your local listings',
                        icon: <HiOutlineShoppingBag className={iconClasses} />,
                    },
                    {
                        title: 'Chat',
                        href: route('chat.index'),
                        description: 'Your open buying/selling chats',
                        icon: (
                            <HiOutlineChatBubbleLeft className={iconClasses} />
                        ),
                    },
                    {
                        title: 'My favourites',
                        href: route('favourites.index'),
                        description: 'View your favourite listings',
                        icon: <HiOutlineHeart className={iconClasses} />,
                    },
                ],
            },
            {
                title: 'Selling',
                links: [
                    {
                        title: 'My listings',
                        href: route('user-listings.index', { user: user.id }),
                        description: 'Your current listings',
                        icon: <HiOutlineNewspaper className={iconClasses} />,
                    },
                    {
                        title: 'List an item',
                        href: route('listings.create', { user: user.id }),
                        description: 'Create a new listing',
                        icon: <HiOutlinePlus className={iconClasses} />,
                    },
                ],
            },
            {
                title: 'Account',
                links: [
                    {
                        title: 'View profile',
                        href: route('users.show', { user: user.id }),
                        description: 'View your profile',
                        icon: <HiOutlineUser className={iconClasses} />,
                    },
                    {
                        title: 'Edit profile',
                        href: route('profile.edit'),
                        description: 'Update your details and password',
                        icon: <HiOutlineUser className={iconClasses} />,
                    },
                    {
                        title: 'My reviews',
                        href: route('user-reviews.index', { user: user.id }),
                        description: 'View your feedback',
                        icon: <HiOutlineCheckBadge className={iconClasses} />,
                    },
                    {
                        title: 'Log out',
                        onClick: logout,
                        description: 'Log out of your account',
                        icon: (
                            <HiOutlineArrowLeftOnRectangle
                                className={iconClasses}
                            />
                        ),
                    },
                ],
            },
            {
                title: 'Near You',
                links: [
                    {
                        title: 'Support',
                        href: route('support'),
                        description: 'Get help with using Near You',
                        icon: (
                            <HiOutlineInformationCircle
                                className={iconClasses}
                            />
                        ),
                    },
                    {
                        title: 'FAQ',
                        href: route('faq'),
                        description: 'Frequently asked questions',
                        icon: (
                            <HiOutlineQuestionMarkCircle
                                className={iconClasses}
                            />
                        ),
                    },
                    {
                        title: 'Privacy policy',
                        href: route('privacy-policy'),
                        description: 'How data is collected and secured',
                        icon: <HiOutlineLockClosed className={iconClasses} />,
                    },
                    {
                        title: 'Terms and conditions',
                        href: route('terms-and-conditions'),
                        description: 'Usage of the Near You website',
                        icon: <HiOutlineBookOpen className={iconClasses} />,
                    },
                ],
            },
            {
                title: 'Admin',
                hidden: !user.is_admin,
                links: [
                    {
                        title: 'Manage users',
                        href: route('users.index'),
                        description: 'Manage and impersonate app users',
                        icon: <HiOutlineUserGroup className={iconClasses} />,
                    },
                ],
            },
        ],
    };

    return (
        <nav className={cn('flex flex-col gap-8', className)}>
            {navigation.groups
                .filter((group) => !group.hidden)
                .map(({ title, links, showTitle }) => (
                    <DashLinkGroup
                        key={title}
                        title={title}
                        showTitle={showTitle}
                        links={links}
                    />
                ))}
        </nav>
    );
}
