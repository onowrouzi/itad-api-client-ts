import { ItadShop, ItadRegions, ItadDeals, ItadGameSearchParams, ItadGameHistorySearchParams, ItadGameDealSearchParams, ItadPlain, ItadGamesInfo, ItadHistoricalGamesInfo, ItadShopPlains, ItadDealsFull, ItadGamePriceSearchParams, ItadCurrentPrices, ItadExternalIdPlains } from "./types";
export declare class IsThereAnyDealApi {
    private readonly BASE_URL;
    private readonly defaultHeaders;
    private http;
    private key;
    private deals;
    private regions;
    private shops;
    constructor(key: string);
    getShops(): Promise<ItadShop[]>;
    getRegionalShops(region: string, country?: string): Promise<ItadShop[]>;
    getRegions(): Promise<ItadRegions>;
    getPlain(params: ItadGameSearchParams): Promise<ItadPlain>;
    getPlains(shops: string[]): Promise<ItadShopPlains>;
    getPlainsByExternalId(ids: string[], shop: string): Promise<ItadExternalIdPlains>;
    getGameInfo(plains: string[]): Promise<ItadGamesInfo>;
    getGamePrices(params: ItadGamePriceSearchParams): Promise<ItadCurrentPrices>;
    getHistoricalLow(params: ItadGameHistorySearchParams): Promise<ItadHistoricalGamesInfo>;
    getDeals(params: ItadGameDealSearchParams): Promise<ItadDeals>;
    getDealsFull(params: ItadGameDealSearchParams, title?: string): Promise<ItadDealsFull>;
    searchDeals(title: string, params: ItadGameDealSearchParams): Promise<ItadDeals>;
    private request;
}
