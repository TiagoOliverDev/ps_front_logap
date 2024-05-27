import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { AuthService } from "../services/api/auth/AuthService";
import { IAuthContextData } from "../../@types/IAuthContextData";
import { IAuthProvideProps } from "../../@types/IAuthProvideProps";


export const AuthContext = createContext({} as IAuthContextData ) // injetando as props de IAuthContextData no context

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
const LOCAL_STORAGE_KEY_USER_ID = 'APP_USER_ID';


export const AuthProvider: React.FC<IAuthProvideProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>()
    const [userId, setUserId] = useState<number | undefined>();

    useEffect(() => {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const storedUserId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
    
        if (storedToken) {
            setAccessToken(storedToken); 
        } else {
            setAccessToken(undefined);
        }

        if (storedUserId) {
            setUserId(Number(storedUserId));
        }

    })

    const handleLogin = useCallback(async (email: string, password: string) => {
        
        try {
            const result = await AuthService.auth(email, password);
            
            if (result instanceof Error) {
                console.error("Erro no login:", result.message);
                return result.message;
            }

            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, result.access_token);
            // localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, String(result.user.id));
            
            setAccessToken(result.access_token);
            // setUserId(result.user.id);
            
            return 'Login successful'; 
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro durante a autenticação:', error);
                return error.message;
            } else {
                console.error('Erro desconhecido durante a autenticação:', error);
                return 'An unknown error occurred';
            }
        }
    
    }, []);

    const handleLogout = useCallback(() => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
            // localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
            setAccessToken(undefined);
            // setUserId(undefined);

            return 'Logout successful';
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro durante o logout:', error);
                return error.message;
            } else {
                console.error('Erro desconhecido durante o logout:', error);
                return 'An unknown error occurred during logout';
            }
        }
    }, []);
    
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

    return (
        // Funções passadas em contexto obrigatoriamente tem que usar o useCallback para não prejudicar o desempenho
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, id_user: userId }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);