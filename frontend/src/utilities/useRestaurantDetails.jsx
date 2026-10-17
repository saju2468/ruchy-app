import { useEffect, useState, useCallback } from "react";
import { SWIGGY_MENU_API } from "./constants";
import { mockMenuData } from "./mockMenuData";

const useRestaurantDetails = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setReloadCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        const url = `${SWIGGY_MENU_API}${resId}&catalog_qa=undefined&submitAction=ENTER`;
        const response = await fetch(url);
        const text = await response.text();

        // If Swiggy returns an empty body (e.g. status 202 bot challenge / CORS issue)
        if (!text || text.trim().length === 0) {
          throw new Error(
            `Empty response received from Swiggy menu API (HTTP ${response.status}).`,
          );
        }

        const json = JSON.parse(text);
        if (isMounted) {
          if (json?.data) {
            setResInfo(json.data);
            setIsUsingFallback(false);
          } else {
            throw new Error("No data property found in Swiggy menu response");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn(
            "Live Swiggy Menu API error. Using realistic fallback menu data:",
            err.message,
          );
          setError(err.message);
          // Fallback to mock data so accordions and menu items always render reliably
          setResInfo(mockMenuData);
          setIsUsingFallback(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (resId) {
      fetchMenu();
    }

    return () => {
      isMounted = false;
    };
  }, [resId, reloadCount]);

  return { resInfo, isLoading, error, isUsingFallback, refetch };
};

export default useRestaurantDetails;
