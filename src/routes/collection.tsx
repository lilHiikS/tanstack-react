import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Collection from "../components/Collection";
import { useUserPreferences } from "../hooks/useUserPreferences";
import type { Collection as CollectionType } from "../types";
import createCollectionQueryOptions from "../queryOptions/createCollectionQueryOptions";

export const Route = createFileRoute("/collection")({
  component: CollectionPage,
});

function CollectionPage() {
  const collectionsQuery = useSuspenseQuery(createCollectionQueryOptions());
  const { preferences } = useUserPreferences();
  const [sortBy, setSortBy] = useState<"name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (collectionsQuery.error) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">
          Error loading collections: {collectionsQuery.error.message}
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

  const handleCollectionClick = (collection: CollectionType) => {
    console.log("Selected collection:", collection.name);
  };

  const sortedCollections = [
    ...(collectionsQuery.data as CollectionType[]),
  ].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "desc" ? -comparison : comparison;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Collections
        </h2>

        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name")}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="name">Sort by Name</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {collectionsQuery.isPending ? (
        <LoadingSpinner size="large" className="mt-8" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCollections
              .slice(0, preferences.itemsPerPage)
              .map((collection: CollectionType, index: number) => (
                <div key={`${collection.id}-${index}`} className="relative">
                  <Collection
                    collection={collection}
                    size="medium"
                    onClick={handleCollectionClick}
                    className={`hover:shadow-2xl transition-all duration-200`}
                  />
                </div>
              ))}
          </div>

          {/* Show total count */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showing{" "}
              {Math.min(preferences.itemsPerPage, sortedCollections.length)} of{" "}
              {sortedCollections.length} total collections
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
