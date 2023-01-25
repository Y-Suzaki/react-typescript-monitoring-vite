export type OTAUpload = {
  upload_url: string;
};

export type OTASummary = {
  name: string;
  ota_type: string;
  version_number: number;
  version_name: string;
  original_version_number?: number;
  upload_path: string;
};

export type OTASummaries = {
  items: Array<OTASummary>;
};
