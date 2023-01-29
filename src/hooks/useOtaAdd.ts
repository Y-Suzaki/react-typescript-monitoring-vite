import { useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { OtaFormType } from '../components/organisms/ota/OtaAddForm';
import axios from 'axios';
import { OtaUpload } from '../types/api/ota';

export const useOtaAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const addOTA = async (ota: OtaFormType) => {
    setIsLoading(true);
    setIsError(false);
    console.log(ota);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const uploadUrlResponse = await axios.get<OtaUpload>(`${apiDomain}/ota`);

      const uploadResponse = await axios.put(uploadUrlResponse.data.upload_url, ota.uploadFile[0], {
        headers: {
          'Content-Type': 'application/octet-stream',
          Authorization: null,
        },
      });
      console.log(uploadResponse);
      showMessage({ title: 'Succeed to add the Ota software.', status: 'info' });
    } catch (e) {
      console.warn(e);
      setIsError(true);
      showMessage({ title: 'Failed to add the Ota software.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addOTA,
    isLoading,
    isError,
  };
};
