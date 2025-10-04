export function NewsSkeletonCard() {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#132257] animate-pulse">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded ml-2"></div>
        </div>

        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </article>
  );
}

export function MatchSkeletonCard() {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-[#132257] animate-pulse">
      <div className="bg-gray-200 p-4 h-32"></div>
      <div className="p-6">
        <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="p-3 bg-gray-100 rounded-lg">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
