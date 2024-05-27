import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IEditProductModalProps, IProduct } from '../../../@types/IApiResponseProducts';
import { LabelGeneral } from '../label/LabelGeneral';
import { AlertDinamic } from '../alert/AlertDinamic';

const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    purchase_price: yup.number().required('Preço de compra é obrigatório').positive('Deve ser um número positivo'),
    quantity: yup.number().required('Quantidade é obrigatória').min(0, 'A quantidade deve ser pelo menos 0'),
    sale_price: yup.number().required('Preço de venda é obrigatório').positive('Deve ser um número positivo'),
    category_id: yup.number().required('Categoria é obrigatória').min(1, 'Selecione uma categoria'),
    supplier_id: yup.number().required('Fornecedor é obrigatório').min(1, 'Selecione um fornecedor')
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

const ProductEditModal: React.FC<IEditProductModalProps> = ({ open, onClose, onSave, product, categories, suppliers }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | undefined>(undefined);

    const formik = useFormik({
        initialValues: {
            id: product ? product.id : 0,
            name: product ? product.name : '',
            purchase_price: product ? product.purchase_price : 0,
            quantity: product ? product.quantity : 0,
            sale_price: product ? product.sale_price : 0,
            category_id: product ? product.category_id : 0,
            supplier_id: product ? product.supplier_id : 0,
        },
        validationSchema,
        onSubmit: (values) => {
            if (product && hasChanges(values)){
                setAlertMessage("Produto editado com sucesso!");
                setAlertSeverity("success");
                onSave(values);
                onClose();
            } else {
                setAlertMessage("Nenhuma alteração detectada nos dados!");
                setAlertSeverity("info");
            }

        },
        enableReinitialize: true
    });

    const handleSubmit = async () => {
        setAlertMessage(null);
        try {
            await validationSchema.validate(formik.values, { abortEarly: false });
            formik.handleSubmit();
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setAlertMessage("Erro ao editar produto, revise os campos!");
                setAlertSeverity("error");
            }
        }
    };

    const hasChanges = (values: IProduct) => {
        return (
            values.name !== product?.name ||
            values.purchase_price !== product?.purchase_price ||
            values.quantity !== product?.quantity ||
            values.sale_price !== product?.sale_price ||
            values.category_id !== product?.category_id ||
            values.supplier_id !== product?.supplier_id
        );
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
            <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '75vw', maxWidth: '900px', height: '52vh', backgroundColor: '#10141E', color: '#FFFFFF' } }}>
                <DialogTitle>Editar Produto</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <LabelGeneral htmlFor='idNameProduct' title='Nome' />
                                <TextField
                                    id='idNameProduct'
                                    margin="dense"
                                    name="name"
                                    type="text"
                                    fullWidth
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    sx={textFieldStyle}
                                />

                                <LabelGeneral htmlFor='idSupplier' title='Fornecedor' />
                                <FormControl fullWidth sx={{ backgroundColor: '#E8F0F3', borderRadius: '12px', marginTop: '11px' }}>
                                    <Select
                                        id='idSupplier'
                                        name="supplier_id"
                                        value={formik.values.supplier_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.supplier_id && Boolean(formik.errors.supplier_id)}
                                    >
                                        {suppliers.map(supplier => (
                                            <MenuItem key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <LabelGeneral htmlFor='idCategory' title='Categoria' />
                                <FormControl fullWidth sx={{ backgroundColor: '#E8F0F3', borderRadius: '12px', marginTop: '11px' }}>
                                    <Select
                                        id='idCategory'
                                        name="category_id"
                                        value={formik.values.category_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <LabelGeneral htmlFor='idPurchasePrice' title='Preço de Compra' />
                                <TextField
                                    id='idPurchasePrice'
                                    margin="dense"
                                    name="purchase_price"
                                    type="number"
                                    fullWidth
                                    value={formik.values.purchase_price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.purchase_price && Boolean(formik.errors.purchase_price)}
                                    helperText={formik.touched.purchase_price && formik.errors.purchase_price}
                                    sx={textFieldStyle}
                                />
    
                                <LabelGeneral htmlFor='idSalePrice' title='Preço de Venda' />
                                <TextField
                                    id='idSalePrice'
                                    margin="dense"
                                    name="sale_price"
                                    type="number"
                                    fullWidth
                                    value={formik.values.sale_price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sale_price && Boolean(formik.errors.sale_price)}
                                    helperText={formik.touched.sale_price && formik.errors.sale_price}
                                    sx={textFieldStyle}
                                />

                                <LabelGeneral htmlFor='idQtdProducts' title='Quantidade' />
                                <TextField
                                    id='idQtdProducts'
                                    margin="dense"
                                    name="quantity"
                                    type="number"
                                    fullWidth
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                    sx={textFieldStyle}
                                />

                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{marginTop: '7px'}}>
                        <Button variant='outlined' onClick={onClose} color="error">Cancelar</Button>
                        <Button variant='outlined' type="submit" onClick={handleSubmit} color="primary">Salvar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ProductEditModal;
