interface IUser {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    avatar: string | null;
    type: string;
    created: string;
    modified: string;
    role: string;
  }
    
  export interface IAuthProps {
    user: IUser;
  }

  export interface LoginResponse {
    access_token: string;
    token_type: string;
  }