import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SkinItem from "../components/Item";
import createSkinsQueryOptions from "../queryOptions/createSkinsQueryOptions";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import type { Skin } from "../types";

export const Route = createFileRoute("/skins-new")({
  component: SkinsPage,
});

function SkinsPage() {
  const skinsQuery = useSuspenseQuery(createSkinsQueryOptions());
  const { preferences, updatePreferences, toggleFavorite, isFavorite } =
    useUserPreferences();
  const [sortBy, setSortBy] = useState<"name" | "weapon">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (skinsQuery.error) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">
          Error loading skins: {skinsQuery.error.message}
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

  const handleSkinClick = (skin: Skin) => {
    console.log("Selected skin:", skin.name);
    // Toggle favorite when clicking on a skin
    toggleFavorite(skin.id);
  };

  // Sort skins based on preferences
  const sortedSkins = [...(skinsQuery.data as Skin[])].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "weapon":
        comparison = a.weapon.name.localeCompare(b.weapon.name);
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
          Weapon Skins Collection
        </h2>

        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "weapon")}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="weapon">Sort by Weapon</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {skinsQuery.isPending ? (
        <LoadingSpinner size="large" className="mt-8" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSkins
              .slice(0, preferences.itemsPerPage * 10) // Show 10 pages worth
              .map((skin: Skin, index: number) => (
                <div key={`${skin.weapon.id}-${index}`} className="relative">
                  <SkinItem
                    skin={skin}
                    size="medium"
                    onClick={handleSkinClick}
                    className={`hover:shadow-2xl transition-all duration-200 ${
                      isFavorite(skin.id) ? "ring-2 ring-yellow-400" : ""
                    }`}
                  />
                  {/* Favorite indicator */}
                  {isFavorite(skin.id) && (
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
              {Math.min(preferences.itemsPerPage * 10, sortedSkins.length)} of{" "}
              {sortedSkins.length} total skins
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
