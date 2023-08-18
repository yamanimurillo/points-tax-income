export function formatCurrency(value: number): string {
    return Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(value);
}