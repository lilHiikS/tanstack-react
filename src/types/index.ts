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
  price?: number; // Making price optional since it might not be in the API
}
