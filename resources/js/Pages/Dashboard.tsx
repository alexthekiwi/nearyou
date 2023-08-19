import { Head } from '@inertiajs/react';
import {
    HiOutlineShoppingBag,
    HiOutlineHeart,
    HiOutlineUser,
    HiOutlineInformationCircle,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineUserGroup,
} from 'react-icons/hi2';
import Layout from '@/Layouts/Layout';
import { useAuth } from '@/lib/auth';
import PageHeader from '@/Components/common/PageHeader';
import SetLocationForm from '@/Components/location/SetLocationForm';
import { useMessage } from '@/lib/message';
import Message from '@/Components/common/Message';
import H2 from '@/Components/typography/H2';
import DashLink, { DashLinkProps } from '@/Components/dashboard/DashLink';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    const { user, logout } = useAuth();
    const message = useMessage();

    const iconClasses = 'h-6 w-6';

    const links: DashLinkProps[] = [
        {
            title: 'Browse listings',
            href: route('listings.index'),
            description: 'Browse your local listings',
            icon: <HiOutlineShoppingBag className={iconClasses} />,
        },
        {
            title: 'My favourites',
            href: route('favourites.index'),
            description: 'View your favourite listings',
            icon: <HiOutlineHeart className={iconClasses} />,
        },
        {
            title: 'Edit profile',
            href: route('profile.edit'),
            description: 'Update your details and password',
            icon: <HiOutlineUser className={iconClasses} />,
        },
        {
            title: 'Support',
            href: route('support'),
            description: 'Get help with using Near You',
            icon: <HiOutlineInformationCircle className={iconClasses} />,
        },
        {
            title: 'Log out',
            onClick: logout,
            description: 'Log out of your account',
            icon: <HiOutlineArrowLeftOnRectangle className={iconClasses} />,
        },
    ];

    const adminLinks: DashLinkProps[] = user.is_admin
        ? [
              {
                  title: 'Manage users',
                  href: route('users.index'),
                  description: 'Manage users',
                  icon: <HiOutlineUserGroup className={iconClasses} />,
              },
          ]
        : [];

    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container mb-24 mt-12 flex flex-col gap-8">
                <PageHeader heading="Kia ora!" />

                <div className="flex flex-col items-start gap-6">
                    {message && <Message {...message} />}
                    <SetLocationForm />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {links.map((link) => (
                        <DashLink key={link.title} {...link} />
                    ))}
                </div>

                {user.is_admin && (
                    <div className="flex flex-col gap-4">
                        <H2 className="col-span-full">
                            Administrators only 🔒
                        </H2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {adminLinks.map((link) => (
                                <DashLink key={link.title} {...link} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
