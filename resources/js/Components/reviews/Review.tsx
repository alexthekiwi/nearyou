import { App } from '@/types';
import H3 from '../typography/H3';
import { formatDateNice } from '@/lib/dates';

interface Props {
    review: App['Models']['Review'];
    user?: App['Models']['User'];
}

export default function Review({ review, user }: Props) {
    const starsArray = Array.from(Array(review.stars)).map((_, i) => i);
    const wasBuyer = user?.id === review.buyer_id;

    return (
        <article className="flex flex-col gap-3 rounded-lg border border-gray-300 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                {user ? (
                    <p className="text-sm font-bold text-gray-400">
                        {user?.username} was the {wasBuyer ? 'buyer' : 'seller'}{' '}
                        of this item.
                    </p>
                ) : null}

                <p className="text-sm font-bold text-gray-400">
                    {formatDateNice(review.created_at)}
                </p>
            </div>

            <div className="flex gap-1">
                {starsArray.map((i) => (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-teal"
                        key={i}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
            </div>

            <div>{review.description}</div>
        </article>
    );
}
