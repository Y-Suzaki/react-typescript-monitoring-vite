import { useEffect, useState } from 'react';
import { NewsSummaries, NewsSummary } from '../types/api/news';
import axios from 'axios';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';

export const useNewsSummaries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsSummaries, setNewsSummaries] = useState<Array<NewsSummary>>([]);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const getNewsSummaries = async () => {
    setIsLoading(true);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const response = await axios.get<NewsSummaries>(`${apiDomain}/news`);
      setNewsSummaries(response.data.items);
      console.log(response.data.items);
    } catch (e) {
      console.log(e);
      showMessage({ title: 'Failed to get news list.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => getNewsSummaries())();
  }, []);

  return {
    newsSummaries,
    getNewsSummaries,
    isLoading,
  };
};
