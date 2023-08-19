import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import H1 from '@/Components/typography/H1';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import { useAuth } from '@/lib/auth';
import H2 from '@/Components/typography/H2';
import H3 from '@/Components/typography/H3';

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
                    <section className="prose mx-auto">
                        <div>
                            <H2>Our ethos.</H2>
                        </div>
                        <div>
                            <H3 className="text-teal">Trade local.</H3>
                            <p>
                                Near You enables you to trade with nearby
                                neighbors, minimising the risk of scams. By
                                facilitating trades based on trust within the
                                local community, we strengthen connections
                                within our neighborhood.
                            </p>
                        </div>
                        <div>
                            <H3 className="text-teal">Save money.</H3>
                            <p>
                                Near you eliminates fees to promote local
                                secondhand buying and selling of goods.
                                Experience the exchange of quality goods at
                                affordable prices without the need to purchase
                                new.
                            </p>
                        </div>
                        <div>
                            <H3 className="text-teal">Freecycle.</H3>
                            <p>
                                Give away once loved items that may be valuable
                                to someone else in your neighborhood.
                            </p>
                        </div>
                        <div>
                            <H3 className="text-teal">Reduce waste.</H3>
                            <p>
                                By promoting the reuse of products through
                                secondhand trading, we contribute to resource
                                conservation and waste reduction, thereby aiding
                                in the protection of our environment.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
