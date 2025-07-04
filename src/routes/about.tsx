import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        About CS Collection
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What is CS Collection?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              CS Collection is a comprehensive showcase of Counter-Strike weapon
              skins and stickers. Browse through hundreds of items with detailed
              information about float ranges, rarities, and pricing from the
              community marketplace.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Browse weapon skins with detailed float range information
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Explore stickers with rarity and pricing details
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Modern, responsive design with dark mode support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Fast loading with React Query caching
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  React
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  UI Framework
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  TanStack Router
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Routing
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  TanStack Query
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Data Fetching
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  Tailwind CSS
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Styling
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Data Source
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All skin and sticker data is sourced from the{" "}
              <a
                href="https://github.com/ByMykel/CSGO-API"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                CSGO-API
              </a>{" "}
              project by ByMykel, providing accurate and up-to-date information
              about Counter-Strike items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
