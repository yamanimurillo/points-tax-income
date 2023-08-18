import { fetchTaxBrackets } from './index';

export async function calculateIncomeTax(
    year: number,
    income: number
): Promise<number> {
    try {
        const response = await fetchTaxBrackets(year);
        const taxBrackets = response.tax_brackets;
        const taxesPerBrackets = taxBrackets
            .slice()
            .sort((a, b) => a.min - b.min)
            .map(b => {
                if(b.max && income > b.max) return (b.max - b.min) * b.rate; //Income cover whole segment, get full taxes
                if(income >= b.min) return (income - b.min) * b.rate; //Income fits on segment, get remainder taxes 
                return 0;
            });

        return Number(taxesPerBrackets.reduce((a, b) => { return a + b; }).toFixed(2));
    } catch (error) {
        const errorMessage = (error as Error).message;
        throw new Error(`Error calculating income tax: ${errorMessage}`);
    }
}