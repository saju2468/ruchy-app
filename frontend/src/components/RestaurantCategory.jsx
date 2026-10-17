import { ChevronDown } from "lucide-react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ categoryData, isOpen, onToggle }) => {
  const title = categoryData?.title;
  const itemCards = categoryData?.itemCards;

  if (!title || !itemCards || itemCards.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden transition-all duration-200 hover:border-gray-200">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-white hover:bg-gray-50/70 transition-colors cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-base sm:text-lg text-gray-800 tracking-tight">
          {title} ({itemCards.length})
        </span>

        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-colors">
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-orange-600" : ""
            }`}
          />
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-gray-100">
          <ItemList items={itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
