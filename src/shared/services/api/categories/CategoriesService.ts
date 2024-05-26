import { API } from "../axiosConfig";
import { ICategory, INewCategory } from '../../../../@types/IApiResponseCategories';


const getAll = async (): Promise<ICategory[] | Error> => {
    try {
        const urlRelative = `/categories/categorias/nomes`;

        const { data } = await API.get<[number, string][]>(urlRelative);

        if (data) {
            const formattedData: ICategory[] = data.map(item => ({
                id: item[0],
                name: item[1]
            }));
            return formattedData;
        }
        return new Error("Erro ao listar os registros de categorias");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros de categorias");
    };
};

const create = async (category: INewCategory): Promise<ICategory | Error> => {
    try {
        const { data } = await API.post<ICategory>('/categories/cadastrar', category);
        return data;
    } catch (error: any) {
        return new Error(error.response?.data.message || "Erro ao cadastrar a categoria.");
    }
};



export const CategoriesService = {
    getAll,
    create,
};