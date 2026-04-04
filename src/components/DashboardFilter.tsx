"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, RotateCcw } from "lucide-react";

const periods = [
  { key: "day", label: "Hari Ini" },
  { key: "week", label: "7 Hari" },
  { key: "month", label: "30 Hari" },
  { key: "all", label: "Semua" },
];

export default function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("period") || "all";

  const handleFilter = (period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (period === "all") {
      params.delete("period");
    } else {
      params.set("period", period);
    }
    router.push(`/admin?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/admin");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Calendar className="w-4 h-4 text-gray-400" />
      {periods.map((p) => (
        <button
          key={p.key}
          onClick={() => handleFilter(p.key)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            current === p.key
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
          }`}
        >
          {p.label}
        </button>
      ))}
      <button
        onClick={handleReset}
        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
        title="Reset filter"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
