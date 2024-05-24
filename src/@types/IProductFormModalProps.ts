export interface IProductData {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    category_id: number;
    supplier_id: number;
}

export interface IProductFormModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: IProductData) => void;
}