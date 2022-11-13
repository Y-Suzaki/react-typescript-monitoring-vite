import { useAuth } from './useAuth';
import { Auth } from 'aws-amplify';
import { useCallback } from 'react';

export const useAuthSession = () => {
  const { setIsAuthenticated, setUsername, setIsLoading } = useAuth();
  const authSession = useCallback(async () => {
    console.log('authSession useCallback');
    try {
      setIsLoading(true);
      const result = await Auth.currentAuthenticatedUser();
      console.log(result);
      setUsername(result.username);
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
      setUsername('');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    authSession,
    // isAuthenticated,
  };
};
