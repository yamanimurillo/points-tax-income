import { render, screen, fireEvent } from '@testing-library/react';
import { fetchTaxBrackets } from '../../../utils/tax-calculator';
import { mockedTaxBrackets } from '../../../utils/tax-calculator/mocks/taxBrackets';
import TaxCalculator from '../TaxCalculatorComponent';

jest.mock('../../../utils/tax-calculator/index');

const mockFetchTaxBrackets = fetchTaxBrackets as jest.MockedFunction<typeof fetchTaxBrackets>;

describe('TaxCalculator component', () => {  
  it('should renders correctly', () => {
    render(<TaxCalculator />);
    
    const incomeInput = screen.getByTestId('income-input');
    expect(incomeInput).toBeInTheDocument();

    const yearSelect = screen.getByTestId('year-select');
    expect(yearSelect).toBeInTheDocument();

    const calculateButton = screen.getByTestId('calculate-button');
    expect(calculateButton).toBeInTheDocument();
  });

  it('should calculates income tax amount correctly', async () => {

    // TODO: research why mocking the method is not working
    //   jest.mock('../../../utils/tax-calculator/tax-calculator', () => ({
    //     calculateIncomeTax: jest.fn().mockRejectedValue(new Error()),
    //   }));

    mockFetchTaxBrackets.mockResolvedValue(mockedTaxBrackets);
    
    render(<TaxCalculator />);
    
    const expectedTax = '$8,514.16';
    fireEvent.change(screen.getByLabelText('Enter yearly income (in CAD)'), { target: { value: '55000' } });
    fireEvent.click(screen.getByText('Calculate Income Tax'));

    const resultMessage = await screen.findByText(expectedTax);
    expect(resultMessage).toBeInTheDocument();
  });

  it('sholud render and error when calculating', async () => {

    mockFetchTaxBrackets.mockRejectedValue(new Error());

    const expectedError = 'Error';
    render(<TaxCalculator />);

    fireEvent.change(screen.getByLabelText('Enter yearly income (in CAD)'), { target: { value: '55000' } });
    fireEvent.click(screen.getByText('Calculate Income Tax'));

    const errorMessage = await screen.findByText(expectedError);
    expect(errorMessage).toBeInTheDocument();
  });

  it('sholud show form validation error', async () => {
    
    const expectedError = 'Income is required';
    render(<TaxCalculator />);

    fireEvent.change(screen.getByLabelText('Enter yearly income (in CAD)'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Calculate Income Tax'));

    const errorMessage = await screen.findByText(expectedError);
    expect(errorMessage).toBeInTheDocument();
  });
});