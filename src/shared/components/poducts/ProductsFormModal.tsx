import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Box,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { INewProduct } from '../../../@types/IApiResponseProducts'; 
import { ICategory } from '../../../@types/IApiResponseCategories';
import { CategoriesService } from '../../services/api/categories/Categories';
import { SuppliersService } from '../../services/api/suppliers/SuppliersService';
import { ISupplier } from '../../../@types/ISupplier';
import { IProductFormModalProps } from '../../../@types/IProductFormModalProps'; 
import { AlertDinamic } from '../alert/AlertDinamic';
import { LabelGeneral } from '../label/LabelGeneral';

const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    purchase_price: yup.number().required('Preço de compra é obrigatório').positive('Deve ser um número positivo'),
    quantity: yup.number().required('Quantidade é obrigatória').min(1, 'A quantidade deve ser pelo menos 1'),
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

const ProductsFormModal: React.FC<IProductFormModalProps> = ({ open, onClose, onSave }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [showNewCategoryField, setShowNewCategoryField] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | undefined>(undefined);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false); 

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await CategoriesService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setCategories(result);
            }
        };
        
        const fetchSuppliers = async () => {
            const result = await SuppliersService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setSuppliers(result);
            }
        };

        fetchCategories();
        fetchSuppliers();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            purchase_price: 0,
            quantity: 0,
            sale_price: 0,
            category_id: 0,
            supplier_id: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setAlertMessage("Produto cadastrado com sucesso!");
            setAlertSeverity("success");
            onSave(values);
            onClose();
        }
    });

    const handleAddCategory = () => {
        console.log('Nova categoria:', newCategory);
        setShowNewCategoryField(false);
        setNewCategory('');
    };

    const handleSubmit = async () => {
        setAttemptedSubmit(true);
        setAlertMessage(null);
        try {
            await validationSchema.validate(formik.values, { abortEarly: false });
            formik.handleSubmit();
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setAlertMessage("Erro ao cadastrar produto, revise os campos!");
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

    const showError = (field: keyof typeof formik.values) => {
        return attemptedSubmit && formik.touched[field] && Boolean(formik.errors[field]);
    };

    return (
        <>
            {alertMessage && <AlertDinamic message={alertMessage} severityTipo={alertSeverity} />}
            <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '80vw', maxWidth: '1000px', height: '57vh', backgroundColor: '#10141E', color: '#FFFFFF' } }}>
                <DialogTitle>Cadastrar Produtos</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box mb={2}>
                                    <LabelGeneral htmlFor='idNameProduct' title='Nome' />
                                    <TextField
                                        id='idNameProduct'
                                        autoFocus
                                        margin="dense"
                                        name="name"
                                        type="text"
                                        fullWidth
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={showError('name')}
                                        helperText={showError('name') ? formik.errors.name : ''}
                                        FormHelperTextProps={{ sx: { margin: 0, height: (formik.touched.name && formik.errors.name) ? 'auto' : 0, visibility: (formik.touched.name && formik.errors.name) ? 'visible' : 'hidden' } }}
                                        sx={textFieldStyle}
                                    />
                                </Box>
                                
                                <Box mb={2}>
                                <LabelGeneral htmlFor='idSupplier' title='Fornecedor' />
                                    <FormControl fullWidth sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', marginTop: '8px'  }}>
                                        <Select
                                            id='idSupplier'
                                            name="supplier_id"
                                            value={formik.values.supplier_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.supplier_id && Boolean(formik.errors.supplier_id)}
                                        >
                                            {suppliers.map(supplier => (
                                                <MenuItem key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mb={2}>
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
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Box textAlign='center'>
                                            <Typography variant="body2" sx={{ color: 'black', cursor: 'pointer' }} onClick={() => setShowNewCategoryField(!showNewCategoryField)}>
                                                {showNewCategoryField ? 'Cancelar' : 'Não encontrou a categoria desejada?'}
                                            </Typography>
                                        </Box>
                                        {showNewCategoryField && (
                                            <Box mt={1} display="flex">
                                                <TextField
                                                    label="Nova Categoria"
                                                    type="text"
                                                    fullWidth
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    sx={textFieldStyle}
                                                />
                                                <Button onClick={handleAddCategory} variant="contained" sx={{ marginLeft: 1 }}>
                                                    Adicionar
                                                </Button>
                                            </Box>
                                        )}
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box mb={2}>
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
                                        helperText={formik.touched.sale_price && formik.errors.sale_price ? formik.errors.sale_price : ' '}
                                        FormHelperTextProps={{ sx: { margin: 0, height: (formik.touched.sale_price && formik.errors.sale_price) ? 'auto' : 0, visibility: (formik.touched.sale_price && formik.errors.sale_price) ? 'visible' : 'hidden' } }}
                                        sx={textFieldStyle}
                                    />
                                </Box>
                                <Box mb={2}>
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
                                        helperText={formik.touched.purchase_price && formik.errors.purchase_price ? formik.errors.purchase_price : ' '}
                                        FormHelperTextProps={{ sx: { margin: 0, height: (formik.touched.purchase_price && formik.errors.purchase_price) ? 'auto' : 0, visibility: (formik.touched.purchase_price && formik.errors.purchase_price) ? 'visible' : 'hidden' } }}
                                        sx={textFieldStyle}
                                    />
                                </Box>
                                <Box mb={2}>
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
                                        helperText={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ' '}
                                        FormHelperTextProps={{ sx: { margin: 0, height: (formik.touched.quantity && formik.errors.quantity) ? 'auto' : 0, visibility: (formik.touched.quantity && formik.errors.quantity) ? 'visible' : 'hidden' } }}
                                        sx={textFieldStyle}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={onClose} color="error">
                            Cancelar
                        </Button>
                        <Button variant='outlined' type="button" onClick={handleSubmit} color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ProductsFormModal;
