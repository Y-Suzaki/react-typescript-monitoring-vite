import { useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { NewsRequest } from '../types/api/news';
import { RegFormSchema } from '../components/organisms/news/NewsAddForm';
import axios from 'axios';

export const useNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const addNews = async (news: RegFormSchema) => {
    setIsLoading(true);
    setIsError(false);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const response = await axios.post(`${apiDomain}/news`, news);
      console.log(response);
      showMessage({ title: 'Succeed to add news.', status: 'info' });
    } catch (e) {
      console.warn(e);
      setIsError(true);
      showMessage({ title: 'Failed to add news.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNews,
    isLoading,
    isError,
  };
};
