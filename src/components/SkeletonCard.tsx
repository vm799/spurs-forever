export function NewsSkeletonCard() {
  return (
    <article className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl overflow-hidden border border-[#1a2942] animate-pulse">
      <div className="p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-4 bg-[#1a2942] rounded"></div>
          <div className="h-4 w-24 bg-[#1a2942] rounded"></div>
          <div className="h-4 w-32 bg-[#1a2942] rounded ml-2"></div>
        </div>

        <div className="h-6 bg-[#1a2942] rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-[#1a2942] rounded w-1/2 mb-5"></div>

        <div className="space-y-2 mb-5">
          <div className="h-4 bg-[#1a2942] rounded w-full"></div>
          <div className="h-4 bg-[#1a2942] rounded w-5/6"></div>
          <div className="h-4 bg-[#1a2942] rounded w-4/6"></div>
        </div>

        <div className="h-4 w-32 bg-[#1a2942] rounded"></div>
      </div>
    </article>
  );
}

export function MatchSkeletonCard() {
  return (
    <article className="bg-gradient-to-br from-[#0f1624] to-[#0c1420] rounded-2xl shadow-2xl overflow-hidden border border-[#1a2942] animate-pulse">
      <div className="bg-[#0c1420] p-4 sm:p-5 h-32 border-b border-[#1a2942]"></div>
      <div className="p-5 sm:p-6">
        <div className="h-5 w-24 bg-[#1a2942] rounded mb-5"></div>
        <div className="space-y-3">
          <div className="p-4 bg-[#0c1420] rounded-xl border border-[#1a2942]">
            <div className="h-4 w-32 bg-[#1a2942] rounded mb-2"></div>
            <div className="h-3 w-16 bg-[#1a2942] rounded"></div>
          </div>
          <div className="p-4 bg-[#0c1420] rounded-xl border border-[#1a2942]">
            <div className="h-4 w-40 bg-[#1a2942] rounded mb-2"></div>
            <div className="h-3 w-16 bg-[#1a2942] rounded"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
