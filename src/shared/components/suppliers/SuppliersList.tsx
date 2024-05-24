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
    Container,
    IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { IColumnsSuppliers } from '../../../@types/IColumnsSuppliers'; 
import { ISupplier, INewSupplier  } from '../../../@types/ISupplier';
import { SuppliersService } from '../../services/api/suppliers/SuppliersService';
import SupplierFormModal from './SupplierFormModal';
import ConfirmationModal from '../modais/ConfirmationModal';
import SupplierEditModal from './SupplierEditModal';

const columns: IColumnsSuppliers[] = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Telefone', minWidth: 100, align: 'right' },
    { id: 'actions', label: 'Ações', minWidth: 100, align: 'center' }
];

const itemsPerPage = 7;

const SuppliersList: React.FC = () => {
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const result = await SuppliersService.getAll();
            if (result instanceof Error) {
                setError(result.message);
            } else {
                setSuppliers(result);
            }
        };

        fetchSuppliers();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (id: number) => {
        const supplier = suppliers.find(s => s.id === id);
        setSelectedSupplier(supplier || null);
        setOpenEditModal(true);
    };

    const handleUpdate = async (id: number, name: string, email: string, phone: string) => {
        const updatedSupplier: Omit<ISupplier, 'id'> = { name, email, phone };
        const result = await SuppliersService.update(id, updatedSupplier);
        if (result instanceof Error) {
            setError(result.message);
            console.log('erro: ', result.message)
        } else {
            setSuppliers((prevSuppliers) => prevSuppliers.map(supplier => 
                supplier.id === id ? { ...supplier, name, email, phone } : supplier
            ));
        }
        setOpenEditModal(false);
    };

    const handleDelete = (id: number) => {
        const supplier = suppliers.find(s => s.id === id);
        setSelectedSupplier(supplier || null);
        setOpenConfirmModal(true);
    };
    
    const handleConfirmDelete = async () => {
        if (selectedSupplier) {
            const result = await SuppliersService.deleteById(selectedSupplier.id);
            if (result instanceof Error) {
                setError(result.message);
                console.log('Erro ao excluir:', result.message);
            } else {
                console.log('Fornecedor excluído com sucesso!');
                setSuppliers(prevSuppliers => prevSuppliers.filter(s => s.id !== selectedSupplier.id));
            }
            setOpenConfirmModal(false);
        }
    };

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleSave = async (name: string, email: string, phone: string) => {
        const newSupplier: INewSupplier = { name, email, phone };
        const result = await SuppliersService.create(newSupplier);
        if (result instanceof Error) {
            setError(result.message);
        } else {
            const newSupplierWithId = { id: result as number, name, email, phone };
            setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplierWithId]);
        }
        setOpenAddModal(false);
    };

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                <Paper sx={{ padding: 2, backgroundColor: 'blue', color: '#F5F5F5', flex: 1, mr: 1 }}>
                    <Typography variant="subtitle1">Quantidade Total de Fornecedores</Typography>
                    <Typography variant="h6">{suppliers.length}</Typography>
                </Paper>
                <Paper sx={{ padding: 2, backgroundColor: 'green', color: '#F5F5F5', flex: 1, mr: 1 }}>
                    <Typography variant="subtitle1">Quantidade de Fornecedores ativos</Typography>
                    <Typography variant="h6">100</Typography>
                </Paper>
                <Paper sx={{ padding: 2, backgroundColor: 'red', color: '#F5F5F5', flex: 1 }}>
                    <Typography variant="subtitle1">Quantidade de Fornecedores inativos</Typography>
                    <Typography variant="h6">100</Typography>
                </Paper>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#000000', mt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                    <Typography variant="h6" component="div">
                        Lista de Fornecedores
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
                            {suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier) => (
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
                            ))}
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
            <SupplierFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
            />
            <SupplierEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSave={handleUpdate}
                supplier={selectedSupplier}
            />
            <ConfirmationModal
                message="Deseja excluir o fornecedor ?"
                open={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default SuppliersList;
