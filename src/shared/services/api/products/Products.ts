import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";
import { IApiResponseProducts, IProduct, INewProduct } from '../../../../@types/IApiResponseProducts'; 


export interface IDetaisCollaborator {
    id: number;
    nome: string;
    matricula: string;
    email: string;
    senha: string;
    setor: string;
    turno: string;
};


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

export const create = async (product: INewProduct): Promise<IProduct | Error> => {
    try {
        const { data } = await API.post<IProduct>('/products/cadastrar', product);
        return data;
    } catch (error: any) {
        return new Error(error.response?.data.message || "Erro ao cadastrar o produto.");
    }
};

const getById = async (id: number): Promise<IDetaisCollaborator | Error> => {
    try {
        const urlRelative = `/collaborator/collaborator/${id}`;

        const { data } = await API.get(urlRelative);

        if (data && data.collaborator) {
            return data.collaborator[0];
        };

        return new Error("Erro ao  consultar o registro.");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetaisCollaborator): Promise<void | Error> => {
    try {
        await API.put(`/collaborator/collaborator/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/collaborator/collaborator/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const ProductsService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};