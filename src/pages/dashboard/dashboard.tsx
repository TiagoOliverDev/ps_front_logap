import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Container, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
// import { autoTable } from 'jspdf-autotable'; 
import 'jspdf-autotable';
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
import SubtitleItem from '../../shared/components/subtitle/SubtitleItem';
import { ICategory } from '../../@types/IApiResponseCategories';
import { ISupplier } from '../../@types/ISupplier';
import { IProduct } from '../../@types/IApiResponseProducts';
import { ProductsService } from '../../shared/services/api/products/ProductsService';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';
import { SuppliersService } from '../../shared/services/api/suppliers/SuppliersService';
import { ReportsService } from '../../shared/services/api/reports/ReportsService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard: React.FC = () => {
    // const [selectedReport, setSelectedReport] = useState<string>('');
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
                // label: 'Quantidade Vendida',
                label: 'Preço',
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
        ReportsService.generateReport(categories, products, suppliers);
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
                        {/* Produtos Mais Vendidos */}
                        Produtos com maiores preços 
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
