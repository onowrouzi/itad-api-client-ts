import { ItadShop } from "./shop";
import { ItadPlain } from "./plain";
import { ItadGameInfo } from "./game-info";

export type ItadDealsFull = {
  count?: number;
  list: ItadDealFull[];
  urls: {
    deals: string;
  };
};

export type ItadDeals = {
  count?: number;
  list: ItadDeal[];
  urls: {
    deals: string;
  };
};

export type ItadPriceInfo = {
  price_new: number;
  price_old: number;
  price_cut: number;
  shop: ItadShop;
  drm: string[];
  url: string;
};

export type ItadCurrentPrices = {
  [plain: string]: {
    list: ItadDeal[];
    urls: {
      game: string;
    };
  };
};

export type ItadDeal = ItadPlain &
  ItadPriceInfo & {
    title: string;
    added: number;
    urls: {
      buy: string;
      game: string;
    };
  };

export type ItadDealFull = ItadDeal & ItadGameInfo;
