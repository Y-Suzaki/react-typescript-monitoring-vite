import { useState } from 'react';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';
import { DeviceFormType } from '../components/organisms/device/DeviceAddForm';
import axios from 'axios';

export const useDeviceAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const addDevice = async (device: DeviceFormType) => {
    setIsLoading(true);
    setIsError(false);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      // const response = await axios.post(`${apiDomain}/news`, news);
      const response = { message: `Mock.${device.imei}` };
      console.log(response);
      showMessage({ title: 'Succeed to add device.', status: 'info' });
    } catch (e) {
      console.warn(e);
      setIsError(true);
      showMessage({ title: 'Failed to add device.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addDevice,
    isLoading,
    isError,
  };
};
