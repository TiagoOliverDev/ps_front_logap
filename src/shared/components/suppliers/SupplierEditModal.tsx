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
import { IEditSupplierModalProps } from '../../../@types/IEditSupplierModalProps';
import { AlertDinamic } from '../alert/AlertDinamic';
import { LabelGeneral } from '../label/LabelGeneral';


const supplierSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: yup.number().required('Telefone é obrigatório')
});

const textFieldStyle = {
    '& .MuiInputBase-root': {
        borderRadius: '12px',
        backgroundColor: '#E8F0F3'
    },
    '& .MuiInputLabel-root': {
        color: 'black'
    }
};

const SupplierEditModal: React.FC<IEditSupplierModalProps> = ({ open, onClose, onSave, supplier }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | undefined>(undefined);

    const formik = useFormik({
        initialValues: {
            name: supplier ? supplier.name : '',
            email: supplier ? supplier.email : '',
            phone: supplier ? supplier.phone : ''
        },
        validationSchema: supplierSchema,
        enableReinitialize: true, 
        onSubmit: (values) => {
            if (supplier && hasChanges(values)) {
                onSave(supplier.id, values.name, values.email, values.phone);
                setAlertMessage("Fornecedor atualizado com sucesso!");
                setAlertSeverity("success");
                onClose();
            } else {
                setAlertMessage("Nenhuma alteração detectada nos dados!");
                setAlertSeverity("info");
            }
        }
    });

    
    const hasChanges = (values: { name: string; email: string; phone: string; }) => {
        return values.name !== supplier?.name || values.email !== supplier?.email || values.phone !== supplier?.phone;
    };

    const handleSubmit = async () => {
        setAlertMessage(null);  

        try {
            await supplierSchema.validate(formik.values, { abortEarly: false });
            formik.handleSubmit();
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // const validationErrors = err.inner.map(e => e.message).join('\n');
                setAlertMessage("Erro ao editar fornecedor, revise os campos mano!");
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
            <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '75vw', maxWidth: '600px', height: '50vh', backgroundColor: '#10141E', color: '#FFFFFF' } }}>
                <DialogTitle sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>Editar Fornecedor</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#10141E' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <LabelGeneral htmlFor='idName' title='Nome' />
                        <TextField
                            id='idName'
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('name', true)}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={textFieldStyle}
                        />
                        <LabelGeneral htmlFor='idEmail' title='Email' />
                        <TextField
                            id='idEmail'
                            margin="dense"
                            type="email"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('email', true)}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={textFieldStyle}
                        />
                        <LabelGeneral htmlFor='idPhone' title='Telefone' />
                        <TextField
                            id='idPhone'
                            margin="dense"
                            type="tel"
                            fullWidth
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('phone', true)}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            sx={textFieldStyle}
                        />
                        <DialogActions sx={{ backgroundColor: '#10141E', marginTop: '9px' }}>
                            <Button variant='outlined' onClick={onClose} color="error">
                                Cancelar
                            </Button>
                            <Button variant='outlined' onClick={handleSubmit} color="primary">
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SupplierEditModal;
