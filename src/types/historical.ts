import { ItadShop } from "./shop";

export type ItadHistoricalGamesInfo = {
  [plain: string]: ItadHistoricalGameInfo;
};

export type ItadHistoricalGameInfo = {
  shop: ItadShop;
  price: number;
  cut: number;
  added: number;
  urls: {
    game: string;
    history: string;
  };
};
