import { Star, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import { RestaurantCardImage } from "../utilities/constants";

const RestaurantDetails = () => {
  // eslint-disable-next-line no-unused-vars
  const { resId } = useParams();
  const location = useLocation();

  const restaurant = location.state?.restaurant;

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
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to all restaurants</span>
          </Link>
        </div>

        {/* Restaurant Header Card */}
        <div className="restaurant_wrapper bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                  <span>
                    {restaurant.areaName || restaurant.locality}
                  </span>
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
      </div>
    </div>
  );
};

export default RestaurantDetails;
