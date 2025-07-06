import { createFileRoute } from "@tanstack/react-router";
import createCratesQueryOptions from "../queryOptions/createCratesQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Crates } from "../types";

export const Route = createFileRoute("/crates")({
  component: RouteComponent,
});

function RouteComponent() {
  const cratesQuery = useSuspenseQuery(createCratesQueryOptions());

  if (cratesQuery.error) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">
          Error loading crates: {cratesQuery.error.message}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleCrateClick = (crate: Crates) => {
    console.log("Selected crate:", crate.name);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cases
        </h2>
      </div>

      {cratesQuery.isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(cratesQuery.data as Crates[]).map((crate) => (
              <div
                key={crate.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer"
                onClick={() => handleCrateClick(crate)}
              >
                <img
                  src={crate.image}
                  alt={crate.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {crate.name}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
