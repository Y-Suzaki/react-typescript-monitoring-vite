import { useState } from 'react';
import { EventSummary } from '../types/api/event';
import axios from 'axios';
import { useMessage } from './useMessage';

export const useEventSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventSummaries, setEventSummaries] = useState<Array<EventSummary>>([]);
  const { showMessage } = useMessage();

  const apiDomain = process.env.REACT_APP_BACKOFFICE_API_DOMAIN;

  const getEventSummaries = (imei: string, day: string) => {
    setIsLoading(true);

    const data: Array<EventSummary> = [
      {
        event_id: 1,
        date_time: '2022-10-10T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 3,
      },
      {
        event_id: 2,
        date_time: '2022-10-10T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 4,
      },
      {
        event_id: 3,
        date_time: '2022-10-10T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 5,
      },
      {
        event_id: 4,
        date_time: '2022-10-10T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 6,
      },
    ];

    setEventSummaries(data);

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
    getEventSummaries,
    eventSummaries,
    isLoading,
  };
};
