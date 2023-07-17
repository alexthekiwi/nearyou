export function formatMoney(input: number | null | undefined) {
    if (!input) {
        return '$0.00';
    }

    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(input);
}
