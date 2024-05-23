export interface IColumnsSuppliers {
    id: 'name' | 'email' | 'phone' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number) => string;
}