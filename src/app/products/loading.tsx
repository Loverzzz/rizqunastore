export default function ProductsLoading() {
  return (
    <div className="py-12 bg-[#FDF6EF] min-h-screen dark:bg-[#1A0800]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="h-10 w-64 bg-[#F0D5C8] dark:bg-brand-900/40 rounded-xl animate-pulse mb-4" />
            <div className="h-4 w-96 bg-[#F0D5C8] dark:bg-brand-900/40 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Search bar skeleton */}
        <div className="h-12 w-full bg-[#F0D5C8] dark:bg-brand-900/40 rounded-xl animate-pulse mb-6" />

        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 bg-[#F0D5C8] dark:bg-brand-900/40 rounded-full animate-pulse flex-shrink-0"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Sort bar skeleton */}
        <div className="flex justify-between mb-8 pb-4 border-b border-[#F0D5C8]/40 dark:border-brand-900/20">
          <div className="h-4 w-32 bg-[#F0D5C8] dark:bg-brand-900/40 rounded animate-pulse" />
          <div className="h-8 w-36 bg-[#F0D5C8] dark:bg-brand-900/40 rounded-lg animate-pulse" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#2D1506] rounded-2xl overflow-hidden shadow-sm border border-[#F0D5C8] dark:border-brand-900/40 flex flex-col"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Image skeleton */}
              <div className="aspect-square bg-[#F0D5C8] dark:bg-brand-900/40 animate-pulse" />
              {/* Content skeleton */}
              <div className="p-6 flex flex-col gap-3">
                <div className="h-5 w-3/4 bg-[#F0D5C8] dark:bg-brand-900/40 rounded animate-pulse" />
                <div className="h-4 w-full bg-[#F0D5C8] dark:bg-brand-900/40 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-[#F0D5C8] dark:bg-brand-900/40 rounded animate-pulse" />
                <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#F0D5C8] dark:border-brand-900/30">
                  <div className="h-6 w-24 bg-[#F0D5C8] dark:bg-brand-900/40 rounded animate-pulse" />
                  <div className="h-10 w-10 bg-[#F0D5C8] dark:bg-brand-900/40 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
