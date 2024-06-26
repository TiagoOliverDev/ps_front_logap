import { API } from "../axiosConfig";
import { IProduct, INewProduct, IProductUpdate } from '../../../../@types/IApiResponseProducts'; 


const getAll = async (): Promise<IProduct[] | Error> => {
    try {
        const urlRelative = `/products/produtos/listagem`;
        const { data } = await API.get<IProduct[]>(urlRelative);

        if (data) {
            return data;
        }
        return new Error("Erro ao listar os registros de produtos");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros de produtos");
    }
};

const create = async (product: INewProduct): Promise<IProduct | Error> => {
    try {
        const { data } = await API.post<IProduct>('/products/cadastrar', product);
        return data;
    } catch (error: any) {
        return new Error(error.response?.data.message || "Erro ao cadastrar o produto.");
    }
};

const updateById = async (id: number, productData: IProductUpdate): Promise<void | Error> => {
    try {
        const response = await API.put(`/products/editar/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o produto.");
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/products/delete/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

const getById = async (id: number): Promise<IProduct | Error> => {
    try {
        const urlRelative = `/products/${id}`;

        const { data } = await API.get(urlRelative);

        if (data) {
            return data;
        };

        return new Error("Erro ao  consultar o registro.");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

export const ProductsService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};