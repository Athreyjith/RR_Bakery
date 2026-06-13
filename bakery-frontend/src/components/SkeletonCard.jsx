export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="skeleton aspect-[4/3] w-full"></div>
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-16 rounded-full"></div>
        <div className="skeleton h-5 w-3/4 rounded-lg"></div>
        <div className="skeleton h-3 w-full rounded-lg"></div>
        <div className="skeleton h-3 w-2/3 rounded-lg"></div>
        <div className="flex justify-between items-center mt-3">
          <div className="skeleton h-6 w-16 rounded-lg"></div>
          <div className="skeleton h-8 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
