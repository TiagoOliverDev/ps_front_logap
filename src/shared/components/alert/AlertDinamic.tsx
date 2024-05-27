import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { IAlert } from '../../../@types/IAlert';

export const AlertDinamic: React.FC<IAlert> = ({ message, severityTipo }) => {
    return (
        <Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={severityTipo} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
