import { useEffect, useState } from "react";
import { SWIGGY_MENU_API } from "./constants";

const useRestaurantDetails = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${SWIGGY_MENU_API}${resId}`);
        const json = await data.json();
        setResInfo(json.data);
      } catch (error) {
        console.error("Failed to fetch restaurant details:", error);
      }
    };

    if (resId) {
      fetchData();
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantDetails;
