import { RestaurantCardImage } from "../utilities/constants";

const ItemList = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 italic">
        No items available in this category.
      </p>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => {
        const itemInfo = item?.card?.info;
        if (!itemInfo) return null;

        const isVeg =
          itemInfo.isVeg === 1 ||
          itemInfo.itemAttribute?.vegClassifier === "VEG";

        const rawPrice = itemInfo.price ?? itemInfo.defaultPrice;
        const formattedPrice = rawPrice
          ? `₹${Math.round(rawPrice / 100)}`
          : "₹--";

        return (
          <div
            key={itemInfo.id}
            className="py-6 flex flex-col sm:flex-row justify-between items-start gap-4 transition-colors"
          >
            {/* Left: Food details */}
            <div className="flex-1 pr-0 sm:pr-6">
              {/* Veg / Non-veg indicator */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-4 h-4 rounded-xs border flex items-center justify-center p-0.5 ${
                    isVeg ? "border-green-600" : "border-red-600"
                  }`}
                  title={isVeg ? "Pure Veg" : "Non-Veg"}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isVeg ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></span>
                </div>
                {itemInfo.ribbon?.text && (
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                    {itemInfo.ribbon.text}
                  </span>
                )}
              </div>

              {/* Food Name */}
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 leading-snug">
                {itemInfo.name}
              </h3>

              {/* Price */}
              <p className="font-semibold text-sm sm:text-base text-gray-700 mt-1">
                {formattedPrice}
              </p>

              {/* Description */}
              {itemInfo.description && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {itemInfo.description}
                </p>
              )}
            </div>

            {/* Right: Food Image & Add button */}
            <div className="w-full sm:w-36 flex sm:flex-col items-center justify-end shrink-0 self-center sm:self-auto mt-2 sm:mt-0">
              <div className="relative flex flex-col items-center">
                {itemInfo.imageId ? (
                  <div className="w-32 h-24 sm:w-36 sm:h-28 rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-gray-50 mb-3">
                    <img
                      src={`${RestaurantCardImage}${itemInfo.imageId}`}
                      alt={itemInfo.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="hidden sm:block w-36 h-8"></div>
                )}

                {/* ADD Button */}
                <button
                  type="button"
                  className={`${
                    itemInfo.imageId
                      ? "absolute -bottom-2 left-1/2 -translate-x-1/2"
                      : "relative"
                  } bg-white hover:bg-orange-50 text-green-600 hover:text-green-700 font-bold text-xs sm:text-sm px-6 py-2 rounded-xl shadow-md border border-gray-200 uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer`}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
