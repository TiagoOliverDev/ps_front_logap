export interface IColumns {
    id: 'name' | 'purchase_price' | 'quantity' | 'sale_price' | 'category' | 'supplier' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number) => string;
}