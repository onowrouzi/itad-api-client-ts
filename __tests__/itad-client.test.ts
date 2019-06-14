import { IsThereAnyDealApi } from "./../src/itad-client";
import { ItadDeal } from "../src/types";

require("dotenv").config();

jest.setTimeout(30000);

describe("ITAD Client Tests", () => {
  const client = new IsThereAnyDealApi(process.env.API_KEY);

  const testPlain = "fallout-iii";
  const testTitle = "fallout-3";
  const testShop = "steam";

  let deal: ItadDeal;

  it("ITAD Client - getDeals", async () => {
    const res = await client.getDeals({
      shops: [testShop]
    });

    expect(res).not.toBeUndefined();
    expect(typeof res.count == "number").toBeTruthy();
    expect(res.count).toBeGreaterThan(0);
    expect(Array.isArray(res.list)).toBeTruthy();
    expect(res.list.length).toBeGreaterThan(0);
    expect(res.urls).toHaveProperty("deals");

    deal = res.list[0];
  });

  it("ITAD Client - getDealsFull", async () => {
    const res = await client.getDealsFull({
      shops: [testShop]
    });

    expect(res).not.toBeUndefined();
    expect(typeof res.count == "number").toBeTruthy();
    expect(res.count).toBeGreaterThan(0);
    expect(Array.isArray(res.list)).toBeTruthy();
    expect(res.urls).toHaveProperty("deals");

    res.list.forEach(d => {
      expect(d).toHaveProperty("image");
      expect(d).toHaveProperty("title");
      expect(d).toHaveProperty("plain");
      expect(d).toHaveProperty("price_new");
      expect(d).toHaveProperty("price_old");
      expect(d).toHaveProperty("price_cut");
      expect(d).toHaveProperty("is_dlc");
    });
  });

  it("ITAD Client - getDealsFull (with title query)", async () => {
    const res = await client.getDealsFull(
      {
        shops: [testShop]
      },
      "fallout"
    );

    expect(res).not.toBeUndefined();
    expect(typeof res.count == "number").toBeTruthy();
    expect(res.count).toBeGreaterThan(0);
    expect(Array.isArray(res.list)).toBeTruthy();
    expect(res.urls).toHaveProperty("deals");

    res.list.forEach(d => {
      expect(d).toHaveProperty("image");
      expect(d).toHaveProperty("title");
      expect(d).toHaveProperty("plain");
      expect(d).toHaveProperty("price_new");
      expect(d).toHaveProperty("price_old");
      expect(d).toHaveProperty("price_cut");
      expect(d).toHaveProperty("is_dlc");
    });
  });

  it("ITAD Client - searchDeals", async () => {
    const res = await client.searchDeals("fallout", {
      shops: [testShop]
    });

    expect(res).not.toBeUndefined();
    expect(res.count).toBeUndefined();
    expect(Array.isArray(res.list)).toBeTruthy();
    expect(res.urls).toHaveProperty("deals");
  });

  it("ITAD Client - getPlain", async () => {
    const res = await client.getPlain({
      title: testTitle
    });

    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty("plain");
  });

  it("ITAD Client - getPlains", async () => {
    const res = await client.getPlains([testShop]);

    expect(res).not.toBeUndefined();
  });

  it("ITAD Client - getPlains (without shops) - ERROR", async () => {
    await expect(client.getPlains([])).rejects.toThrowError();
  });

  it("ITAD Client - getGameInfo", async () => {
    const plain = deal ? deal.plain : testPlain;

    const res = await client.getGameInfo([plain]);

    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty(plain);
    expect(res[plain].title).not.toBeUndefined();
    expect(res[plain].urls).not.toBeUndefined();
    expect(res[plain].urls).toHaveProperty("game");
  });

  it("ITAD Client - getGameInfo (without plains) - ERROR", async () => {
    await expect(client.getGameInfo([])).rejects.toThrowError();
  });

  it("ITAD Client - getShops", async () => {
    const res = await client.getShops();

    expect(res).not.toBeUndefined();
    expect(Array.isArray(res)).toBeTruthy();
    expect(res.length).toBeGreaterThan(0);
    expect(typeof res[0].id == "string").toBeTruthy();

    const cached = await client.getShops();

    expect(cached).not.toBeUndefined();
    expect(Array.isArray(cached)).toBeTruthy();
    expect(cached.length).toBeGreaterThan(0);
    expect(typeof cached[0].id == "string").toBeTruthy();
  });

  it("ITAD Client - getRegionalShops", async () => {
    const regions = await client.getRegions();

    expect(regions).not.toBeUndefined();
    const region = Object.keys(regions)[0];
    const res = await client.getRegionalShops(region);

    expect(res).not.toBeUndefined();
    expect(Array.isArray(res)).toBeTruthy();
    expect(res.length).toBeGreaterThan(0);
    expect(typeof res[0].id == "string").toBeTruthy();
  });

  it("ITAD Client - getRegionalShops (with country)", async () => {
    const regions = await client.getRegions();

    expect(regions).not.toBeUndefined();
    const region = Object.keys(regions)[0];
    const country = regions[region].countries[0];
    const res = await client.getRegionalShops(region, country);

    expect(res).not.toBeUndefined();
    expect(Array.isArray(res)).toBeTruthy();
    expect(res.length).toBeGreaterThan(0);
    expect(typeof res[0].id == "string").toBeTruthy();
  });

  it("ITAD Client - getRegionalShops (without region) - ERROR", async () => {
    await expect(client.getRegionalShops("")).rejects.toThrowError();
  });

  it("ITAD Client - getRegions", async () => {
    const res = await client.getRegions();

    expect(res).not.toBeUndefined();
    Object.keys(res).forEach(key => {
      expect(Array.isArray(res[key].countries)).toBeTruthy();
      expect(res[key].countries.length).toBeGreaterThan(0);
    });
  });

  it("ITAD Client - getHistoricalLow", async () => {
    const plain = deal ? deal.plain : testPlain;

    const res = await client.getHistoricalLow({
      plains: [plain]
    });

    expect(res).not.toBeUndefined();
    expect(res[plain]).not.toBeUndefined();
    expect(res[plain].urls).not.toBeUndefined();
    expect(res[plain].urls).toHaveProperty("game");
    expect(res[plain].urls).toHaveProperty("history");
  });

  it("ITAD Client - getHistoricalLow (without plain) - ERROR", async () => {
    await expect(
      client.getHistoricalLow({
        plains: []
      })
    ).rejects.toThrowError();
  });

  it("ITAD Client - getGamePrices", async () => {
    const plain = deal ? deal.plain : testPlain;

    const res = await client.getGamePrices({
      plains: [plain]
    });

    expect(res).not.toBeUndefined();
    expect(res[plain]).not.toBeUndefined();
    expect(res[plain].urls).not.toBeUndefined();
    expect(res[plain].urls).toHaveProperty("game");
    expect(Array.isArray(res[plain].list)).toBeTruthy();
    res[plain].list.forEach(p => {
      expect(typeof p.price_cut == "number").toBeTruthy();
      expect(typeof p.price_new == "number").toBeTruthy();
      expect(typeof p.price_old == "number").toBeTruthy();
      expect(p.shop).not.toBeUndefined();
      expect(p.shop.id).not.toBeUndefined();
    });
  });

  it("ITAD Client - getGamePrices (without plain) - ERROR", async () => {
    await expect(
      client.getGamePrices({
        plains: []
      })
    ).rejects.toThrowError();
  });
});
