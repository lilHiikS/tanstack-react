import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Counter Strike Collection
          </h1>

          {/* Navigation */}
          <div className="flex justify-center mb-20">
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
              <Link
                to="/"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/skins"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Skins
              </Link>
              <Link
                to="/stickers"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Stickers
              </Link>
              <Link
                to="/collection"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Collections
              </Link>
              <Link
                to="/crates"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cases
              </Link>
              <Link
                to="/settings"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 [&.active]:bg-blue-500 [&.active]:text-white text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                About
              </Link>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
