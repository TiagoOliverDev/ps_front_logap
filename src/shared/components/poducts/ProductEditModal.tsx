import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { IEditProductModalProps, IProduct } from '../../../@types/IApiResponseProducts';


const ProductEditModal: React.FC<IEditProductModalProps> = ({ open, onClose, onSave, product, categories, suppliers }) => {
    const [formData, setFormData] = useState<IProduct>({
        id: product ? product.id : 0,
        name: product ? product.name : '',
        purchase_price: product ? product.purchase_price : 0,
        quantity: product ? product.quantity : 0,
        sale_price: product ? product.sale_price : 0,
        category_id: product ? product.category_id : 0,
        supplier_id: product ? product.supplier_id : 0,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                purchase_price: product.purchase_price,
                quantity: product.quantity,
                sale_price: product.sale_price,
                category_id: product.category_id,
                supplier_id: product.supplier_id,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any; } }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px' }}
                />
                <TextField
                    margin="dense"
                    name="purchase_price"
                    label="Preço de Compra"
                    type="number"
                    fullWidth
                    value={formData.purchase_price}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    name="quantity"
                    label="Quantidade"
                    type="number"
                    fullWidth
                    value={formData.quantity}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    name="sale_price"
                    label="Preço de Venda"
                    type="number"
                    fullWidth
                    value={formData.sale_price}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <FormControl fullWidth sx={{ marginTop: '18px', backgroundColor: 'gray', borderRadius: '12px' }}>
                    <InputLabel sx={{ color: '#FFFFFF' }}>Categoria</InputLabel>
                    <Select
                        name="category_id"
                        value={formData.category_id}
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
                        value={formData.supplier_id}
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

export default ProductEditModal;
