import type { Crates } from "../types";

export default function createCratesQueryOptions() {
  return {
    queryKey: ["crates"],
    queryFn: getCrates,
  };
}

const getCrates = async (): Promise<Crates[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json"
  );
  return await response.json();
};
