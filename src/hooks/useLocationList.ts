import { useState } from 'react';
import { Location } from '../types/api/location';
import axios from 'axios';
import { useMessage } from './useMessage';
import { useIdToken } from './useIdToken';

export const useLocationList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationList, setLocationList] = useState<Array<Location>>([]);
  const { showMessage } = useMessage();
  const { getIdToken } = useIdToken();
  const apiDomain = import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN;

  const getLocationList = async (imei: string, day: string) => {
    const start = `${day}T00:00:00Z`;
    const end = `${day}T23:59:59`;
    setIsLoading(true);

    try {
      axios.defaults.headers.common['Authorization'] = await getIdToken();
      const response = await axios.get<Array<Location>>(`${apiDomain}/locations`);
      const data: Array<Location> = response.data.map((location) => ({
        date_time: location.date_time,
        lat: location.lat,
        lng: location.lng,
        device_mode: location.device_mode,
      }));
      console.log(data);
      setLocationList(data);
    } catch (e) {
      console.log(e);
      showMessage({ title: 'Failed to get location list.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getLocationList,
    locationList,
    isLoading,
  };
};
