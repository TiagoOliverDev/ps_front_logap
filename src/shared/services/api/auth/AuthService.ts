import { IAuthProps  } from "../../../../@types/IAuthProps";
import { API } from "../axiosConfig";


const auth = async (email: string, password: string): Promise<IAuthProps | Error> => {
    try{
        const response = await API.post<IAuthProps>("/auth/login/", { email, password });
        
        if (response && response.data) {
            return response.data;
        }
            
        return new Error("Erro no login.");
    }catch(error){
        console.log(error)
        return new Error((error as { message: string }).message || "Erro no login..");
    }
}

export const AuthService = {
    auth,
};