import React, { useState } from 'react';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';

const SupplierForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        // Lógica para salvar os dados do fornecedor
        console.log({ name, email, phone });
    };

    return (
        <Paper sx={{ padding: 2, borderRadius: 2, maxWidth: 400, backgroundColor: '#000000' }}>
            <Typography variant="h6" component="div" gutterBottom style={{color: "#616161"}}>
                Cadastro de Fornecedor
            </Typography>
            <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ backgroundColor: '#616161', borderRadius: '10px'}}
            />
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#616161', borderRadius: '10px'}}
            />
            <TextField
                fullWidth
                label="Telefone"
                variant="outlined"
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ backgroundColor: '#616161', borderRadius: '10px'}}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginTop: 2, backgroundColor: "#0069D9" }}
            >
                Cadastrar
            </Button>
        </Paper>
    );
};

export default SupplierForm;
