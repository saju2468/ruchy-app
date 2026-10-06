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
        <svg
          className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </>
  );
};

export default SearchBar;
