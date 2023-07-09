import cn from 'classnames';

interface Props {
    description?: string;
    className?: string;
}

function findAndInsertLinkHtml(string: string) {
    let result = string;

    result = result.replaceAll(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim,
        '<a class="underline" href="$&" target="_blank" rel="nofollow noreferrer">$&</a>'
    );

    return result;
}

export default function HelpText({ description, className = '' }: Props) {
    if (!description) return null;

    const descriptionHtml = findAndInsertLinkHtml(description);

    return (
        <span
            className={cn(className, 'text-sm')}
            dangerouslySetInnerHTML={{
                __html: descriptionHtml,
            }}
        />
    );
}
