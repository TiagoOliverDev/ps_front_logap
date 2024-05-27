import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AlertDinamic } from '../../shared/components/alert/AlertDinamic';
import { LabelLogin } from '../../shared/components/label/LabelLogin';
import { AuthService } from '../../shared/services/api/auth/AuthService';
import { Link as RouterLink } from 'react-router-dom'; 


const registrationSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(5, 'A senha deve ter pelo menos 5 caracteres'),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password')], 'As senhas devem coincidir')
     .required('A confirmação de senha é obrigatória')
});

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      AuthService.register({ email: values.email, password: values.password })
        .then(() => {
          setIsLoading(false);
          setAlertMessage('Cadastro realizado com sucesso!');
          setAlertType('success');
          setShowAlert(true);
          setTimeout(() => {
            navigate('/login');  
          }, 3000); 
        })
        .catch((error) => {
          setIsLoading(false);
          setAlertMessage(error.message || 'Erro ao realizar cadastro.');
          setAlertType('error');
          setShowAlert(true);
        });
    },
  });

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
        {showAlert && (
            <AlertDinamic message={alertMessage} severityTipo={alertType} />
        )}
        <Box sx={{ backgroundColor: "#10141E" }} className="w-screen h-screen flex items-center justify-center">
        <Card 
            className='w-[438px] h-[600px]'  // Ajuste no tamanho para acomodar campos extras
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
            <CardContent 
                sx={{marginTop: '45px'}}
            >

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

                <Box>
                    <LabelLogin htmlFor='IdconfirmPassword' title='Confirm Password' />
                    <TextField
                    role="Confirm Password"
                    id='IdconfirmPassword'
                    fullWidth
                    type="password"
                    variant="filled"
                    placeholder="***************"
                    {...formik.getFieldProps('confirmPassword')}
                    disabled={isLoading}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                        Sign Up
                    </Button>
                    </Box>
                </CardActions>
                <Box className="mt-4 w-full flex justify-center">
                    <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="text" style={{ color: '#02274F' }}>Already have an account? Log in</Button>
                    </RouterLink>
                </Box>
                </form>
            </Box>
            </CardContent>
        </Card>
        </Box>
    </>
  );
};
