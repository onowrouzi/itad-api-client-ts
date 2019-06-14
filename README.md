# itad-api-client-ts
A typescript api library/client for IsThereAnyDeal.

Most calls should be 1 to 1 with the API [documentation](https://itad.docs.apiary.io/).

NOTE: Currently does not implement calls that require authentication. I will implement these calls if requested.

## Installation

`npm install itad-api-client-ts --save`

## Usage

```javascript
import { IsThereAnyDealApi } from "itad-api-client-ts"; // And any other types needed.

const itadApi = new IsThereAnyDealApi(apiKey);

const shops = await itadApi.getShops();
const regions = await itadApi.getRegions();
const regionalShops = await itadApi.getRegionalShops("eu1"); // potential regions returned in getRegions call.

// Get next 20 deals that are available in the region/country, after first 20 for steam & gog.
const deals = await itadApi.getDeals({
  shops: ["steam", "gog"], // potential shops returned in getShops.
  limit: 20,
  offset: 20,
  region: "eu1",
  country: "AL"
});

// Search deals by title for steam.
const matchingDeals = await itadApi.searchDeals("fallout", {
  shops: ["steam"]
});

// Get deals along with game info (such as image, is_dlc, etc).
// The second param is an optional title query.
const dealsWithGameInfo = await itadApi.getDealsFull({
  shops: ["steam"]
}, "fallout");
```

## Methods

The only call that does not map 1 to 1 is `getDealsFull` 
as it is a convenience method for calling both getDeals/searchDeals 
and subsequently getGameInfo utilizing the plains/ids retrieved, 
merging the game info into the deal entry.

```javascript
getShops:  /v01/web/stores/all/
getRegionalShops: /v02/web/stores/?region=&country=
getRegions: /v01/web/regions/
getPlain: /v02/game/plain/?key=&shop=&game_id=&title=&url=
getPlains: /v01/game/plain/list/?key=&shops=
getGameInfo: /v01/game/info/?key=&plains=
getGamePrices: /v01/game/prices/?key=&plains=&region=&country=&shops=&exclude=&added=
getHistoricalLow: /v01/game/lowest/?key=&plains=&region=&country=&shops=&exclude=&since=
getDeals: /v01/deals/list/?key=&shops=&offset=&limit=&region=&country=
searchDeals: /v01/search/search/?key=&q=&shops=&offset=&limit=&region=&country=
```
