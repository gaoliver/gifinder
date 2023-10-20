export type GIFProps = {
  id: string;
  url: string;
  slug: string;
  embed_url: string;
  source: string;
  title: string;
  rating: string;
  images: {
    original: {
      height: string;
      width: string;
      size: string;
      url: string;
      mp4_size: string;
      mp4: string;
      webp_size: string;
      webp: string;
      frames: string;
      hash: string;
    };
    downsized: {
      height: string;
      width: string;
      size: string;
      url: string;
    };
    downsized_still: {
      height: string;
      width: string;
      size: string;
      url: string;
    };
  };
};

export type SearchResultsApi = {
  data: GIFProps[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
};
