const ExperienceCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-lg bg-[#f0f0f0] shadow-md">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2 p-4">
        {/* Row 1: Title and Location */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-1/2 rounded bg-gray-200" />
          <div className="h-5 w-1/4 rounded-full bg-gray-200" />
        </div>

        {/* Row 2: Description */}
        <div className="mt-1 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>

        {/* Row 3: Price and Button */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-6 w-1/3 rounded bg-gray-200" />
          <div className="h-10 w-1/3 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardSkeleton;
