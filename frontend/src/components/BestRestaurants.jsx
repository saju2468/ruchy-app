import Button from "./Button";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import { Link } from "react-router";
import useRestaurants from "../utilities/useRestaurants";
import NoRestaurantsFound from "./NoRestaurantsFound";
import userContext from "../utilities/userContext";
import { useContext } from "react";

const BestRestaurants = () => {
  const {
    listOfRestaurants,
    filteredRestaurants,
    searchText,
    setSearchText,
    isTopRated,
    handleFilter,
    resetFilters,
  } = useRestaurants();

  const { loggedInUser, setUserName } = useContext(userContext);

  return (
    <div className="py-24">
      <h2 className="text-3xl font-bold text-black mb-3">
        Top restaurant chains in Bangalore
      </h2>
      <p className="text-md text-black/60 font-normal mb-10">
        Discover the Most loved Restaurants Near You.
      </p>

      <div className="search_wrapper mb-5 max-w-md w-full">
        <SearchBar
          onChange={(e) => setUserName(e.target.value)}
          searchText={loggedInUser}
          placeholder={"Set your name...."}
        />
      </div>

      <div className="wrapper flex justify-between items-start gap-14">
        <div className="filter_btn mb-10">
          <Button children={"Filter"} onClick={handleFilter} />
        </div>

        <div className="search_wrapper w-full md:max-w-xs">
          <SearchBar
            searchText={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={"Search restaurants...."}
          />
        </div>
      </div>

      {listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : filteredRestaurants.length === 0 ? (
        <NoRestaurantsFound
          searchText={searchText}
          isTopRated={isTopRated}
          onReset={resetFilters}
        />
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
