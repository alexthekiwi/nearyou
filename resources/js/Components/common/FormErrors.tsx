interface Props {
    title?: string;
    errors: Partial<Record<string | number, string>>;
}

export default function FormErrors({
    title = 'Oops, there was an error with your submission.',
    errors,
}: Props) {
    if (Object.values(errors).length === 0) {
        return null;
    }

    return (
        <aside className="max-w-2xl rounded-lg border border-red-500 bg-red-50 p-6 text-red-500">
            <p className="mb-4 text-xl font-bold">{title}</p>
            <ul className="ml-4 flex list-disc flex-col gap-2">
                {Object.values(errors).map((err, i) => (
                    <li key={i}>
                        {Array.isArray(err) ? (
                            err.map((e, j) => <span key={j}>{e}</span>)
                        ) : (
                            <span>{err}</span>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
