export type NewsSummaries = {
  items: Array<NewsSummary>;
};

export type NewsSummary = {
  news_id: string;
  title: string;
  content: string;
  publicationDate: string;
  endDate: string;
  status: number;
};

export type NewsDetail = {
  news_id: string;
  title: string;
  content: string;
  publicationDate: string;
  endDate: string;
  status: number;
};

export type NewsRequest = {
  title: string;
  content: string;
  publicationDate: string;
  endDate?: string;
};
