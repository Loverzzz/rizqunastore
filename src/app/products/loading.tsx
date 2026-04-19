export default function ProductsLoading() {
  return (
    <div className="py-12 bg-[#FDF6EF] min-h-screen dark:bg-[#1A0800]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded-lg animate-pulse mb-4" />
          <div className="h-5 w-96 bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded-lg animate-pulse" />
        </div>
          <div className="h-12 w-full bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded-xl animate-pulse mb-6" />
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded-full animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#2D1506] rounded-2xl overflow-hidden shadow-sm border border-[#F0D5C8] dark:border-brand-900/40"
            >
              <div className="aspect-square bg-[#F0D5C8] dark:bg-[#3D1F0A] animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded animate-pulse" />
                <div className="h-4 w-full bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded animate-pulse" />
                <div className="h-7 w-1/2 bg-[#F0D5C8] dark:bg-[#3D1F0A] rounded animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
