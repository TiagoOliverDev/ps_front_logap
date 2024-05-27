import { LoginResponse  } from "../../../../@types/IAuthProps";
import { API } from "../axiosConfig";

interface INewUser {
    id: number;
    email: string;
  }
  
  interface IUserRegistration {
    email: string;
    password: string;
  }

const auth = async (email: string, password: string): Promise<LoginResponse | Error> => {
    try{
        const response = await API.post<LoginResponse>("/auth/login/", { email, password });
        
        if (response && response.data) {
            return response.data;
        }
            
        return new Error("Erro no login.");
    }catch(error){
        console.log(error)
        return new Error((error as { message: string }).message || "Erro no login..");
    }
}


const register = async (dados: IUserRegistration): Promise<INewUser | Error> => {
    try {
      const response = await API.post<INewUser>('/auth/register', dados);
  
      return response.data;
    } catch (error) {
      console.error(error);

      return new Error("Erro desconhecido durante o registro.");
    }
  };

export const AuthService = {
    auth,
    register,
};