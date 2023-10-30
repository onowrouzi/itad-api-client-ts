export declare type ItadGamesInfo = {
    [plain: string]: ItadGameInfo;
};
export declare type ItadGameInfo = {
    title: string;
    image: string;
    greenlight: {
        status: string;
        url: string;
    };
    is_package: boolean;
    is_dlc: boolean;
    achievements: boolean;
    trading_cards: boolean;
    early_access: boolean;
    reviews: {
        [shop: string]: {
            perc_positive: number;
            total: number;
            text: string;
        };
    };
    urls: {
        game: string;
        package: string;
        dlc: string;
    };
};
export declare type ItadGameOverview = {
    [id: string]: {
        price: ItadGameOverviewPrice & {
            drm: string[];
        };
        lowest: ItadGameOverviewPrice & {
            recorded: number;
            recorded_formatted: string;
        };
        bundles: {
            count: number;
            live: [{
                title: string;
                url: string;
                expiry: string;
                expiry_rfc: string;
                type: string;
                page: string;
                details: string;
                tiers: [{
                    price: number;
                    price_formatted: string;
                    fixed: number;
                    note: string;
                    games: string[];
                }];
            }];
        };
        urls: {
            info: string;
            history: string;
            bundles: string;
        };
    };
};
export declare type ItadGameOverviewPrice = {
    store: string;
    cut: number;
    price: number;
    price_formatted: string;
    url: string;
};
