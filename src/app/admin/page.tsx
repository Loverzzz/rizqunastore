import prisma from "@/lib/prisma";
import { 
  Package, 
  ShoppingBag, 
  Ticket, 
  TrendingUp, 
  Users,
  CreditCard
} from "lucide-react";


export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch real counts from DB
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  const totalBookings = await prisma.booking.count();
  
  // Hitung pendapatan dari pesanan yang LUNAS
  const paidOrders = await prisma.order.aggregate({
    where: { status: "PAID" },
    _sum: { totalAmount: true }
  });
  
  const paidBookings = await prisma.booking.aggregate({
    where: { status: "CONFIRMED" },
    _sum: { totalAmount: true }
  });

  const totalRevenue = (paidOrders._sum.totalAmount || 0) + (paidBookings._sum.totalAmount || 0);
  
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Stats arrays
  const stats = [
    { name: "Total Produk", value: totalProducts.toString(), icon: Package, trend: "Tersedia", color: "bg-blue-500" },
    { name: "Total Pesanan", value: totalOrders.toString(), icon: ShoppingBag, trend: "Toko", color: "bg-green-500" },
    { name: "Tiket Playground", value: totalBookings.toString(), icon: Ticket, trend: "Booking", color: "bg-purple-500" },
    { name: "Pendapatan kotor", value: formatRupiah(totalRevenue), icon: TrendingUp, trend: "Lunas", color: "bg-brand-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Selamat datang di panel admin Rizquna Store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`w-6 h-6 text-${stat.color.replace('bg-', '')}`} />
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Pesanan Terbaru</h2>
          
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-600 dark:text-brand-400 text-sm">{formatRupiah(order.totalAmount)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
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

        {/* Quick Actions Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-slate-600">
              <Package className="w-8 h-8 text-brand-500" />
              Tambah Produk
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-slate-600">
              <CreditCard className="w-8 h-8 text-accent-500" />
              Seting Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
