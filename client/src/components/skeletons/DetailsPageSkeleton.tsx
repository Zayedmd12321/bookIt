import { FaArrowLeft } from 'react-icons/fa';

/**
 * A skeleton loader that perfectly mimics the DetailsPage layout.
 */
const DetailsPageSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-6 md:px-8 md:py-10">
      {/* Back Link Skeleton */}
      <div className="mb-6 inline-flex items-center gap-2">
        <FaArrowLeft className="text-gray-300" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Left Section Skeleton */}
        <div className="md:col-span-2">
          <div className="mb-6 w-full rounded-xl bg-gray-200 md:h-[420px] h-[250px]" />
          <div className="mb-3 h-8 w-3/4 rounded bg-gray-200" />
          <div className="mb-8 h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />

          {/* Date Picker Skeleton */}
          <div className="mb-3 mt-8 h-5 w-32 rounded bg-gray-200" />
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="h-10 w-20 rounded-lg bg-gray-200" />
            <div className="h-10 w-20 rounded-lg bg-gray-200" />
            <div className="h-10 w-20 rounded-lg bg-gray-200" />
          </div>

          {/* Time Picker Skeleton */}
          <div className="mb-2 h-5 w-32 rounded bg-gray-200" />
          <div className="mb-4 h-3 w-40 rounded bg-gray-200" />
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
          </div>

          {/* About Skeleton */}
          <div className="mb-3 mt-10 h-5 w-24 rounded bg-gray-200" />
          <div className="h-24 w-full rounded-lg bg-gray-100 p-5" />
        </div>

        {/* Price Card Skeleton */}
        <div className="md:col-span-1">
          <div className="sticky top-28 h-96 rounded-xl bg-[#EFEFEF] p-6" />
        </div>
      </div>
    </div>
  );
};

export default DetailsPageSkeleton;