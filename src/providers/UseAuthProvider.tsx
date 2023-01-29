import { createContext, ReactNode, useState } from 'react';
import { AuthContextType } from '../types/AuthContextType';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuthProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [allowedServices, setAllowedServices] = useState<Array<string>>([]);
  const authContext: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    username,
    setUsername,
    allowedServices,
    setAllowedServices,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
