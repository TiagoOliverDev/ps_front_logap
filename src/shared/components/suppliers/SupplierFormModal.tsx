import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';

interface SupplierFormModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string, email: string, phone: string) => void;
}

const SupplierFormModal: React.FC<SupplierFormModalProps> = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        onSave(name, email, phone);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
            <DialogTitle>Cadastrar Fornecedor</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px'}}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ input: { color: '#FFFFFF' }, label: { color: '#FFFFFF' }, backgroundColor: 'gray', borderRadius: '12px', marginTop: '18px' }}
                />
                <TextField
                    margin="dense"
                    label="Telefone"
                    type="tel"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

export default SupplierFormModal;
