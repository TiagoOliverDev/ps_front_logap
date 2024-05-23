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
    
  interface ITokens {
    refresh: string;
    access: string;
  }
    
  export interface IAuthProps {
    user: IUser;
    tokens: ITokens;
  }