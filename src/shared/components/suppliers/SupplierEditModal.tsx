import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';
import { IEditSupplierModalProps } from '../../../@types/IEditSupplierModalProps'; 

const SupplierEditModal: React.FC<IEditSupplierModalProps> = ({ open, onClose, onSave, supplier }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (supplier) {
            setName(supplier.name);
            setEmail(supplier.email);
            setPhone(supplier.phone);
        }
    }, [supplier]);

    const handleSave = () => {
        if (supplier) {
            onSave(supplier.id, name, email, phone);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
            <DialogTitle sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>Editar Fornecedor</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#10141E' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' } }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' } }}
                />
                <TextField
                    margin="dense"
                    label="Telefone"
                    type="tel"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' } }}
                />
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#10141E' }}>
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

export default SupplierEditModal;
