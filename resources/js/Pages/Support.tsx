import { Head } from '@inertiajs/react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import Layout from '@/Layouts/Layout';
import NavBar from '@/Components/common/NavBar';
import { helpLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import { DashLinkProps } from '@/types';
import DashLinkGroup from '@/Components/navigation/DashLinkGroup';
import { useMessage } from '@/lib/message';
import Message from '@/Components/common/Message';

interface Props {
    //
}

export default function Support({}: Props) {
    const message = useMessage();

    const links: DashLinkProps[] = [
        {
            title: 'Make a support request',
            href: route('support-requests.create'),
            icon: <HiOutlineQuestionMarkCircle className="h-6 w-6" />,
        },
    ];

    return (
        <Layout>
            <Head title="Support" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Support" />
                </div>

                <div className="container flex flex-col gap-y-8">
                    <NavBar links={helpLinks} />

                    <Message {...message} />

                    <DashLinkGroup
                        title="Support"
                        showTitle={false}
                        links={links}
                    />
                </div>
            </div>
        </Layout>
    );
}
