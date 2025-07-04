import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SkinItem from "../components/Item";
import createSkinsQueryOptions from "../queryOptions/createSkinsQueryOptions";
import { useUserPreferences } from "../hooks/useUserPreferences";
import type { Skin } from "../types";

export const Route = createFileRoute("/skins")({
  component: SkinsPage,
});

function SkinsPage() {
  const skinsQuery = useSuspenseQuery(createSkinsQueryOptions());
  const { preferences, updatePreferences } = useUserPreferences();
  const [sortBy, setSortBy] = useState<"name" | "weapon">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedWeapon, setSelectedWeapon] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);

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
  };

  const sortedSkins = [...(skinsQuery.data as Skin[])]
    .filter(
      (skin) => selectedWeapon === "all" || skin.weapon.name === selectedWeapon
    )
    .filter(
      (skin) =>
        selectedCategory === "all" || skin.category.name === selectedCategory
    )
    .sort((a, b) => {
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

  const sortWeapons = [
    ...new Set(skinsQuery.data?.map((skin: Skin) => skin.weapon.name) || []),
  ];

  const sortCategories = [
    ...new Set(skinsQuery.data?.map((skin: Skin) => skin.category.name) || []),
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Weapon Skins Collection
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Main Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            {sortCategories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>

          {/* More Filters Button */}
          <button
            onClick={() => setShowMoreFilters(true)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
          >
            More Filters
          </button>

          {/* Items Per Page - Always Visible on Far Right */}
          <select
            value={preferences.itemsPerPage}
            onChange={(e) => {
              updatePreferences({ itemsPerPage: parseInt(e.target.value) });
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white ml-auto"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>

        {/* More Filters Modal */}
        {showMoreFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  More Filters
                </h3>
                <button
                  onClick={() => setShowMoreFilters(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Weapon Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weapon
                  </label>
                  <select
                    value={selectedWeapon}
                    onChange={(e) => setSelectedWeapon(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Weapons</option>
                    {sortWeapons.map((weaponName) => (
                      <option key={weaponName} value={weaponName}>
                        {weaponName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "name" | "weapon")
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="weapon">Sort by Weapon</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort Order
                  </label>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2"
                  >
                    {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMoreFilters(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setSelectedWeapon("all");
                    setSortBy("name");
                    setSortOrder("asc");
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {skinsQuery.isPending ? (
        <LoadingSpinner size="large" className="mt-8" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSkins
              .slice(0, preferences.itemsPerPage)
              .map((skin: Skin, index: number) => (
                <div key={`${skin.weapon.id}-${index}`} className="relative">
                  <SkinItem
                    skin={skin}
                    size="large"
                    onClick={handleSkinClick}
                    className={"hover:shadow-2xl transition-all duration-200 "}
                  />
                </div>
              ))}
          </div>

          {/* Show total count */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showing {Math.min(preferences.itemsPerPage, sortedSkins.length)}{" "}
              of {sortedSkins.length} total skins
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
