import { formatMoney } from '@/lib/money';
import { App } from '@/types';
import H3 from '../typography/H3';

interface Props {
    listing: App['Models']['Listing'];
}

export default function ListingPreview({ listing }: Props) {
    return (
        <article>
            <H3>{listing.title} </H3>
            <p>{formatMoney(listing.price)}</p>
        </article>
    );
}
