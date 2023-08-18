import { formatCurrency } from "../currency-formatter";

test('formats currency correctly', () => {
  expect(formatCurrency(1000)).toBe('$1,000.00');
  expect(formatCurrency(55000)).toBe('$55,000.00');
  expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
});