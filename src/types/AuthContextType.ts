import { AuthResult } from './authResult';
import { Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;

  // signUp: (username: string, password: string) => Promise<AuthResult>;
  // confirmSignUp: (verificationCode: string) => Promise<AuthResult>;
  // signIn: (username: string, password: string) => Promise<AuthResult>;
  // signOut: () => void;
  // isCurrentAuthenticatedUser: () => void;
};
