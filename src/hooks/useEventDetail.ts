import { useState } from 'react';
import { useMessage } from './useMessage';
import { EventDetail } from '../types/api/event_detail';

export const useEventDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const { showMessage } = useMessage();

  const apiDomain = process.env.REACT_APP_BACKOFFICE_API_DOMAIN;

  const getEventDetail = (event_id: number, onOpen: () => void) => {
    setIsLoading(true);

    if (event_id === 1) {
      setEventDetail({
        event_id: 3,
        date_time: '2022-10-10T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 5,
        download_urls: {
          video_front: 'https://xxx.com/aaa.jpg',
          video_rear: 'https://xxx.com/bbb.jpg',
          video_in: 'https://xxx.com/ccc.jpg',
          still_image_front: 'https://xxx.com/ddd.jpg',
          still_image_rear: 'https://xxx.com/eee.jpg',
          still_image_in: 'https://xxx.com/fff.jpg',
        },
      });
    } else {
      setEventDetail({
        event_id: 3,
        date_time: '2022-10-20T00:00:00Z',
        lat: 35.19,
        lng: 145.01,
        event_type: 5,
        download_urls: {
          video_front: 'https://xxx.com/aaa.jpg',
          video_rear: 'https://xxx.com/bbb.jpg',
          video_in: 'https://xxx.com/ccc.jpg',
        },
      });
    }

    setIsLoading(false);
    onOpen();
  };

  return {
    getEventDetail,
    eventDetail,
    isLoading,
  };
};
