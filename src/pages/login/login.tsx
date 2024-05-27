import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardActions, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from "react";
import { useAuthContext } from '../../shared/contexts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LabelLogin } from '../../shared/components/label/LabelLogin';
import { AlertDinamic } from '../../shared/components/alert/AlertDinamic';
import { Link as RouterLink } from 'react-router-dom'; 


const logo = 'logoLogin.png'

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),
});


export const Login: React.FC = () => {
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlertError, setShowAlertError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        login(values.email, values.password)
          .then((result) => {
            if (typeof result === 'string' && result !== 'Login successful') {
              setShowAlertError(true);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('Erro genérico durante o login:', error);
          });
      },
  });

  useEffect(() => {
    if (showAlertError) {
        const timer = setTimeout(() => {
            setShowAlertError(false);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [showAlertError]);

  return (
    <Box sx={{backgroundColor: "#10141E"}} className="w-screen h-screen flex items-center justify-center" >

      {showAlertError && (
          <AlertDinamic message="Invalid credentials, please try again!" severityTipo='error' />
      )}

        <Card 
          className='w-[438px] h-[534px]'
          style={{
            borderRadius: 18,
            padding: '23px',
            overflow: 'hidden',
            boxShadow: `
              0 4px 8px rgba(150, 150, 150, 0.15),
              0 4px 12px rgba(150, 150, 150, 0.15),
              0 4px 16px rgba(150, 150, 150, 0.2),
              0 4px 20px rgba(150, 150, 150, 0.2),
              0 4px 24px rgba(150, 150, 150, 0.25),
              0 4px 28px rgba(150, 150, 150, 0.25),
              0 4px 32px rgba(150, 150, 150, 0.3)
            `
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
              <img src={logo} alt="Logo" style={{ width: 150, height: 130, borderRadius: '40px', marginBottom: '10px', marginTop: '5px' }} />
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <LabelLogin htmlFor='Idemail' title='E-mail' />
                  <TextField
                      role="E-mail"
                      id='Idemail'
                      fullWidth
                      type="email"
                      variant="filled"
                      placeholder="@gmail.com"
                      {...formik.getFieldProps('email')}
                      disabled={isLoading}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      style={{ marginBottom: '23px', borderRadius: 15 }} 
                  />
                </Box>

                <Box>
                  <LabelLogin htmlFor='Idpassword' title='Password' />
                  <TextField
                      role="Password"
                      id='Idpassword'
                      fullWidth
                      type="password"
                      variant="filled"
                      placeholder="***************"
                      {...formik.getFieldProps('password')}
                      disabled={isLoading}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      style={{ marginBottom: '23px', borderRadius: 15 }} 
                  />
                </Box>

                <CardActions>
                  <Box className="w-full flex justify-center">
                    <Button
                      className="fixed w-[385.88px] h-[54px] flex items-center"
                      style={{backgroundColor: '#02274F', borderRadius: 9}}
                      variant="contained"
                      disabled={isLoading}
                      type="submit"
                      endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" role="progressbar" color="primary" /> : undefined}
                    >
                      Sign In
                    </Button>
                  </Box>
                </CardActions>
                <Box className="mt-1 w-full flex justify-center">
                  <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                    <Button variant="text" style={{ color: '#02274F' }}>Don't have an account? Sign up</Button>
                  </RouterLink>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
};