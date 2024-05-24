import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Container, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { HomeMaster } from '../../shared/layouts/HomeMaster';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SubtitleItem from '../../shared/components/subtitle/SubtitleItem';
// import { ICategory } from '../../@types/IApiResponseCategories';
// import { ISupplier } from '../../@types/ISupplier';
// import { IProduct } from '../../@types/IApiResponseProducts';
import { ProductsService } from '../../shared/services/api/products/ProductsService';
import { CategoriesService } from '../../shared/services/api/categories/Categories';
import { SuppliersService } from '../../shared/services/api/suppliers/SuppliersService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const suppliers = [
    { id: 1, name: 'Fornecedor 1', email: 'fornecedor1@example.com', phone: '123456789' },
    { id: 2, name: 'Fornecedor 2', email: 'fornecedor2@example.com', phone: '987654321' },
    { id: 3, name: 'Fornecedor 3', email: 'fornecedor3@example.com', phone: '123456789' },
    { id: 4, name: 'Fornecedor 4', email: 'fornecedor4@example.com', phone: '987654321' },
    // Adicione mais fornecedores conforme necessário
];

const products = [
    { id: 1, name: 'Produto 1', category: 'Celulares', price: 1000, quantity: 10, sales: 150 },
    { id: 2, name: 'Produto 2', category: 'Notebooks', price: 2000, quantity: 20, sales: 100 },
    { id: 3, name: 'Produto 3', category: 'Bebidas', price: 50, quantity: 0, sales: 200 },
    { id: 4, name: 'Produto 4', category: 'Eletrônicos', price: 300, quantity: 30, sales: 50 },
    { id: 5, name: 'Produto 5', category: 'Roupas', price: 150, quantity: 0, sales: 75 },
    // Adicione mais produtos conforme necessário
];

export interface IProduct {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    id: number;
    category_id: number;
    supplier_id: number;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface ISupplier {
    id: number;
    name: string;
    email: string;
    phone: string;
}


export const Dashboard: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

    const totalProducts = products.length;
    const totalSuppliers = suppliers.length;
    const outOfStockProducts = products.filter(product => product.quantity === 0).length;

    const topSellingProducts = products.sort((a, b) => b.sale_price - a.sale_price).slice(0, 5);

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

    const data = {
        labels: topSellingProducts.map(product => product.name),
        datasets: [
            {
                label: 'Quantidade Vendida',
                data: topSellingProducts.map(product => product.sale_price),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleGenerateReport = () => {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text('Relatório Geral', 10, 10);
    
        // Relatório de Categorias e Quantidades de Produtos em Estoque
        doc.setFontSize(12);
        doc.text('Categorias e Quantidades de Produtos em Estoque:', 10, 30);
        categories.forEach((category, index) => {
            const totalInStock = products.filter(product => product.category_id === category.id)
                                         .reduce((sum, product) => sum + product.quantity, 0);
            doc.text(`${category.name}: ${totalInStock} itens em estoque`, 10, 40 + index * 10);
        });
    
        // Relatório de Produtos Esgotados
        doc.text('Produtos Esgotados:', 10, 60);
        const outOfStockList = products.filter(product => product.quantity === 0);
        outOfStockList.forEach((product, index) => {
            doc.text(`${product.name} - ${product.sale_price.toFixed(2)}`, 10, 70 + index * 10);
        });
    
        // Relatório de Fornecedores com Produtos Esgotados
        doc.text('Fornecedores com Produtos Esgotados:', 10, 90);
        suppliers.forEach((supplier, index) => {
            const supplierProducts = products.filter(product => product.supplier_id === supplier.id && product.quantity === 0);
            if (supplierProducts.length > 0) {
                doc.text(`${supplier.name} (${supplierProducts.length} produtos esgotados)`, 10, 100 + index * 10);
            }
        });
    
        doc.save('relatorio.pdf');
    };
    
    

    return (
        <HomeMaster title="Dashboard">
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ color: '#616161' }}>
                    <Paper sx={{ padding: 2, backgroundColor: 'blue', color: '#F5F5F5', flex: 1, mr: 1 }}>
                        <Typography variant="subtitle1">Quantidade Total de Produtos</Typography>
                        <Typography variant="h6">{totalProducts}</Typography>
                    </Paper>
                    <Paper sx={{ padding: 2, backgroundColor: 'green', color: '#F5F5F5', flex: 1, mr: 1 }}>
                        <Typography variant="subtitle1">Quantidade de Fornecedores</Typography>
                        <Typography variant="h6">{totalSuppliers}</Typography>
                    </Paper>
                    <Paper sx={{ padding: 2, backgroundColor: 'red', color: '#F5F5F5', flex: 1 }}>
                        <Typography variant="subtitle1">Quantidade de Produtos Sem Estoque</Typography>
                        <Typography variant="h6">{outOfStockProducts}</Typography>
                    </Paper>
                </Box>

                <Paper sx={{ width: '100%', padding: 2, backgroundColor: '#000000', mt: 2 }}>
                    <Typography variant="h6" component="div" sx={{ color: '#F5F5F5', mb: 2 }}>
                        Produtos Mais Vendidos
                    </Typography>
                    <Box sx={{ height: 400 }}>
                        <Bar data={data} options={options} />
                    </Box>
                </Paper>

                <Paper sx={{ width: '100%', padding: 2, backgroundColor: '#000000', mt: 2 }}>
                    <Typography variant="h6" component="div" sx={{ color: '#F5F5F5', mb: 2 }}>
                        Relatórios
                    </Typography>
                    <SubtitleItem text="Listagem das categorias juntamente com suas quantidades totais de produtos em estoque" />
                    <SubtitleItem text="Listagem dos produtos que estão faltando em estoque" />
                    <SubtitleItem text="Listagem dos fornecedores que possuem produtos faltando em estoque" />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="outlined" color="primary" onClick={handleGenerateReport}>
                            Gerar Relatório
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </HomeMaster>
    );
};

export default Dashboard;
