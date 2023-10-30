export declare type ItadGameSearchParams = {
    game_id?: string;
    url?: string;
    title?: string;
    shop?: string;
};
export declare type ItadGameDealSearchParams = {
    shops?: string[];
    offset?: number;
    limit?: number;
    region?: string;
    country?: string;
};
export declare type ItadGameListSearchParams = {
    plains: string[];
    region?: string;
    country?: string;
    shops?: string[];
    excludeShops?: string[];
};
export declare type ItadGamePriceSearchParams = ItadGameListSearchParams & {
    added?: number;
};
export declare type ItadGameHistorySearchParams = ItadGameListSearchParams & {
    since?: number;
    until?: number;
    new?: boolean;
};
