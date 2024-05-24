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
    InputLabel
} from '@mui/material';
import { INewProduct } from '../../../@types/IApiResponseProducts'; 
import { ICategory } from '../../../@types/IApiResponseCategories';
import { CategoriesService } from '../../services/api/categories/Categories';
import { SuppliersService } from '../../services/api/suppliers/SuppliersService';
import { ISupplier } from '../../../@types/ISupplier';
import { IProductFormModalProps } from '../../../@types/IProductFormModalProps'; 


const ProductsFormModal: React.FC<IProductFormModalProps> = ({ open, onClose, onSave }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [product, setProduct] = useState<INewProduct>({
        name: '',
        purchase_price: 0,
        quantity: 0,
        sale_price: 0,
        category_id: 0,
        supplier_id: 0
    });

    useEffect(() =>{
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
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any; } }) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(product);
        onClose();
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
            <DialogTitle>Cadastrar Produtos</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={product.name}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px' }}
                />
                <TextField
                    margin="dense"
                    name="purchase_price"
                    label="Preço de Compra"
                    type="number"
                    fullWidth
                    value={product.purchase_price}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    name="quantity"
                    label="Quantidade"
                    type="number"
                    fullWidth
                    value={product.quantity}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    name="sale_price"
                    label="Preço de Venda"
                    type="number"
                    fullWidth
                    value={product.sale_price}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <FormControl fullWidth sx={{ marginTop: '18px', backgroundColor: 'gray', borderRadius: '12px' }}>
                    <InputLabel sx={{ color: '#FFFFFF' }}>Categoria</InputLabel>
                    <Select
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        sx={{ color: '#FFFFFF' }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: '18px', backgroundColor: 'gray', borderRadius: '12px' }}>
                    <InputLabel sx={{ color: '#FFFFFF' }}>Fornecedor</InputLabel>
                    <Select
                        name="supplier_id"
                        value={product.supplier_id}
                        onChange={handleChange}
                        sx={{ color: '#FFFFFF' }}
                    >
                        {suppliers.map(supplier => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={handleSave} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductsFormModal;
