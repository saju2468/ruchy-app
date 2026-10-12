import { SearchIcon } from "./icons";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <>
      <div className="relative ">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search restaurants, cuisines..."
          className="w-full pl-10 pr-4 py-2 text-sm font-medium bg-gray-50 border border-gray-200 hover:border-orange-500 rounded-full focus:outline-none  transition-all duration-200"
        />
        <SearchIcon className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
      </div>
    </>
  );
};

export default SearchBar;
