import { LinkItem } from '@/types';

export const primaryLinks: LinkItem[] = [
    { href: route('listings.index'), label: 'Browse' },
    { href: route('chat.index'), label: 'Chat' },
    { href: route('about'), label: 'About' },
    // { href: route('community'), label: 'Community' },
    { href: route('forest.index'), label: 'Forest' },
];

export const helpLinks: LinkItem[] = [
    { href: route('support'), label: 'Support' },
    { href: route('faq'), label: 'FAQ' },
    { href: route('privacy-policy'), label: 'Privacy policy' },
    { href: route('terms-and-conditions'), label: 'Terms of use' },
];

export const footerLinks: LinkItem[] = [
    { href: route('support'), label: 'Support' },
    { href: route('faq'), label: 'FAQ' },
    { href: route('privacy-policy'), label: 'Privacy policy' },
    { href: route('terms-and-conditions'), label: 'Terms of use' },
];
