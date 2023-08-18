import axios from 'axios';
import { TaxBracketsResponse } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchTaxBrackets(taxYear: number): Promise<TaxBracketsResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tax-year/${taxYear}`);
    return response.data;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error fetching tax brackets: ${errorMessage}`);
  }
};