export type OtaUpload = {
  upload_url: string;
};

export type OtaSummary = {
  name: string;
  ota_type: string;
  version_number: number;
  version_name: string;
  original_version_number?: number;
  upload_path: string;
};

export type OtaSummaries = {
  items: Array<OtaSummary>;
};
