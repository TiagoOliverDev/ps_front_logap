export interface IAuthContextData {
    isAuthenticated: boolean;
    id_user: number | undefined;
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void; 
}