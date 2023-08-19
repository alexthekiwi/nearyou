import { Link } from '@inertiajs/react';
import { footerLinks, helpLinks } from '@/lib/nav';
import LogoMark from './LogoMark';

interface Props {
    //
}

export default function Footer({}: Props) {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="container flex flex-col gap-x-12 gap-y-8 text-sm md:flex-row md:justify-between">
                <div className="flex items-center gap-6">
                    <LogoMark className="h-8 text-teal" />
                    <p>&copy; Copyright Near You {new Date().getFullYear()}</p>
                </div>
                <div className="flex flex-col gap-8 md:flex-row">
                    {footerLinks.map(({ label, href }) => (
                        <Link key={href} href={href} className="underline">
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
