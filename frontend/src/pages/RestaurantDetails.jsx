import { useState } from "react";
import { Star, Clock, MapPin, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import { RestaurantCardImage } from "../utilities/constants";
import useRestaurantDetails from "../utilities/useRestaurantDetails";
import RestaurantCategory from "../components/RestaurantCategory";

const RestaurantDetails = () => {
  const { resId } = useParams();
  const location = useLocation();

  const { resInfo, isLoading, error, isUsingFallback, refetch } =
    useRestaurantDetails(resId);

  // Fallback to API restaurant data if navigated directly or page refreshed
  const restaurantFromState = location.state?.restaurant;
  const restaurantFromApi = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  )?.card?.card?.info;
  const restaurant = restaurantFromState || restaurantFromApi;

  // Extract menu categories from Swiggy's groupedCard structure
  const regularCards = resInfo?.cards?.find(
    (c) => c?.groupedCard
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = regularCards?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      (c?.card?.card?.title && Array.isArray(c?.card?.card?.itemCards))
  );

  // Default to Recommended category if found, else default to the first category (0)
  const recommendedIndex = categories?.findIndex((category) =>
    category?.card?.card?.title?.toLowerCase().includes("recommended")
  );
  const defaultIndex =
    recommendedIndex !== -1 && recommendedIndex !== undefined
      ? recommendedIndex
      : 0;

  // Manage open accordion state: null uses defaultIndex; number represents explicit open index, -1 represents all collapsed
  const [openIndex, setOpenIndex] = useState(null);
  const activeIndex = openIndex !== null ? openIndex : defaultIndex;

  // Loading state if initial data is not yet available
  if (!restaurant && isLoading) {
    return (
      <div className="restaurant_detailpage py-12">
        <div className="container">
          <div className="animate-pulse space-y-6 max-w-5xl mx-auto">
            <div className="h-6 w-36 bg-gray-200 rounded-md"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
            <div className="h-10 w-44 bg-gray-200 rounded-md mt-10"></div>
            <div className="h-20 bg-gray-200 rounded-2xl"></div>
            <div className="h-20 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Not found / error state
  if (!restaurant) {
    return (
      <div className="restaurant_detailpage py-20">
        <div className="container">
          <div className="max-w-xl mx-auto text-center bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Restaurant data is unavailable
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please go back and select a restaurant.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Restaurants</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant_detailpage py-12">
      <div className="container">
        {/* Back Link */}
        <div className="mb-6 max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to all restaurants</span>
          </Link>
        </div>

        {/* Restaurant Header Card (kept unchanged) */}
        <div className="restaurant_wrapper max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Image */}
            <div className="md:w-1/3 w-full max-h-72 md:max-h-none overflow-hidden bg-gray-50 flex items-center justify-center">
              {restaurant.cloudinaryImageId ? (
                <img
                  className="w-full h-full object-cover min-h-[240px]"
                  src={`${RestaurantCardImage}${restaurant.cloudinaryImageId}`}
                  alt={restaurant.name}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Restaurant Info */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {restaurant.name}
                </h1>

                {/* Cuisines */}
                <p className="text-sm md:text-base text-gray-500 font-medium mb-3">
                  {restaurant.cuisines?.join(", ")}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4">
                  <MapPin size={16} className="text-gray-500 shrink-0" />
                  <span>{restaurant.areaName || restaurant.locality}</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6 text-sm">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-green-700 text-white rounded-md font-semibold text-xs">
                    <Star size={12} fill="white" color="white" />
                    <span>{restaurant.avgRating || "--"}</span>
                  </div>
                  {restaurant.totalRatingsString && (
                    <span className="text-gray-500 font-medium">
                      ({restaurant.totalRatingsString} ratings)
                    </span>
                  )}
                </div>

                <span className="text-gray-300">•</span>

                {/* Delivery Time */}
                {restaurant.sla?.slaString && (
                  <>
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <Clock size={16} className="text-gray-500" />
                      <span>{restaurant.sla.slaString}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                  </>
                )}

                {/* Cost for two */}
                {restaurant.costForTwo && (
                  <div className="font-semibold text-gray-800">
                    {restaurant.costForTwo}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Accordions Section */}
        <div className="menu_section max-w-5xl mx-auto mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Menu
            </h2>
            {categories?.length > 0 && (
              <span className="text-xs sm:text-sm font-medium text-gray-500">
                {categories.length} {categories.length === 1 ? "category" : "categories"}
              </span>
            )}
          </div>

          {/* Notice banner when using fallback data due to CORS / Swiggy 202 block */}
          {isUsingFallback && (
            <div className="mb-6 p-4 bg-orange-50/80 border border-orange-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-orange-900 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong className="font-semibold">Demo Menu Active:</strong> Swiggy&apos;s live menu API returned an empty response on localhost (CORS / anti-bot protection). Displaying demo menu data so you can test and view the accordions.
                </p>
              </div>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                <span>Retry Live API</span>
              </button>
            </div>
          )}

          {isLoading ? (
            /* Loading Shimmer Placeholders */
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-44 bg-gray-200 rounded-md"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error && !resInfo ? (
            /* Error state if fetch failed and no fallback available */
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-xs text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Failed to load menu
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-5">
                {error}
              </p>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium text-sm transition-colors cursor-pointer"
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>
            </div>
          ) : categories && categories.length > 0 ? (
            /* Category Accordions */
            <div className="space-y-4">
              {categories.map((category, index) => (
                <RestaurantCategory
                  key={category?.card?.card?.title || index}
                  categoryData={category?.card?.card}
                  isOpen={activeIndex === index}
                  onToggle={() =>
                    setOpenIndex(activeIndex === index ? -1 : index)
                  }
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-xs text-center">
              <p className="text-base font-medium text-gray-600 mb-1">
                No menu categories found
              </p>
              <p className="text-sm text-gray-400">
                The menu items for this restaurant are currently unavailable.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
