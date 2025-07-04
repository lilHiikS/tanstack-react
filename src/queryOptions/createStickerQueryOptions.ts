import type { Sticker } from "../types";

export default function createStickerQueryOptions() {
  return {
    queryKey: ["stickers"],
    queryFn: getStickers,
  };
}

const getStickers = async (): Promise<Sticker[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/stickers.json"
  );
  return await response.json();
};
