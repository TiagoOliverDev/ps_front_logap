import { API } from "../axiosConfig";

interface IPoint {
    id: number | undefined | null | '';
    id_usuario: number | undefined;
    id_tipo_ponto: number;
    nome: string | undefined;
    tipoPonto: string | undefined;
    dataHora: string;
}
  
export interface IDetaisPoint{
    id: number;
    id_usuario: number | undefined;
    id_tipo_ponto: number;
};

type TPointComTotalCount = {
    data: IPoint[];
    totalCount: number;
};

const getHistoryById = async (userId: any): Promise<TPointComTotalCount | Error> => {
    try {
        const urlRelative = `/reports/all_points__history_from_user/${userId}`;
        const { data } = await API.get(urlRelative);

        if (data && data['points history'] && data['points history'][0]) {
            const flattenedPoints = data['points history'][0].flat().filter((point: IPoint | null) => point !== null);
            return {
                data: flattenedPoints,
                totalCount: flattenedPoints.length,
            };
        }
        return new Error("Erro ao listar os registros.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    }
};

export const ReportsService = {
    getHistoryById,
};