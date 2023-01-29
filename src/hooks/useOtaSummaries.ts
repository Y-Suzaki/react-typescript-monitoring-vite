import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { OtaSummaries, OtaSummary } from '../types/api/ota';

export const useOtaSummaries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otaSummaries, setOtaSummaries] = useState<Array<OtaSummary>>([]);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const getOtaSummaries = async () => {
    setIsLoading(true);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const response = await axios.get<OtaSummaries>(`${apiDomain}/ota/updates`);
      setOtaSummaries(response.data.items);
      console.log(response.data.items);
    } catch (e) {
      console.warn(e);
      showMessage({ title: 'Failed to get Ota update list.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => getOtaSummaries())();
  }, []);

  return {
    otaSummaries,
    getOtaSummaries,
    isLoading,
  };
};
