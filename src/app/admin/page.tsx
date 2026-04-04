import prisma from "@/lib/prisma";
import { Package, ShoppingBag, Ticket, TrendingUp } from "lucide-react";
import { Suspense } from "react";
import DashboardFilter from "@/components/DashboardFilter";

export const dynamic = "force-dynamic";

function getPeriodDate(period: string | undefined): Date | null {
  if (!period) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  switch (period) {
    case "day":
      return now;
    case "week":
      now.setDate(now.getDate() - 6);
      return now;
    case "month":
      now.setDate(now.getDate() - 29);
      return now;
    default:
      return null;
  }
}

function getPeriodLabel(period: string | undefined): string {
  switch (period) {
    case "day":
      return "Hari Ini";
    case "week":
      return "7 Hari Terakhir";
    case "month":
      return "30 Hari Terakhir";
    default:
      return "Semua Waktu";
  }
}

function getChartDays(period: string | undefined): number {
  switch (period) {
    case "day":
      return 1;
    case "week":
      return 7;
    case "month":
      return 30;
    default:
      return 7;
  }
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const period = typeof params.period === "string" ? params.period : undefined;
  const periodDate = getPeriodDate(period);
  const periodLabel = getPeriodLabel(period);
  const chartDays = getChartDays(period);

  // Date filter for queries
  const dateFilter = periodDate ? { gte: periodDate } : undefined;

  // Chart date range
  const chartStart = new Date();
  chartStart.setDate(chartStart.getDate() - (chartDays - 1));
  chartStart.setHours(0, 0, 0, 0);

  // Run ALL queries in parallel for speed
  const [
    totalProducts,
    totalOrders,
    totalBookings,
    paidOrders,
    paidBookings,
    filteredOrderIds,
    recentPaidOrders,
    recentPaidBookings,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({
      where: dateFilter ? { createdAt: dateFilter } : undefined,
    }),
    prisma.booking.count({
      where: dateFilter ? { createdAt: dateFilter } : undefined,
    }),
    prisma.order.aggregate({
      where: { status: "PAID", ...(dateFilter ? { updatedAt: dateFilter } : {}) },
      _sum: { totalAmount: true },
    }),
    prisma.booking.aggregate({
      where: { status: "CONFIRMED", ...(dateFilter ? { updatedAt: dateFilter } : {}) },
      _sum: { totalAmount: true },
    }),
    dateFilter
      ? prisma.order.findMany({ where: { createdAt: dateFilter }, select: { id: true } })
      : Promise.resolve(null),
    prisma.order.findMany({
      where: { status: "PAID", updatedAt: { gte: chartStart } },
      select: { totalAmount: true, updatedAt: true },
    }),
    prisma.booking.findMany({
      where: { status: "CONFIRMED", updatedAt: { gte: chartStart } },
      select: { totalAmount: true, updatedAt: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      where: dateFilter ? { createdAt: dateFilter } : undefined,
    }),
  ]);

  const totalRevenue =
    (paidOrders._sum.totalAmount || 0) + (paidBookings._sum.totalAmount || 0);

  // Produk terlaris (second batch - depends on filteredOrderIds)
  const orderIdFilter = filteredOrderIds?.map((o) => o.id);
  const topProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
    where: orderIdFilter ? { orderId: { in: orderIdFilter } } : undefined,
  });
  const topProductIds = topProducts.map((tp) => tp.productId);
  const topProductDetails = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true, imageUrl: true, price: true },
  });
  const topProductsWithNames = topProducts.map((tp) => ({
    ...tp,
    product: topProductDetails.find((p) => p.id === tp.productId),
  }));

  // Build chart data
  const dailyRevenue: { date: string; amount: number }[] = [];
  for (let i = chartDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    const dayStart = new Date(d);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);

    let dayAmount = 0;
    for (const o of recentPaidOrders) {
      if (o.updatedAt >= dayStart && o.updatedAt <= dayEnd)
        dayAmount += o.totalAmount;
    }
    for (const b of recentPaidBookings) {
      if (b.updatedAt >= dayStart && b.updatedAt <= dayEnd)
        dayAmount += b.totalAmount;
    }
    dailyRevenue.push({ date: dateStr, amount: dayAmount });
  }
  const maxRevenue = Math.max(...dailyRevenue.map((d) => d.amount), 1);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Stats arrays
  const stats = [
    {
      name: "Total Produk",
      value: totalProducts.toString(),
      icon: Package,
      trend: "Tersedia",
      color: "bg-blue-500",
    },
    {
      name: "Total Pesanan",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      trend: "Toko",
      color: "bg-green-500",
    },
    {
      name: "Tiket Playground",
      value: totalBookings.toString(),
      icon: Ticket,
      trend: "Booking",
      color: "bg-purple-500",
    },
    {
      name: "Pendapatan kotor",
      value: formatRupiah(totalRevenue),
      icon: TrendingUp,
      trend: "Lunas",
      color: "bg-brand-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Menampilkan data:{" "}
            <span className="font-semibold text-brand-600 dark:text-brand-400">
              {periodLabel}
            </span>
          </p>
        </div>
        <Suspense fallback={<div className="h-10" />}>
          <DashboardFilter />
        </Suspense>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.color} bg-opacity-10 dark:bg-opacity-20`}
                >
                  <Icon
                    className={`w-6 h-6 text-${stat.color.replace("bg-", "")}`}
                  />
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {stat.name}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Pesanan Terbaru
          </h2>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-600 dark:text-brand-400 text-sm">
                      {formatRupiah(order.totalAmount)}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === "PAID" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500">Belum ada pesanan masuk.</p>
            </div>
          )}
        </div>

        {/* Revenue Chart - 7 Days */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Pendapatan{" "}
            {chartDays === 1 ? "Hari Ini" : `${chartDays} Hari Terakhir`}
          </h2>
          <div className="flex items-end gap-2 h-48">
            {dailyRevenue.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-gray-500 font-medium">
                  {day.amount > 0 ? formatRupiah(day.amount) : "-"}
                </span>
                <div
                  className="w-full relative flex items-end"
                  style={{ height: "140px" }}
                >
                  <div
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg transition-all"
                    style={{
                      height: `${Math.max((day.amount / maxRevenue) * 100, 4)}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Produk Terlaris
          </h2>
          {topProductsWithNames.length > 0 ? (
            <div className="space-y-4">
              {topProductsWithNames.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {item.product?.name || "Produk dihapus"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatRupiah(item.product?.price || 0)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                    {item._sum.quantity}x terjual
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500">Belum ada data penjualan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
