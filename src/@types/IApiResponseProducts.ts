export interface IProduct {
    name: string;
    purchase_price: number;
    quantity: number;
    sale_price: number;
    id: number;
    category_id: number;
    supplier_id: number;
}

export interface IApiResponseProducts {
    data: IProduct[];
}
