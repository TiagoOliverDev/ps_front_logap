import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Box,
    Button,
    Container,
    IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

interface Column {
    id: 'name' | 'email' | 'phone' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Telefone', minWidth: 100, align: 'right' },
    { id: 'actions', label: 'Ações', minWidth: 100, align: 'center' }
];

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
];

const products = [
    { id: 1, name: 'Produto 1', purchase_price: 50.00, quantity: 10, sale_price: 60.00, category_id: 1, supplier_id: 2 },
    { id: 2, name: 'Produto 2', purchase_price: 40.00, quantity: 20, sale_price: 55.00, category_id: 2, supplier_id: 3 },
    { id: 3, name: 'Produto 3', purchase_price: 30.00, quantity: 15, sale_price: 45.00, category_id: 1, supplier_id: 1 },
    { id: 4, name: 'Produto 4', purchase_price: 20.00, quantity: 5, sale_price: 30.00, category_id: 3, supplier_id: 4 },
    { id: 5, name: 'Produto 5', purchase_price: 70.00, quantity: 8, sale_price: 80.00, category_id: 2, supplier_id: 3 },
    { id: 6, name: 'Produto 6', purchase_price: 10.00, quantity: 50, sale_price: 20.00, category_id: 3, supplier_id: 4 },
    { id: 7, name: 'Produto 7', purchase_price: 90.00, quantity: 3, sale_price: 110.00, category_id: 1, supplier_id: 2 },
    { id: 8, name: 'Produto 8', purchase_price: 15.00, quantity: 30, sale_price: 25.00, category_id: 2, supplier_id: 1 },
    { id: 9, name: 'Produto 9', purchase_price: 25.00, quantity: 40, sale_price: 35.00, category_id: 1, supplier_id: 3 },
    { id: 10, name: 'Produto 10', purchase_price: 35.00, quantity: 12, sale_price: 50.00, category_id: 3, supplier_id: 4 },
    { id: 11, name: 'Produto 11', purchase_price: 55.00, quantity: 7, sale_price: 65.00, category_id: 2, supplier_id: 2 },
    { id: 12, name: 'Produto 12', purchase_price: 65.00, quantity: 6, sale_price: 75.00, category_id: 1, supplier_id: 3 },
];

const totalProducts = products.length;
const totalSuppliers = suppliers.length;
const outOfStockProducts = products.filter(product => product.quantity === 0).length;


const itemsPerPage = 7;

const NestedList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (id: number) => {
        console.log('Editar:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Excluir:', id);
    };

    const handleAdd = () => {
        console.log('Cadastrar novo fornecedor');
    };

    return (
        <Container maxWidth="lg">

            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                <Paper sx={{ padding: 2, backgroundColor: 'blue', color: '#F5F5F5', flex: 1, mr: 1 }}>
                    <Typography variant="subtitle1">Quantidade Total de Fornecedores</Typography>
                    <Typography variant="h6">{totalProducts}</Typography>
                </Paper>
                <Paper sx={{ padding: 2, backgroundColor: 'green', color: '#F5F5F5', flex: 1, mr: 1 }}>
                    <Typography variant="subtitle1">Quantidade de Fornecedores ativos</Typography>
                    <Typography variant="h6">{totalSuppliers}</Typography>
                </Paper>
                <Paper sx={{ padding: 2, backgroundColor: 'red', color: '#F5F5F5', flex: 1 }}>
                    <Typography variant="subtitle1">Quantidade de Fornecedores inativos</Typography>
                    <Typography variant="h6">{outOfStockProducts}</Typography>
                </Paper>
            </Box>
        
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#000000', mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                <Typography variant="h6" component="div">
                    Lista de Fornecedores
                </Typography>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ color: '#616161', backgroundColor: '#000000' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={supplier.id} sx={{ color: '#616161' }}>
                                    {columns.map((column) => {
                                        const value = supplier[column.id as keyof typeof supplier];
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: '#616161' }}>
                                                {column.id === 'actions' ? (
                                                    <Box display="flex" justifyContent="center">
                                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(supplier.id)}>
                                                            <Edit sx={{ color: '#0069D9' }} />
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(supplier.id)}>
                                                            <Delete sx={{ color: 'red' }} />
                                                        </IconButton>
                                                    </Box>
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14, 21]}
                component="div"
                count={suppliers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: '#616161' }}
            />
        </Paper>
        </Container>
    );
};

export default NestedList;
