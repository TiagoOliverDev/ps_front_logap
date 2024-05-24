import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ICategory } from '../../../../@types/IApiResponseCategories';
import { ISupplier } from '../../../../@types/ISupplier';
import { IProduct } from '../../../../@types/IApiResponseProducts';

 const generateReport = async(categories: ICategory[], products: IProduct[], suppliers: ISupplier[]) => {
        const doc = new jsPDF();

        // Título do relatório
        doc.setFontSize(18);
        doc.text('Relatório Geral', 10, 10);

        // Relatório de Categorias e Produtos
        doc.setFontSize(14);
        doc.text('Listagem das Categorias e Quantidades de Produtos em Estoque', 10, 20);

        // Tabela de categorias e produtos em estoque
        const categoryRows = categories.map((category) => {
            const totalInStock = products.filter(product => product.category_id === category.id && product.quantity > 0)
                .reduce((acc, product) => acc + product.quantity, 0);
            return [category.name, totalInStock];
        });
        doc.autoTable({
            head: [['Categoria', 'Quantidade em Estoque']],
            body: categoryRows,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 12 }
        });

        // Relatório de Produtos sem Estoque
        doc.setFontSize(14);
        const outOfStockStartY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Produtos Esgotados', 10, outOfStockStartY);

        // Tabela de produtos sem estoque
        const outOfStockRows = products.filter(product => product.quantity === 0)
            .map(product => [product.name, `R$${product.sale_price.toFixed(2)}`]);
        doc.autoTable({
            head: [['Produto', 'Preço']],
            body: outOfStockRows,
            startY: outOfStockStartY + 10,
            theme: 'grid',
            styles: { fontSize: 12 }
        });

        // Relatório de Fornecedores com Produtos Esgotados
        doc.setFontSize(14);
        const suppliersStartY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Fornecedores com Produtos Esgotados', 10, suppliersStartY);

        // Tabela de fornecedores com produtos esgotados
        const suppliersRows = suppliers.filter(supplier => 
            products.some(product => product.supplier_id === supplier.id && product.quantity === 0)
        ).map(supplier => [supplier.name, supplier.email]);
        doc.autoTable({
            head: [['Fornecedor', 'Email']],
            body: suppliersRows,
            startY: suppliersStartY + 10,
            theme: 'grid',
            styles: { fontSize: 12 }
        });

        doc.save('relatorios_gerais.pdf');
    }

export const ReportsService = {
    generateReport,
};