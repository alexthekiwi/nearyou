import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import { useAuth } from '@/lib/auth';

interface Props {
    //
}

export default function About({}: Props) {
    const { isAuth } = useAuth();

    return (
        <Layout>
            <Head title="About Near You" />
            <div className="my-6 flex flex-col gap-4 md:gap-8">
                <div className="container">
                    <H1>About Near You</H1>
                </div>

                <div className="container flex flex-col gap-y-4">
                    {isAuth && <NavBar links={primaryLinks} />}
                </div>
            </div>
        </Layout>
    );
}
