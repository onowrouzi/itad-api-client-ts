import { ItadShop } from "./shop";
export declare type ItadHistoricalGamesInfo = {
    [plain: string]: ItadHistoricalGameInfo;
};
export declare type ItadHistoricalGameInfo = {
    shop: ItadShop;
    price: number;
    cut: number;
    added: number;
    urls: {
        game: string;
        history: string;
    };
};
