export type EventDetail = {
  event_id: number;
  date_time: string;
  event_type: number;
  lat: number;
  lng: number;
  download_urls: {
    video_front?: string;
    video_rear?: string;
    video_in?: string;
    still_image_front?: string;
    still_image_rear?: string;
    still_image_in?: string;
  };
};
