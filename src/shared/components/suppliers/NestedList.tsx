import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Box,
    Paper,
    Pagination,
    Button
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';



const suppliers = [
    { id: 1, name: 'Fornecedor 1', email: 'fornecedor1@example.com', phone: '123456789' },
    { id: 2, name: 'Fornecedor 2', email: 'fornecedor2@example.com', phone: '987654321' },
    { id: 3, name: 'Fornecedor 3', email: 'fornecedor3@example.com', phone: '123456789' },
    { id: 4, name: 'Fornecedor 4', email: 'fornecedor4@example.com', phone: '987654321' },
    { id: 5, name: 'Fornecedor 5', email: 'fornecedor5@example.com', phone: '123456789' },
    { id: 6, name: 'Fornecedor 6', email: 'fornecedor6@example.com', phone: '987654321' },
    { id: 7, name: 'Fornecedor 7', email: 'fornecedor7@example.com', phone: '123456789' },
    { id: 8, name: 'Fornecedor 8', email: 'fornecedor8@example.com', phone: '987654321' },
    { id: 9, name: 'Fornecedor 9', email: 'fornecedor9@example.com', phone: '123456789' },
    { id: 10, name: 'Fornecedor 10', email: 'fornecedor10@example.com', phone: '987654321' },
    { id: 11, name: 'Fornecedor 11', email: 'fornecedor11@example.com', phone: '123456789' },
    { id: 12, name: 'Fornecedor 12', email: 'fornecedor12@example.com', phone: '987654321' },
    // Adicione mais fornecedores conforme necessário
];

const itemsPerPage = 7;

const NestedList: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const [page, setPage] = useState(1);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const handleViewMore = (id: number) => {
        console.log('Ver mais:', id);
    };

    const handleEdit = (id: number) => {
        console.log('Editar:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Excluir:', id);
    };

    const paginatedSuppliers = suppliers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Paper sx={{ padding: 2, borderRadius: 2, width: '100%', maxWidth: 530, backgroundColor: '#000000' }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ color: '#616161' }}>
            Lista de Fornecedores
        </Typography>
        <List>
            {paginatedSuppliers.map((supplier) => (
                <ListItem key={supplier.id} sx={{ borderBottom: '1px solid #616161' }}>
                    <ListItemText
                        primary={supplier.name}
                        secondary={`Email: ${supplier.email} | Telefone: ${supplier.phone}`}
                        sx={{ color: '#616161', '& .MuiListItemText-secondary': { color: '#616161' } }}
                    />
                    <ListItemSecondaryAction>
                        {/* <IconButton edge="end" aria-label="view" onClick={() => handleViewMore(supplier.id)}>
                            <Visibility sx={{ color: '#616161' }} />
                        </IconButton> */}
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(supplier.id)}>
                            <Edit sx={{ color: '#0069D9' }} />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(supplier.id)}>
                            <Delete sx={{ color: 'red' }} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
        <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
                count={Math.ceil(suppliers.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#616161'
                    }
                }}
            />
        </Box>
    </Paper>
);
};

export default NestedList;
