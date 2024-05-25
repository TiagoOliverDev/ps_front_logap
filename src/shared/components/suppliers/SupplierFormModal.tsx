import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ISupplierFormModalProps } from '../../../@types/ISupplier';
import { AlertDinamic } from '../alert/AlertDinamic';


const supplierSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: yup.number().required('Telefone é obrigatório')
});

const SupplierFormModal: React.FC<ISupplierFormModalProps> = ({ open, onClose, onSave }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | undefined>(undefined);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: supplierSchema,
        onSubmit: (values) => {
            onSave(values.name, values.email, values.phone);
            setAlertMessage("Fornecedor cadastrado com sucesso!");
            setAlertSeverity("success");
            onClose();
        }
    });

    const handleSubmit = async () => {
        setAlertMessage(null);  

        try {
            await supplierSchema.validate(formik.values, { abortEarly: false });
            formik.handleSubmit();
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const validationErrors = err.inner.map(e => e.message).join('\n');
                setAlertMessage(validationErrors);
                setAlertSeverity("error");
            }
        }
    };

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
      }, [alertMessage]);
    
    return (
        <>
            {alertMessage && <AlertDinamic message={alertMessage} severityTipo={alertSeverity} />}
            <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
                <DialogTitle>Cadastrar Fornecedor</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome"
                            type="text"
                            fullWidth
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{label: { color: 'black' }, backgroundColor: '#E8F0F3', borderRadius: '12px' }}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{label: { color: 'black' }, backgroundColor: '#E8F0F3', borderRadius: '12px', marginTop: '18px' }}
                        />
                        
                        <TextField
                            margin="dense"
                            label="Telefone"
                            type="tel"
                            fullWidth
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            sx={{ label: { color: 'black' }, backgroundColor: '#E8F0F3', borderRadius: '12px', marginTop: '18px' }}
                        />
                        <DialogActions>
                            <Button variant='outlined' onClick={onClose} color="error">
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={handleSubmit}
                                color="primary"
                            >
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SupplierFormModal;
