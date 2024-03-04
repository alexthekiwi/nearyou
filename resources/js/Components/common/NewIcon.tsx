export default function NewIcon({ className = '' }: { className?: string }) {
    return (
        <i
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-extrabold not-italic text-white ${className}`}
        >
            N
        </i>
    );
}
