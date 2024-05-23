import React, { useState } from 'react';
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

export const Dashboard: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string>('');

    const totalProducts = products.length;
    const totalSuppliers = suppliers.length;
    const outOfStockProducts = products.filter(product => product.quantity === 0).length;

    const topSellingProducts = products.sort((a, b) => b.sales - a.sales).slice(0, 5);

    const data = {
        labels: topSellingProducts.map(product => product.name),
        datasets: [
            {
                label: 'Quantidade Vendida',
                data: topSellingProducts.map(product => product.sales),
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

        doc.text('Relatório', 10, 10);
        if (selectedReport) {
            doc.text(`Relatório Selecionado: ${selectedReport}`, 10, 20);
        } else {
            doc.text('Nenhum relatório selecionado.', 10, 20);
        }

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
                        Gerar Relatórios PDF
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="report-select-label">Selecione o Relatório</InputLabel>
                        <Select
                            labelId="report-select-label"
                            value={selectedReport}
                            onChange={(e) => setSelectedReport(e.target.value as string)}
                        >
                            <MenuItem value="Relatório 1">Relatório 1</MenuItem>
                            <MenuItem value="Relatório 2">Relatório 2</MenuItem>
                            <MenuItem value="Relatório 3">Relatório 3</MenuItem>
                        </Select>
                    </FormControl>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
                            Gerar Relatório
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </HomeMaster>
    );
};

export default Dashboard;
