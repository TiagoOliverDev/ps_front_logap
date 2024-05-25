import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import { IConfirmationModalProps } from '../../../@types/IConfirmationModalProps';
import { AlertDinamic } from '../alert/AlertDinamic';

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ message, open, onClose, onConfirm }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | undefined>(undefined);

    const handleConfirm = () => {
        try {
            onConfirm();
            setAlertMessage('Exclusão realizada com sucesso!');
            setAlertSeverity('success');
        } catch (error) {
            setAlertMessage('Erro ao realizar exclusão.');
            setAlertSeverity('error');
        }
        onClose();
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
                <DialogTitle sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>Confirmar Exclusão</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#10141E', color: '#FFFFFF' }}>
                    {message}
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#10141E' }}>
                    <Button variant='outlined' onClick={onClose} color="error">
                        Cancelar
                    </Button>
                    <Button variant='outlined' onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationModal;
