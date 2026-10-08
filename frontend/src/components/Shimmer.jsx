const ShimmerCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col justify-between border border-gray-100">
      {/* Restaurant Image Placeholder */}
      <div className="w-full aspect-4/2.5 shimmer-shine rounded-t-xl" />

      {/* Restaurant Details Placeholder */}
      <div className="p-4.5 flex flex-col justify-between flex-1">
        <div className="space-y-3">
          {/* Name */}
          <div className="h-5 w-3/4 rounded-md shimmer-shine" />
          {/* Cuisines */}
          <div className="h-4 w-1/2 rounded-md shimmer-shine" />
          {/* Location */}
          <div className="h-3.5 w-1/3 rounded-md shimmer-shine" />
        </div>

        {/* Rating & SLA delivery time */}
        <div className="flex justify-between items-end mt-6 pt-2">
          <div className="h-4 w-12 rounded-md shimmer-shine" />
          <div className="h-4 w-20 rounded-md shimmer-shine" />
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer_container grid grid-cols-4 gap-5">
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  );
};

export default Shimmer;
