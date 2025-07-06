// Types for Counter-Strike skins
export interface Skin {
  id: string;
  name: string;
  description: string;
  weapon: {
    id: string;
    name: string;
  };
  image: string;
  min_float: number | null;
  max_float: number | null;
  category: {
    name: string;
    id: string;
  };
}

export interface Sticker {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
  price?: number;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  contains: [
    {
      id: string;
      name: string;
      rarity: {
        id: string;
        name: string;
        color: string;
      };
      image: string;
    },
  ];
}

export interface Crates {
  id: string;
  name: string;
  image: string;
  contains: {
    id: string;
    name: string;
    image: string;
    rarity: {
      id: string;
      name: string;
      color: string;
    };
  }[];
}
