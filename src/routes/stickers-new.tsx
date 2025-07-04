import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import StickerItem from "../components/StickerItem";
import createStickerQueryOptions from "../queryOptions/createStickerQueryOptions";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import type { Sticker } from "../types";

export const Route = createFileRoute("/stickers-new")({
  component: StickersPage,
});

function StickersPage() {
  const stickersQuery = useSuspenseQuery(createStickerQueryOptions());
  const { preferences, updatePreferences, toggleFavorite, isFavorite } =
    useUserPreferences();
  const [sortBy, setSortBy] = useState<"name" | "rarity">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (stickersQuery.error) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">
          Error loading stickers: {stickersQuery.error.message}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleStickerClick = (sticker: Sticker) => {
    console.log("Selected sticker:", sticker.name);
    // Toggle favorite when clicking on a sticker
    toggleFavorite(sticker.id);
  };

  // Sort stickers based on preferences
  const sortedStickers = [...(stickersQuery.data as Sticker[])].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "rarity":
        comparison = a.rarity.name.localeCompare(b.rarity.name);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Stickers Collection
        </h2>

        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "rarity")}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="rarity">Sort by Rarity</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {stickersQuery.isPending ? (
        <LoadingSpinner size="large" className="mt-8" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedStickers
              .slice(0, preferences.itemsPerPage * 5) // Show 5 pages worth for stickers
              .map((sticker: Sticker, index: number) => (
                <div key={`${sticker.id}-${index}`} className="relative">
                  <StickerItem
                    sticker={sticker}
                    size="medium"
                    onClick={handleStickerClick}
                    className={`hover:shadow-2xl transition-all duration-200 ${
                      isFavorite(sticker.id) ? "ring-2 ring-yellow-400" : ""
                    }`}
                  />
                  {/* Favorite indicator */}
                  {isFavorite(sticker.id) && (
                    <div className="absolute top-2 right-2 text-yellow-400 text-xl">
                      ⭐
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Show total count */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showing{" "}
              {Math.min(preferences.itemsPerPage * 5, sortedStickers.length)} of{" "}
              {sortedStickers.length} total stickers
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {preferences.favoriteItems.length} favorites selected
            </p>
          </div>
        </>
      )}
    </div>
  );
}
