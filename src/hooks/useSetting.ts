import { useState } from 'react';
import { Setting } from '../types/api/setting';
import axios from 'axios';
import { useMessage } from './useMessage';

export const useSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setting, setSetting] = useState<Setting | null>(null);
  const { showMessage } = useMessage();

  const apiDomain = process.env.REACT_APP_BACKOFFICE_API_DOMAIN;

  const getSetting = (imei: string) => {
    setIsLoading(true);

    const data: Setting = {
      category1: {
        name: 'tanaka',
        age: 10,
        tall: 150,
        weight: 30,
        address: 'tokyo',
        test1: 100,
        test2: 200,
      },
      category2: {
        name: 'hayashi',
        age: 30,
        tall: 160,
        weight: 45,
      },
      category3: {
        name: 'suzuki',
        age: 20,
        tall: 170,
        weight: 60,
        address: 'tokyo',
        test1: 100,
        test2: 200,
      },
      category4: {
        name: 'suzuki',
        age: 20,
        tall: 170,
        weight: 60,
        address: 'tokyo',
        test1: 100,
        test2: 200,
      },
    };

    setSetting(data);

    // axios
    //   .get<Array<Location>>(`${apiDomain}/locations`)
    //   .then((response) => {
    //     const data: Array<Location> = response.data.map((location) => ({
    //       date_time: location.date_time,
    //       lat: location.lat,
    //       lng: location.lng,
    //       device_mode: location.device_mode,
    //     }));
    //     console.log(data);
    //     setLocationList(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     showMessage({ title: 'Failed to get location list.', status: 'error' });
    //   })
    //   .finally(() => setIsLoading(false));

    setIsLoading(false);
  };

  return {
    getSetting,
    setting,
    isLoading,
  };
};
