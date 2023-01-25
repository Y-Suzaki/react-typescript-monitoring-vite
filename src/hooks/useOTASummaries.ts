import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { OTASummaries } from '../types/api/ota';

export const useOTASummaries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [OTASummaries, setOTASummaries] = useState<OTASummaries>({ items: [] });
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const getOTASummaries = async () => {
    setIsLoading(true);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const response = await axios.get<OTASummaries>(`${apiDomain}/ota/updates`);
      setOTASummaries(response.data);
      console.log(response.data);
    } catch (e) {
      console.warn(e);
      showMessage({ title: 'Failed to get OTA update list.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => getOTASummaries())();
  }, []);

  return {
    OTASummaries,
    getOTASummaries,
    isLoading,
  };
};
