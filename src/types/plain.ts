export type ItadPlain = {
  plain: string;
};

export type ItadShopPlains = {
  [shop: string]: {
    [id: string]: string;
  };
};
