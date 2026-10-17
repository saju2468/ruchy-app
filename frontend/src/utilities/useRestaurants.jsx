import { useEffect, useState } from "react";
import { SWIGGY_RESTAURANTS_API } from "./constants";

const useRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(SWIGGY_RESTAURANTS_API);
        const json = await data.json();
        const resCard = json?.data?.cards?.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        );
        const resData =
          resCard?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
            (restaurant) => restaurant.info,
          ) ||
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
            (restaurant) => restaurant.info,
          );
        setListOfRestaurants(resData || []);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    setIsTopRated((prev) => !prev);
  };

  const resetFilters = () => {
    setSearchText("");
    setIsTopRated(false);
  };

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

  return {
    listOfRestaurants,
    filteredRestaurants,
    searchText,
    setSearchText,
    isTopRated,
    setIsTopRated,
    handleFilter,
    resetFilters,
  };
};

export default useRestaurants;
