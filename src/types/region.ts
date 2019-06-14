export type ItadRegions = {
  [region: string]: ItadRegion;
};

export type ItadRegion = {
  countries: string[];
  currency: ItadRegionCurrency;
};

export type ItadRegionCurrency = {
  code: string;
  sign: string;
  delimiter: string;
  left: boolean;
  name: string;
  html: string;
};
