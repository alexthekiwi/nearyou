import { LinkItem } from '@/types';

export const primaryLinks: LinkItem[] = [
    { href: route('listings.index'), label: 'Browse' },
    { href: route('chat.index'), label: 'Chat' },
    { href: route('about'), label: 'About' },
    { href: route('community'), label: 'Community' },
];

export const helpLinks: LinkItem[] = [
    { href: route('support'), label: 'Support' },
    { href: route('privacy-policy'), label: 'Privacy Policy' },
    { href: route('terms-and-conditions'), label: 'Terms & Conditions' },
];

export const footerLinks: LinkItem[] = [
    { href: route('support'), label: 'Support' },
    { href: route('privacy-policy'), label: 'Privacy Policy' },
    { href: route('terms-and-conditions'), label: 'Terms & Conditions' },
];
