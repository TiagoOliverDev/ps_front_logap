import { ICategory } from "./IApiResponseCategories";
import { ISupplier } from "./ISupplier";

export interface IProduct {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    id: number;
    category_id: number;
    supplier_id: number;
}

export interface INewProduct {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    category_id: number;
    supplier_id: number;
}


export interface IProductUpdate {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    category_id: number;
    supplier_id: number;
}


export interface IApiResponseProducts {
    data: IProduct[];
}

export interface IEditProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: IProduct) => void;
    product: IProduct | null;
    categories: ICategory[];
    suppliers: ISupplier[];
}

