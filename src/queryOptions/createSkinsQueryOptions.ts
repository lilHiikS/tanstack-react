import type { Skin } from "../types";

export default function createSkinsQueryOptions() {
  return {
    queryKey: ["skins"],
    queryFn: getSkins,
  };
}

const getSkins = async (): Promise<Skin[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
  );
  return await response.json();
};
