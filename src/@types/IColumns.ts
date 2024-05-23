export interface IColumns {
    id: 'name' | 'purchase_price' | 'quantity' | 'sale_price' | 'category_id' | 'supplier_id' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number) => string;
}