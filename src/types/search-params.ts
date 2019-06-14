export type ItadGameSearchParams = {
  game_id?: string;
  url?: string;
  title?: string;
  shop?: string;
};

export type ItadGameDealSearchParams = {
  shops?: string[];
  offset?: number;
  limit?: number;
  region?: string;
  country?: string;
};

export type ItadGameListSearchParams = {
  plains: string[];
  region?: string;
  country?: string;
  shops?: string[];
  excludeShops?: string[];
};

export type ItadGamePriceSearchParams = ItadGameListSearchParams & {
  added?: number;
};

export type ItadGameHistorySearchParams = ItadGameListSearchParams & {
  since?: number;
  until?: number;
  new?: boolean;
};
