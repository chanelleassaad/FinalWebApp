export interface IRoot {
  results: IResult[];
  pagination: IPagination;
}

export interface IResult {
  _id: string;
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url: any;
  description?: string;
  content: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_priority: number;
  source_url: string;
  source_icon?: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
