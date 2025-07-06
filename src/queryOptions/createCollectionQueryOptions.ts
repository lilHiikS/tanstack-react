import type { Collection } from "../types";

export default function createCollectionQueryOptions() {
  return {
    queryKey: ["collections"],
    queryFn: getCollections,
  };
}

const getCollections = async (): Promise<Collection[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/collections.json"
  );
  return await response.json();
};
