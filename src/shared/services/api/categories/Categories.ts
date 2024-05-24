import { API } from "../axiosConfig";
import { ICategory } from '../../../../@types/IApiResponseCategories';


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


export const CategoriesService = {
    getAll,
};