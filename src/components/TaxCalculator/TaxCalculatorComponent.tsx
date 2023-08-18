import React, { useState } from 'react';
import { FormControl, Box, Button, Container, TextField, InputLabel, MenuItem, Select, Alert, Typography, InputAdornment, AlertTitle } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { calculateIncomeTax } from '../../utils/tax-calculator/tax-calculator';
import PointsLogo from './PointsPGDark.png';
import { formatCurrency } from '../../utils/currency-formatter/currency-formatter';

const yearOptions = [2022, 2021, 2020, 2019];

const validationSchema = Yup.object().shape({
    income: Yup.number().positive().required('Income is required'),
    year: Yup.number().oneOf(yearOptions, 'Invalid year').required('Year is required'),
});

interface TaxCalculatorProps {
}

const TaxCalculator: React.FC<TaxCalculatorProps> = () => {

    const [incomeTax, setIncomeTax] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const initialValues = { income: '', year: 2022 };

    const handleSubmit = async (values: any) => {

        setError(null);
        setIncomeTax(null);

        try {
            const taxAmount = await calculateIncomeTax(values.year, values.income);
            setIncomeTax(formatCurrency(taxAmount));
        } catch {
            setError("An error occured, please try again.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ width:420}}>
            <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width:'100%'
                }}
            >
                <img
                    src={PointsLogo}
                    alt="Points Logo"
                    width={120}
                    style={{ marginBottom: '2em' }} />

                    <Typography component="h1" variant="h6">
                        <strong>Income Tax Calculator</strong>
                    </Typography>

                <Box sx={{ mt: 1, width: '21em' }}>
                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={validationSchema} 
                        onSubmit={handleSubmit}>
                        {({ values, isSubmitting }) => (
                            <Form>
                                <Box mt={3}>                            
                                    <Field 
                                        as={TextField} 
                                        type="number" 
                                        id="income"
                                        name="income"
                                        label="Enter yearly income (in CAD)" 
                                        fullWidth
                                        data-testid="income-input"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}>
                                        
                                    </Field>
                                    <ErrorMessage name="income" render={(msg: string) => <span style={{ color: 'red', fontSize:15}}>{msg}</span>} />
                                </Box>
                            
                                <Box mt={3}>
                                    <Field as={FormControl} fullWidth>
                                        <InputLabel htmlFor="year" sx={{ bgcolor: 'white', pl:1, pr: 1 }}>
                                            Select tax year
                                        </InputLabel>
                                        <Select 
                                            data-testid="year-select"
                                            labelId="year" 
                                            id="year" 
                                            name="year" 
                                            value={values.year}
                                        >
                                            {yearOptions.map((year) => (
                                                <MenuItem 
                                                    id={year.toString()}
                                                    key={year} 
                                                    value={year}
                                                >
                                                {year}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Field>
                                </Box>

                                <Box mt={3}>
                                    <Button 
                                        data-testid="calculate-button"
                                        variant="contained"
                                        type="submit"
                                        size="large"
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Calculating...' : 'Calculate Income Tax '}
                                    </Button>
                                </Box>

                                <Box mt={3}>
                                    {incomeTax && 
                                        <Alert severity="info">
                                            <AlertTitle>Result</AlertTitle>
                                            Income Tax Amout: <strong>{incomeTax}</strong>
                                        </Alert>
                                    }

                                    {error && 
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {error}
                                        </Alert>
                                    }
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>

                
            </Box>
        </Container>
    );
};

export default TaxCalculator;