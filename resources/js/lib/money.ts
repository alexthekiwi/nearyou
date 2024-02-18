export function formatMoney(input: number | null | undefined, decimals = 2) {
    return input
        ? Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: decimals,
              minimumFractionDigits: decimals,
          }).format(input || 0)
        : '🌎 Freecycle';
}
