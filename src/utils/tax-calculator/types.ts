export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}
