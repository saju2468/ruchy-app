import { RotateCcw } from "lucide-react";
import { EmptyPlateIllustration } from "./icons";

const NoRestaurantsFound = ({
  searchText = "",
  isTopRated = false,
  onReset,
}) => {
  return (
    <div className="empty_state flex flex-col items-center justify-center text-center py-16 px-4 bg-orange-50/40 rounded-2xl border border-orange-100 max-w-2xl mx-auto my-8">
      {/* Vector Illustration */}
      <EmptyPlateIllustration />

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No Restaurants Found
      </h3>

      <p className="text-sm md:text-base text-gray-600 max-w-md mb-6">
        {searchText ? (
          <>
            We couldn&apos;t find any restaurant matching{" "}
            <span className="font-semibold text-orange-600">
              &ldquo;{searchText}&rdquo;
            </span>
            . Try checking for typos or searching for a different cuisine.
          </>
        ) : (
          "No restaurants meet the current filter criteria. Try resetting your filters."
        )}
      </p>

      {(searchText || isTopRated) && onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-md hover:shadow-lg"
        >
          <RotateCcw size={16} />
          <span>Reset Search & Filters</span>
        </button>
      )}
    </div>
  );
};

export default NoRestaurantsFound;
