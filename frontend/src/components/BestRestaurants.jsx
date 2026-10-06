import Button from "./Button";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import { Link } from "react-router";

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
        <div>
          <h2>No restaurants found matching your search</h2>
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
