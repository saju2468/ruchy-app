import { Clock, MapPin, Star } from "lucide-react";
import { RestaurantCardImage } from "../utilities/constants";

const RestaurantCard = (props) => {
  const { resCardData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId, sla, areaName } =
    resCardData;

  return (
    <>
      <div className="restaurant_card bg-white shadow-lg rounded-b-xl hover:shadow-2xl transition-all duration-200 ease-in-out cursor-pointer ">
        <div className="restaurant_image  overflow-hidden">
          <img
            className="w-full h-auto object-cover aspect-4/2.5 rounded-t-xl"
            src={RestaurantCardImage + cloudinaryImageId}
            alt={name}
          />
        </div>
        <div className="restaurant_details p-4.5 flex flex-col justify-between ">
          <div className="wrapper">
            <h3 className="font-semibold text-black text-lg">{name}</h3>
            <h4 className="text-sm text-black/60 font-medium mt-0.5">
              {cuisines.join(", ")}
            </h4>
            <div className="location flex gap-1.5 items-center mt-1.5">
              <MapPin size={16} color="#000000" />
              <h5 className="text-sm font-medium text-black/70 ">{areaName}</h5>
            </div>
          </div>

          <div className="rating_time flex justify-between items-end mt-5">
            <div className="rating flex gap-2.5 items-center">
              <Star fill="#ecc432" color="#ecc432" />
              <span className="text-sm text-black font-medium mt-1">
                {avgRating}
              </span>
            </div>
            <div className="delivery_time text-sm text-black font-medium flex gap-2 items-center">
              <Clock size={16} color="#000000" />
              {sla?.slaString}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
