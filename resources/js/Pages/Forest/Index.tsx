import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import H2 from '@/Components/typography/H2';
import ForestBg from '@/Components/forest/ForestBg';
import ForestDescription from '@/Components/forest/ForestDescription';
import ForestComponent from '@/Components/forest/Index';

interface Props {
    trees: number;
}

export default function Forest({ trees }: Props) {
    /**
     * 0: Starter (0 ~ 4)
     * 1: Beginner (5 ~ 14)
     * 2: Good (15 ~ 24)
     * 3: Excellent (25 ~ 44)
     * 4: Great (45)
     */
    const lv = (() => {
        if (trees >= 45) return 4;
        if (trees >= 25) return 3;
        if (trees >= 15) return 2;
        if (trees >= 5) return 1;
        return 0;
    })();

    const title = (() => {
        switch (lv) {
            case 0:
                return 'Starter';
            case 1:
                return 'Beginner';
            case 2:
                return 'Good';
            case 3:
                return 'Excellent';
            case 4:
                return 'Great';
            default:
                return 'Starter';
        }
    })();

    const [isShowForestDescription, setIsShowForestDescription] =
        useState(false);

    return (
        <Layout>
            <Head title="Forest" />

            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <PageHeader heading="Forest" />
                </div>

                <div className="container">
                    <NavBar links={primaryLinks} />

                    <ForestComponent trees={trees} />
                </div>
            </div>
        </Layout>
    );
}
