import { ItadShop } from "./shop";
import { ItadPlain } from "./plain";
import { ItadGameInfo } from "./game-info";
export declare type ItadDealsFull = {
    count?: number;
    list: ItadDealFull[];
    urls: {
        deals: string;
    };
};
export declare type ItadDeals = {
    count?: number;
    list: ItadDeal[];
    urls: {
        deals: string;
    };
};
export declare type ItadPriceInfo = {
    price_new: number;
    price_old: number;
    price_cut: number;
    shop: ItadShop;
    drm: string[];
    url: string;
};
export declare type ItadCurrentPrices = {
    [plain: string]: {
        list: ItadDeal[];
        urls: {
            game: string;
        };
    };
};
export declare type ItadDeal = ItadPlain & ItadPriceInfo & {
    title: string;
    added: number;
    urls: {
        buy: string;
        game: string;
    };
};
export declare type ItadDealFull = ItadDeal & ItadGameInfo;
