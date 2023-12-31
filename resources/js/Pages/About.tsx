import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import { useAuth } from '@/lib/auth';
import H2 from '@/Components/typography/H2';
import H3 from '@/Components/typography/H3';
import Stamp from '@/Components/common/Stamp';
import PageHeader from '@/Components/common/PageHeader';

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
                    <PageHeader heading="About Near You" />
                </div>

                <div className="container flex flex-col gap-y-4">
                    {isAuth && <NavBar links={primaryLinks} />}
                    <section className="mx-auto grid max-w-3xl gap-x-16 gap-y-8 lg:grid-cols-4">
                        <div className="lg:mt-10">
                            <Stamp animate />
                        </div>
                        <section className="prose mx-auto max-w-full lg:col-span-3 lg:pt-8">
                            <H2>Our ethos.</H2>
                            <H3 className="text-teal">Trade local.</H3>
                            <p>
                                Near You enables you to trade with nearby
                                neighbors, minimising the risk of scams. By
                                facilitating trades based on trust within the
                                local community, we strengthen connections
                                within our neighborhood.
                            </p>
                            <H3 className="text-teal">Save money.</H3>
                            <p>
                                Near you eliminates fees to promote local
                                secondhand buying and selling of goods.
                                Experience the exchange of quality goods at
                                affordable prices without the need to purchase
                                new.
                            </p>
                            <H3 className="text-teal">Freecycle.</H3>
                            <p>
                                Give away once loved items that may be valuable
                                to someone else in your neighborhood.
                            </p>
                            <H3 className="text-teal">Reduce waste.</H3>
                            <p>
                                By promoting the reuse of products through
                                secondhand trading, we contribute to resource
                                conservation and waste reduction, thereby aiding
                                in the protection of our environment.
                            </p>
                        </section>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
