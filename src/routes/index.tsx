import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to Counter Strike Collection!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Explore Counter-Strike skins and stickers from the community
        marketplace.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          to="/skins"
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-200 hover:scale-105"
        >
          <div className="text-4xl mb-4">🔫</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Weapon Skins
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Browse beautiful weapon skins with detailed float ranges and
            information.
          </p>
        </Link>

        <Link
          to="/stickers"
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-200 hover:scale-105"
        >
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Stickers
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Discover unique stickers with rarity information and pricing.
          </p>
        </Link>
      </div>
    </div>
  );
}
