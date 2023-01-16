import { useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { DeviceDetail } from '../types/api/device';
import axios from 'axios';

export const useDeviceDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deviceDetail, setDeviceDetail] = useState<DeviceDetail | null>(null);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const getDeviceDetail = async (imei: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      // const response = await axios.post(`${apiDomain}/news`, news);
      const data = { imei: '12345678901234', serialNo: 'serial-000111' };
      console.log(data);
      setDeviceDetail(data);
    } catch (e) {
      console.warn(e);
      setIsError(true);
      showMessage({ title: 'Failed to get device detail.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getDeviceDetail,
    isLoading,
    isError,
    deviceDetail,
  };
};
