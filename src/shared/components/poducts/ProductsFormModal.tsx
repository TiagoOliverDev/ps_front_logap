import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';
import { INewProduct } from '../../../@types/IApiResponseProducts'; 

export interface IProductData {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    category_id: number;
    supplier_id: number;
}

export interface IProductFormModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: IProductData) => void;
}

const ProductsFormModal: React.FC<IProductFormModalProps> = ({ open, onClose, onSave }) => {
    const [product, setProduct] = useState<INewProduct>({
        name: '',
        purchase_price: 0,
        quantity: 0,
        sale_price: 0,
        category_id: 0,
        supplier_id: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'purchase_price' || name === 'quantity' || name === 'sale_price' || name === 'category_id' || name === 'supplier_id' ? Number(value) : value }));
    };

    const handleSave = () => {
        onSave(product);
        onClose();
    };

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
                <TextField
                    margin="dense"
                    name="category_id"
                    label="Categoria ID"
                    type="number"
                    fullWidth
                    value={product.category_id}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    name="supplier_id"
                    label="Fornecedor ID"
                    type="number"
                    fullWidth
                    value={product.supplier_id}
                    onChange={handleChange}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
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
