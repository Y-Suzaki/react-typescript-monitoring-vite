import { Auth } from 'aws-amplify';
import { useMessage } from './useMessage';

export const useIdToken = () => {
  const { showMessage } = useMessage();

  const getIdToken = async () => {
    return Auth.currentSession()
      .then((res) => {
        return res.getIdToken().getJwtToken();
      })
      .catch((e) => {
        console.log(e);
        showMessage({ title: 'Cannot get id token.', status: 'error' });
        throw e;
      });
  };

  return {
    getIdToken,
  };
};
