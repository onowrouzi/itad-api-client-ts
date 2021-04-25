export declare type ItadRegions = {
    [region: string]: ItadRegion;
};
export declare type ItadRegion = {
    countries: string[];
    currency: ItadRegionCurrency;
};
export declare type ItadRegionCurrency = {
    code: string;
    sign: string;
    delimiter: string;
    left: boolean;
    name: string;
    html: string;
};
