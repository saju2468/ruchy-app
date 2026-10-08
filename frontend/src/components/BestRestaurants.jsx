import Button from "./Button";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import { Link } from "react-router";
import { RotateCcw } from "lucide-react";

const BestRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);

  console.log(searchText);

  const handleFilter = () => {
    setIsTopRated((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9338752&lng=77.6301732&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      );

      const json = await data.json();
      const resData =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
          (restaurant) => restaurant.info,
        );
      console.log(resData.map((restaurant) => restaurant.name));
      setListOfRestaurants(resData);
    };
    fetchData();
  }, []);

  const filteredRestaurants = listOfRestaurants
    .filter((restaurant) => {
      if (isTopRated) {
        return restaurant.avgRating > 4.3;
      }

      return true;
    })
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <div className="py-24">
      <h2 className="text-3xl font-bold text-black mb-3">
        Top restaurant chains in Bangalore
      </h2>
      <p className="text-md text-black/60 font-normal mb-10">
        Discover the Most loved Restaurants Near You.
      </p>

      <div className="wrapper flex justify-between items-start gap-14">
        <div className="filter_btn mb-10">
          <Button children={"Filter"} onClick={handleFilter} />
        </div>

        <div className="search_wrapper w-full md:max-w-xs">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>

      {listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : filteredRestaurants.length === 0 ? (
        <div className="empty_state flex flex-col items-center justify-center text-center py-16 px-4 bg-orange-50/40 rounded-2xl border border-orange-100 max-w-2xl mx-auto my-8">
          {/* Vector Illustration */}
          <svg
            className="w-44 h-44 mb-4 text-orange-500 drop-shadow-sm"
            viewBox="0 0 240 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="120" cy="165" rx="80" ry="14" fill="#f1f5f9" />

            {/* Empty Dining Plate */}
            <ellipse
              cx="120"
              cy="140"
              rx="72"
              ry="22"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="3"
            />
            <ellipse
              cx="120"
              cy="140"
              rx="52"
              ry="15"
              fill="#fafafa"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Food Cloche / Dome */}
            <path
              d="M72 128 C72 82, 168 82, 168 128 Z"
              fill="#fff7ed"
              stroke="#fb923c"
              strokeWidth="3"
            />
            <circle
              cx="120"
              cy="80"
              r="7"
              fill="#f97316"
              stroke="#ea580c"
              strokeWidth="2.5"
            />

            {/* Aroma / Empty wisps */}
            <path
              d="M102 66 Q96 52 103 40"
              stroke="#fdba74"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M120 62 Q125 48 119 36"
              stroke="#fdba74"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M138 66 Q144 52 137 40"
              stroke="#fdba74"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Magnifying Glass with Not Found mark */}
            <g transform="translate(138, 70)">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="3.5"
              />
              <line
                x1="44"
                y1="44"
                x2="62"
                y2="62"
                stroke="#ea580c"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M21 21 L35 35 M35 21 L21 35"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Cutlery */}
            <path
              d="M46 116 L46 150 M40 116 L52 116"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M194 116 L194 150 M188 122 C188 116 200 116 200 122 Z"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

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

          {(searchText || isTopRated) && (
            <button
              onClick={() => {
                setSearchText("");
                setIsTopRated(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-md hover:shadow-lg"
            >
              <RotateCcw size={16} />
              <span>Reset Search & Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 ">
          {filteredRestaurants.map((restaurantList) => (
            <Link
              key={restaurantList.id}
              to={`/restaurant/${restaurantList.id}`}
              state={{ restaurant: restaurantList }}
            >
              <RestaurantCard resCardData={restaurantList} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestRestaurants;
