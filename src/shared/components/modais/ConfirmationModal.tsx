import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';

interface ConfirmationModalProps {
    message: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: '#10141E', color: '#FFFFFF' } }}>
            <DialogTitle sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>Confirmar Exclusão</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>
                {message}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#10141E' }}>
                <Button variant='outlined' onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={onConfirm} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
