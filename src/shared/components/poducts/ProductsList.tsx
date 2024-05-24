import React, { useState, useEffect } from 'react';
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
    IconButton,
    Container
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { IColumns } from '../../../@types/IColumns';
import { IProduct } from '../../../@types/IApiResponseProducts';
import { ProductsService } from '../../services/api/products/Products';

const columns: IColumns[] = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'purchase_price', label: 'Preço de Compra', minWidth: 100, align: 'right', format: (value: number) => value.toFixed(2) },
    { id: 'quantity', label: 'Quantidade', minWidth: 100, align: 'right' },
    { id: 'sale_price', label: 'Preço de Venda', minWidth: 100, align: 'right', format: (value: number) => value.toFixed(2) },
    { id: 'category_id', label: 'Categoria ID', minWidth: 100, align: 'right' },
    { id: 'supplier_id', label: 'Fornecedor ID', minWidth: 100, align: 'right' },
    { id: 'actions', label: 'Ações', minWidth: 100, align: 'center' }
];

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await ProductsService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setProducts(result);
            }
        };

        fetchProducts();
    }, []);

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
        console.log('Cadastrar novo produto');
    };

    const totalProducts = products.length;
    const outOfStockProducts = products.filter(product => product.quantity === 0).length;

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                <Paper sx={{ padding: 2, backgroundColor: 'blue', color: '#F5F5F5', flex: 1, mr: 1 }}>
                    <Typography variant="subtitle1">Quantidade Total de Produtos</Typography>
                    <Typography variant="h6">{totalProducts}</Typography>
                </Paper>
                <Paper sx={{ padding: 2, backgroundColor: 'red', color: '#F5F5F5', flex: 1 }}>
                    <Typography variant="subtitle1">Quantidade de Produtos Sem Estoque</Typography>
                    <Typography variant="h6">{outOfStockProducts}</Typography>
                </Paper>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#000000', mt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                    <Typography variant="h6" component="div">
                        Lista de Produtos
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
                            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={product.id} sx={{ color: '#616161' }}>
                                        {columns.map((column) => {
                                            const value = product[column.id as keyof typeof product];
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ color: '#616161' }}>
                                                    {column.id === 'actions' ? (
                                                        <Box display="flex" justifyContent="center">
                                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(product.id)}>
                                                                <Edit sx={{ color: '#0069D9' }} />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product.id)}>
                                                                <Delete sx={{ color: 'red' }} />
                                                            </IconButton>
                                                        </Box>
                                                    ) : column.format && typeof value === 'number' ? (
                                                        column.format(value)
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
                    count={products.length}
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

export default ProductsList;
