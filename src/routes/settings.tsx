import { createFileRoute } from "@tanstack/react-router";
import { useUserPreferences } from "../hooks/useUserPreferences";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { preferences, updatePreferences } = useUserPreferences();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Theme
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={preferences.theme === "light"}
                  onChange={(e) =>
                    updatePreferences({
                      theme: e.target.value as "light" | "dark" | "auto",
                    })
                  }
                  className="mr-2"
                />
                Light
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={preferences.theme === "dark"}
                  onChange={(e) =>
                    updatePreferences({
                      theme: e.target.value as "light" | "dark" | "auto",
                    })
                  }
                  className="mr-2"
                />
                Dark
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="auto"
                  checked={preferences.theme === "auto"}
                  onChange={(e) =>
                    updatePreferences({
                      theme: e.target.value as "light" | "dark" | "auto",
                    })
                  }
                  className="mr-2"
                />
                Auto
              </label>
            </div>
          </div>

          {/* Items per page */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Items per page
            </h3>
            <select
              value={preferences.itemsPerPage}
              onChange={(e) =>
                updatePreferences({ itemsPerPage: parseInt(e.target.value) })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Sort preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Default Sort
            </h3>
            <div className="flex gap-4">
              <select
                value={preferences.sortBy}
                onChange={(e) =>
                  updatePreferences({
                    sortBy: e.target.value as "name" | "rarity" | "price",
                  })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="name">Name</option>
                <option value="rarity">Rarity</option>
                <option value="price">Price</option>
              </select>
              <select
                value={preferences.sortOrder}
                onChange={(e) =>
                  updatePreferences({
                    sortOrder: e.target.value as "asc" | "desc",
                  })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Favorites count */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Favorites
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You have {preferences.favoriteItems.length} favorite items
            </p>
            {preferences.favoriteItems.length > 0 && (
              <button
                onClick={() => updatePreferences({ favoriteItems: [] })}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear All Favorites
              </button>
            )}
          </div>

          {/* Reset settings */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() =>
                updatePreferences({
                  theme: "auto",
                  itemsPerPage: 20,
                  favoriteItems: [],
                  sortBy: "name",
                  sortOrder: "asc",
                })
              }
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
