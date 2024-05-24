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
import { INewProduct, IProduct } from '../../../@types/IApiResponseProducts';
import { ProductsService } from '../../services/api/products/ProductsService';
import ProductsFormModal from './ProductsFormModal';
import ProductEditModal from './ProductEditModal';
import { ICategory } from '../../../@types/IApiResponseCategories';
import { ISupplier } from '../../../@types/ISupplier';
import { CategoriesService } from '../../services/api/categories/Categories';
import ConfirmationModal from '../modais/ConfirmationModal';
import { SuppliersService } from '../../services/api/suppliers/SuppliersService';


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
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);


    useEffect(() => {
        const fetchProducts = async () => {
            const result = await ProductsService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setProducts(result);
            }
        };

        const fetchCategories = async () => {
            const result = await CategoriesService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setCategories(result);
            }
        };

        const fetchSuppliers = async () => {
            const result = await SuppliersService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setSuppliers(result);
            }
        };

        fetchProducts();
        fetchCategories();
        fetchSuppliers();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (id: number) => {
        const product = products.find(p => p.id === id);
        setSelectedProduct(product || null);
        setOpenConfirmModal(true);
    };

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleSave = async (newProduct: INewProduct) => {
        const result = await ProductsService.create(newProduct);
        if (result instanceof Error) {
            console.error(result.message); 
        } else {
            setProducts(prevProducts => [...prevProducts, result]);
            setOpenModal(false); 
        }
    };

    const handleEdit = (id: number) => {
        const product = products.find(p => p.id === id);
        setSelectedProduct(product || null);
        setOpenEditModal(true);
    };

    const handleUpdate = async (productData: IProduct) => {
        const result = await ProductsService.updateById(productData.id, productData);
        if (result instanceof Error) {
            console.error(result.message);
        } else {
            setProducts(prev => prev.map(p => p.id === productData.id ? { ...productData } : p));
            setOpenEditModal(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedProduct) {
            const result = await ProductsService.deleteById(selectedProduct.id);
            if (result instanceof Error) {
                setError(result.message);
                console.log('Erro ao excluir:', result.message);
            } else {
                console.log('Produto excluído com sucesso!');
                setProducts(prevProducts => prevProducts.filter(s => s.id !== selectedProduct.id))
            }
            setOpenConfirmModal(false);
        }
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
                    <Button variant="outlined" color="primary" startIcon={<Add />} onClick={handleAdd}>
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
            <ProductsFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
            />
            <ProductEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSave={handleUpdate}
                product={selectedProduct}
                categories={categories}
                suppliers={suppliers}
            />
            <ConfirmationModal
                message="Deseja excluir o produto ?"
                open={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default ProductsList;
