import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TaxCalculator from './components/TaxCalculator/TaxCalculatorComponent';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <TaxCalculator></TaxCalculator>
      </Container>
    </ThemeProvider>
  );
}

export default App;