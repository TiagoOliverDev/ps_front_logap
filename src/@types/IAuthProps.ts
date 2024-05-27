interface IUser {
    id: number;
    name: string;
    email: string;
  }

  export interface INewUser {
    email: string;
    senha: string;
  }
    
  export interface IAuthProps {
    user: IUser;
  }

  export interface LoginResponse {
    access_token: string;
    token_type: string;
  }