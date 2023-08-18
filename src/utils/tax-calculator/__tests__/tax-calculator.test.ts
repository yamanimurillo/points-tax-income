import { calculateIncomeTax } from '../tax-calculator';
import { fetchTaxBrackets } from '../index';
import { mockedTaxBrackets } from '../mocks/taxBrackets';

jest.mock('../index');

const mockFetchTaxBrackets = fetchTaxBrackets as jest.MockedFunction<typeof fetchTaxBrackets>;
const income = 55000;
const year = 2022;

describe('calculateIncomeTax', () => {
  it('calculates income tax correctly', async () => {

    mockFetchTaxBrackets.mockResolvedValue(mockedTaxBrackets);
    const expectedTax = 8514.17;
    const calculatedTax = await calculateIncomeTax(year, income);
    expect(calculatedTax).toBeCloseTo(expectedTax, 1);
  });

  it('throws an error when API call fails', async () => {
    const errorMessage = 'API error';
    mockFetchTaxBrackets.mockRejectedValue(new Error(errorMessage));

    await expect(calculateIncomeTax(year, income)).rejects.toThrowError(
      `Error calculating income tax: ${errorMessage}`
    );
  });
});