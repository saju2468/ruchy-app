const Button = ({ onClick, children }) => {
  return (
    <>
      <button
        className="filter-btn rounded-lg text-sm font-semibold px-4 py-2 bg-orange-600 text-white cursor-pointer"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
