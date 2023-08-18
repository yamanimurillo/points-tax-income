import axios from 'axios';
import { fetchTaxBrackets } from '../api';
import { mockedTaxBrackets } from '../mocks/taxBrackets';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('fetchTaxBrackets for 2022', () => {
  it('get tax brackets successfully', async () => {
    mockAxios.get.mockResolvedValue({ data: mockedTaxBrackets });
    const taxBrackets = await fetchTaxBrackets(2022);
    expect(taxBrackets).toEqual(mockedTaxBrackets);
  });

  it('throws an error when the request fails', async () => {
    mockAxios.get.mockRejectedValue(new Error('Network error'));
    await expect(fetchTaxBrackets(2022)).rejects.toThrowError(
      'Error fetching tax brackets: Network error'
    );
  });
});