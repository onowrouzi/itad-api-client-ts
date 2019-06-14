import * as nfetch from "node-fetch";

import {
  ItadShop,
  ItadRegions,
  ItadDeals,
  ItadGameSearchParams,
  ItadGameHistorySearchParams,
  ItadGameDealSearchParams,
  ItadPlain,
  ItadGamesInfo,
  ItadHistoricalGamesInfo,
  ItadShopPlains,
  ItadDealsFull,
  ItadDealFull,
  ItadGamePriceSearchParams,
  ItadCurrentPrices
} from "./types";

export default class IsThereAnyDealApi {
  private readonly BASE_URL = "https://api.isthereanydeal.com";
  private readonly defaultHeaders = {
    "Content-Type": "application/json;charset=UTF-8"
  };

  private key: string;
  private deals: ItadDeals;
  private regions: ItadRegions;
  private shops: ItadShop[];

  constructor(key: string) {
    this.key = key;
  }

  async getShops(): Promise<ItadShop[]> {
    if (this.shops) {
      return await new Promise((res, rej) => res(this.shops));
    } else {
      const url = `${this.BASE_URL}/v01/web/stores/all/`;
      this.shops = await this.request(url);
      return this.shops;
    }
  }

  async getRegionalShops(
    region: string,
    country?: string
  ): Promise<ItadShop[]> {
    const url = `${this.BASE_URL}/v02/web/stores/?region=${region ||
      ""}&country=${country || ""}`;
    return await this.request(url);
  }

  async getRegions(): Promise<ItadRegions> {
    if (this.regions) {
      return await new Promise((res, rej) => res(this.regions));
    } else {
      const url = `${this.BASE_URL}/v01/web/regions/`;
      this.regions = await this.request(url);
      return this.regions;
    }
  }

  async getPlain(params: ItadGameSearchParams): Promise<ItadPlain> {
    let url = `${this.BASE_URL}/v02/game/plain/?key=${
      this.key
    }&shop=${params.shop || ""}&game_id=${params.game_id ||
      ""}&title=${params.title || ""}&url=${params.url || ""}`;

    return await this.request(url);
  }

  async getPlains(shops: string[]): Promise<ItadShopPlains> {
    if (!shops || shops.length === 0) {
      throw new Error("Must provide at least one shop. Ex: ['steam'].");
    }

    const shopsParam = `shops=${shops ? shops.join(",") : ""}`;
    const url = `${this.BASE_URL}/v01/game/plain/list/?key=${
      this.key
    }&${shopsParam}`;

    return await this.request(url);
  }

  async getGameInfo(plains: string[]): Promise<ItadGamesInfo> {
    if (!plains || plains.length === 0) {
      throw new Error(
        "Must provide at least one game plain. Ex: ['fallout-3']."
      );
    }

    if (plains.length > 100) {
      plains = plains.slice(0, 100);
    }

    const url = `${this.BASE_URL}/v01/game/info/?key=${
      this.key
    }&plains=${plains.join(",")}`;

    return await this.request(url);
  }

  async getGamePrices(
    params: ItadGamePriceSearchParams
  ): Promise<ItadCurrentPrices> {
    if (!params.plains || params.plains.length === 0) {
      throw new Error(
        "Must provide at least one game plain. Ex: ['fallout-3']."
      );
    }

    const shopsParam = `${params.shops ? params.shops.join(",") : ""}`;
    const excludesParam = `${
      params.excludeShops ? params.excludeShops.join(",") : ""
    }`;
    const url = `${this.BASE_URL}/v01/game/prices/?key=${
      this.key
    }&plains=${params.plains.join(",")}&region=${params.region ||
      ""}&country=${params.country ||
      ""}&shops=${shopsParam}&exclude=${excludesParam}&added=${params.added ||
      0}`;

    return await this.request(url);
  }

  async getHistoricalLow(
    params: ItadGameHistorySearchParams
  ): Promise<ItadHistoricalGamesInfo> {
    if (!params.plains || params.plains.length === 0) {
      throw new Error(
        "Must provide at least one game plain. Ex: ['fallout-3']."
      );
    }

    const shopsParam = `${params.shops ? params.shops.join(",") : ""}`;
    const excludesParam = `${
      params.excludeShops ? params.excludeShops.join(",") : ""
    }`;
    const url = `${this.BASE_URL}/v01/game/lowest/?key=${
      this.key
    }&plains=${params.plains.join(",")}&region=${params.region ||
      ""}&country=${params.country ||
      ""}&shops=${shopsParam}&exclude=${excludesParam}&since=${params.since ||
      0}`;

    return await this.request(url);
  }

  async getDeals(params: ItadGameDealSearchParams): Promise<ItadDeals> {
    const shopsParam = `shops=${params.shops ? params.shops.join(",") : ""}`;
    const offsetParam = `offset=${params.offset || ""}`;
    const limitParam = `limit=${params.limit || 100}`;
    const regionParam = `region=${params.region || ""}`;
    const countryParam = `country=${params.country || ""}`;

    const url = `${this.BASE_URL}/v01/deals/list/?key=${
      this.key
    }&${shopsParam}&${offsetParam}&${limitParam}&${regionParam}&${countryParam}`;

    this.deals = await this.request(url);
    return this.deals;
  }

  async getDealsFull(
    params: ItadGameDealSearchParams,
    title?: string
  ): Promise<ItadDealsFull> {
    const deals = !title
      ? await this.getDeals(params)
      : await this.searchDeals(title, params);
    const plains = deals && deals.list ? deals.list.map(d => d.plain) : [];

    if (plains.length === 0) {
      return {
        count: 0,
        list: [],
        urls: deals.urls
      };
    }

    const gameInfoList = await this.getGameInfo(plains);
    const list = deals.list.map(d => {
      const info =
        gameInfoList && gameInfoList[d.plain] ? gameInfoList[d.plain] : {};
      return Object.assign(d, info) as ItadDealFull;
    });

    return {
      count: deals.count || list.length,
      list,
      urls: deals.urls
    };
  }

  async searchDeals(
    title: string,
    params: ItadGameDealSearchParams
  ): Promise<ItadDeals> {
    const shopsParam = `shops=${params.shops ? params.shops.join(",") : ""}`;
    const offsetParam = `offset=${params.offset || ""}`;
    const limitParam = `limit=${params.limit || 100}`;
    const regionParam = `region=${params.region || ""}`;
    const countryParam = `country=${params.country || ""}`;

    const url = `${this.BASE_URL}/v01/search/search/?key=${
      this.key
    }&q=${title}&${shopsParam}&${offsetParam}&${limitParam}&${regionParam}&${countryParam}`;

    this.deals = await this.request(url);
    return this.deals;
  }

  private async request(
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: any
  ): Promise<any> {
    try {
      const call = process.env.ENV == "test" ? nfetch.default : fetch;
      headers = headers
        ? Object.assign(headers, this.defaultHeaders)
        : this.defaultHeaders;

      const res = await call(url, {
        method: method || "GET",
        headers,
        body
      });

      const json = await res.json();

      if (res.status >= 200 && res.status < 300) {
        return json.data;
      } else if (json.error) {
        throw new Error(`${json.error}: ${json.error_description}`);
      } else {
        throw new Error("Call to IsThereAnyDeal failed.");
      }
    } catch (err) {
      throw err;
    }
  }
}
