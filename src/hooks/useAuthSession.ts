import { useAuth } from './useAuth';
import { Auth } from 'aws-amplify';
import { useCallback } from 'react';
import { getAllowedServices } from '../helper/cognitoAttribute';

export const useAuthSession = () => {
  const { setIsAuthenticated, setUsername, setIsLoading, setAllowedServices } = useAuth();
  const authSession = useCallback(async () => {
    console.log('authSession useCallback');
    try {
      setIsLoading(true);
      const result = await Auth.currentAuthenticatedUser();
      console.log(result);
      setUsername(result.username);
      setIsAuthenticated(true);
      setAllowedServices(getAllowedServices(result.attributes));
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
