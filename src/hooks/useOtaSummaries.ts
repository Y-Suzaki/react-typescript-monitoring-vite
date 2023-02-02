import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { OtaSummaries, OtaSummary } from '../types/api/ota';
import { useUserSettingContext } from './useUserSettingContext';
import { getApiDomain } from '../helper/viteEnv';

export const useOtaSummaries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { awsEnv } = useUserSettingContext();
  const [otaSummaries, setOtaSummaries] = useState<Array<OtaSummary>>([]);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = getApiDomain(awsEnv);

  console.log(`API Domain. ${apiDomain}`);

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
  }, [awsEnv]);

  return {
    otaSummaries,
    getOtaSummaries,
    isLoading,
  };
};
