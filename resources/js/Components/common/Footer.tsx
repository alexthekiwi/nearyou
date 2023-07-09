import { Link } from '@inertiajs/react';

interface Props {
    //
}

export default function Footer({}: Props) {
    return (
        <footer className="bg-teal py-12 text-white">
            <div className="container flex flex-col gap-x-12 gap-y-2 text-sm md:flex-row md:justify-between">
                <p>&copy; Copyright Near You {new Date().getFullYear()}</p>
                <div className="flex gap-8">
                    <Link href="/privacy-policy/" className="underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
