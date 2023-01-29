import { Auth } from 'aws-amplify';
import { useMessage } from './useMessage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { getAllowedServices } from '../helper/cognitoAttribute';

export const useAuthMethod = () => {
  const { setIsAuthenticated, setUsername, setIsLoading, setAllowedServices } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await Auth.signIn(username, password);
      console.log(result);
      setUsername(result.username);
      setIsAuthenticated(true);
      const allowedAttributes = getAllowedServices(result.attributes);
      setAllowedServices(allowedAttributes);

      const message = 'Authentication success.';
      showMessage({ title: message, status: 'info' });

      if (allowedAttributes) {
        navigate(`/home/${allowedAttributes[0]}`);
      } else {
        navigate('/home');
      }
      return { success: true, message: '' };
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      const message = 'Authentication failed.';
      showMessage({ title: message, status: 'error' });
      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUsername('');
      setIsAuthenticated(false);
      const message = 'Logout success.';
      showMessage({ title: message, status: 'info' });
      navigate('/');
      return { success: true, message: '' };
    } catch (error) {
      const message = 'Logout failed.';
      showMessage({ title: message, status: 'error' });
      return {
        success: false,
        message,
      };
    }
  };

  return {
    signIn,
    signOut,
  };
};
