export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg mt-2" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />
              <div className="w-16 h-6 bg-gray-200 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded mt-2" />
            <div className="h-8 w-32 bg-gray-200 dark:bg-slate-700 rounded mt-2" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
            <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
