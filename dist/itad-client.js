"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsThereAnyDealApi = void 0;
const axios_1 = __importDefault(require("axios"));
class IsThereAnyDealApi {
    constructor(key) {
        this.BASE_URL = "https://api.isthereanydeal.com";
        this.defaultHeaders = {
            "Content-Type": "application/json;charset=UTF-8"
        };
        this.key = key;
        this.http = axios_1.default.create({
            baseURL: this.BASE_URL
        });
    }
    getShops() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.shops) {
                return yield new Promise((res, rej) => res(this.shops));
            }
            else {
                const url = `/v01/web/stores/all/`;
                this.shops = yield this.request(url);
                return this.shops;
            }
        });
    }
    getRegionalShops(region, country) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/v02/web/stores/?region=${region || ""}&country=${country ||
                ""}`;
            return yield this.request(url);
        });
    }
    getRegions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.regions) {
                return yield new Promise((res, rej) => res(this.regions));
            }
            else {
                const url = `/v01/web/regions/`;
                this.regions = yield this.request(url);
                return this.regions;
            }
        });
    }
    getPlain(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/v02/game/plain/?key=${this.key}&shop=${params.shop ||
                ""}&game_id=${params.game_id || ""}&title=${params.title ||
                ""}&url=${params.url || ""}`;
            return yield this.request(url);
        });
    }
    getPlains(shops) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!shops || shops.length === 0) {
                throw new Error("Must provide at least one shop. Ex: ['steam'].");
            }
            const shopsParam = `shops=${shops ? shops.join(",") : ""}`;
            const url = `/v01/game/plain/list/?key=${this.key}&${shopsParam}`;
            return yield this.request(url);
        });
    }
    getPlainsByExternalId(ids, shop) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || ids.length === 0) {
                throw new Error("Must provide at least one external id. Ex: ['app/12345'].");
            }
            if (!shop) {
                throw new Error("Must provide a shop. Ex: 'steam'");
            }
            const idsParam = `ids=${ids ? ids.join(",") : ""}`;
            const url = `/v01/game/plain/id/?key=${this.key}&shop=${shop}&${idsParam}`;
            return yield this.request(url);
        });
    }
    getGameInfo(plains) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!plains || plains.length === 0) {
                throw new Error("Must provide at least one game plain. Ex: ['fallout-3'].");
            }
            if (plains.length > 100) {
                plains = plains.slice(0, 100);
            }
            const url = `/v01/game/info/?key=${this.key}&plains=${plains.join(",")}`;
            return yield this.request(url);
        });
    }
    getGamePrices(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.plains || params.plains.length === 0) {
                throw new Error("Must provide at least one game plain. Ex: ['fallout-3'].");
            }
            const shopsParam = `${params.shops ? params.shops.join(",") : ""}`;
            const excludesParam = `${params.excludeShops ? params.excludeShops.join(",") : ""}`;
            const url = `/v01/game/prices/?key=${this.key}&plains=${params.plains.join(",")}&region=${params.region || ""}&country=${params.country ||
                ""}&shops=${shopsParam}&exclude=${excludesParam}&added=${params.added ||
                0}`;
            return yield this.request(url);
        });
    }
    getHistoricalLow(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.plains || params.plains.length === 0) {
                throw new Error("Must provide at least one game plain. Ex: ['fallout-3'].");
            }
            const shopsParam = `${params.shops ? params.shops.join(",") : ""}`;
            const excludesParam = `${params.excludeShops ? params.excludeShops.join(",") : ""}`;
            const url = `/v01/game/lowest/?key=${this.key}&plains=${params.plains.join(",")}&region=${params.region || ""}&country=${params.country ||
                ""}&shops=${shopsParam}&exclude=${excludesParam}&since=${params.since ||
                0}`;
            return yield this.request(url);
        });
    }
    getDeals(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopsParam = `shops=${params.shops ? params.shops.join(",") : ""}`;
            const offsetParam = `offset=${params.offset || ""}`;
            const limitParam = `limit=${params.limit || 100}`;
            const regionParam = `region=${params.region || ""}`;
            const countryParam = `country=${params.country || ""}`;
            const url = `/v01/deals/list/?key=${this.key}&${shopsParam}&${offsetParam}&${limitParam}&${regionParam}&${countryParam}`;
            this.deals = yield this.request(url);
            return this.deals;
        });
    }
    getDealsFull(params, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const deals = !title
                ? yield this.getDeals(params)
                : yield this.searchDeals(title, params);
            const plains = deals && deals.list ? deals.list.map(d => d.plain) : [];
            if (plains.length === 0) {
                return {
                    count: 0,
                    list: [],
                    urls: deals.urls
                };
            }
            const gameInfoList = yield this.getGameInfo(plains);
            const list = deals.list.map(d => {
                const info = gameInfoList && gameInfoList[d.plain] ? gameInfoList[d.plain] : {};
                return Object.assign(d, info);
            });
            return {
                count: deals.count || list.length,
                list,
                urls: deals.urls
            };
        });
    }
    searchDeals(title, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopsParam = `shops=${params.shops ? params.shops.join(",") : ""}`;
            const offsetParam = `offset=${params.offset || ""}`;
            const limitParam = `limit=${params.limit || 100}`;
            const regionParam = `region=${params.region || ""}`;
            const countryParam = `country=${params.country || ""}`;
            const url = `/v01/search/search/?key=${this.key}&q=${title}&${shopsParam}&${offsetParam}&${limitParam}&${regionParam}&${countryParam}`;
            this.deals = yield this.request(url);
            return this.deals;
        });
    }
    request(url, method, body, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                headers = headers
                    ? Object.assign(headers, this.defaultHeaders)
                    : this.defaultHeaders;
                const res = yield this.http.request({
                    url,
                    method: method || "GET",
                    headers,
                    data: body
                });
                return res.data.data;
            }
            catch (err) {
                var error = err && err.response && err.response.data
                    ? new Error(`${err.response.data.error}: ${err.response.data.error_description}`)
                    : err;
                throw error;
            }
        });
    }
}
exports.IsThereAnyDealApi = IsThereAnyDealApi;
//# sourceMappingURL=itad-client.js.map