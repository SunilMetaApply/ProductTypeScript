"use client";

import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../../env'; 
import { TextField, Button, Container, Box, Typography, Grid, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/authSlice';
import Support from '../Support/Support';

interface LoginValues {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required('User Name is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const [submitLoad, setSubmitLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: LoginValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: LoginValues, { resetForm }: FormikHelpers<LoginValues>) => {
    setSubmitLoad(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const token = data.token;

      dispatch(login({ username: values.username, token }));

      // Redirect the user
      router.push('/products'); 
      resetForm();

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setSubmitLoad(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={3}>
        <Typography variant="h4" gutterBottom>Login Form</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="username"
                    as={TextField}
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.username && touched.username)}
                    helperText={<ErrorMessage name="username" />}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.password && touched.password)}
                    helperText={<ErrorMessage name="password" />}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={submitLoad}
                  >
                    {submitLoad ? 'Submitting...' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>

<Support/>

    </Container>
  );
};

export default Login;
