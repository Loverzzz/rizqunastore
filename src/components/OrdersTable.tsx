"use client";

import { useState } from "react";
import {
  Info,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Package,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  MapPin,
  Store,
  Truck,
} from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; name: string; imageUrl: string | null; price: number };
  variant: { id: string; label: string; price: number } | null;
};

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  totalAmount: number;
  status: string;
  deliveryMethod: string;
  deliveryAddress: string | null;
  deliveryFee: number;
  deliveryDistance: number | null;
  paymentLink: string | null;
  midtransOrderId: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
          <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
        </span>
      );
    case "PAID":
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
          <CheckCircle className="w-3.5 h-3.5" /> Lunas / Selesai
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
          <XCircle className="w-3.5 h-3.5" /> Dibatalkan
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FDF6EF] text-[#5C2A10] dark:bg-[#3D1F0A] dark:text-[#C4946A] border border-[#E8C9B0] dark:border-brand-900/40">
          {status}
        </span>
      );
  }
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="bg-white dark:bg-[#2D1506] rounded-2xl shadow-sm border border-[#F0D5C8] dark:border-brand-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF6EF] dark:bg-[#1A0800]/50 border-b border-[#F0D5C8] dark:border-brand-900/40">
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  ID Pesanan
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Total & Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0D5C8] dark:divide-brand-900/30">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-[#7A3B1E] dark:text-[#C4946A]"
                  >
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FDF6EF]/50 dark:hover:bg-[#3D1F0A]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-[#7A3B1E] dark:text-[#C4946A] mb-1">
                        {order.id.split("-")[0].toUpperCase()}
                      </div>
                      <div className="text-xs text-[#7A3B1E]/60 dark:text-[#C4946A]/60">
                        {new Date(order.createdAt).toLocaleDateString("id-ID", {
                          dateStyle: "medium",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#1C0A00] dark:text-[#F5E6D3]">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-brand-600 dark:text-brand-400 mt-0.5">
                        {order.customerPhone}
                      </div>
                      <div className="mt-1">
                        {order.deliveryMethod === "delivery" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                            <Truck className="w-3 h-3" /> Dikirim
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <Store className="w-3 h-3" /> Ambil di Toko
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#5C2A10] dark:text-[#C4946A] space-y-1">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex gap-2 text-xs">
                            <span className="font-medium">
                              {item.quantity}x
                            </span>
                            <span className="truncate max-w-[150px]">
                              {item.product.name}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-[#7A3B1E]/60 dark:text-[#C4946A]/60 italic">
                            ...dan {order.items.length - 2} lainnya
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-2">
                        {formatRupiah(order.totalAmount)}
                      </div>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDF6EF] hover:bg-[#F0E4D4] dark:bg-[#3D1F0A] dark:hover:bg-[#4A2810] text-[#5C2A10] dark:text-[#D4A882] font-medium rounded-lg transition-colors text-sm"
                      >
                        <Info className="w-4 h-4" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white dark:bg-[#2D1506] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#F0D5C8] dark:border-brand-900/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#F0D5C8] dark:border-brand-900/40">
              <div>
                <h2 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3]">
                  Detail Pesanan
                </h2>
                <p className="text-xs font-mono text-[#7A3B1E] dark:text-[#C4946A] mt-1">
                  {selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-[#FDF6EF] dark:hover:bg-[#3D1F0A] rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-[#7A3B1E] dark:text-[#C4946A]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedOrder.status} />
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {formatRupiah(selectedOrder.totalAmount)}
                </span>
              </div>

              {/* Info Pelanggan */}
              <div className="bg-[#FDF6EF] dark:bg-[#1A0800]/50 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[#1C0A00] dark:text-[#F5E6D3] flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Info Pelanggan
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#5C2A10] dark:text-[#C4946A]">
                    <span className="font-medium text-[#1C0A00] dark:text-[#F5E6D3]">
                      {selectedOrder.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5C2A10] dark:text-[#C4946A]">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  {selectedOrder.customerEmail && (
                    <div className="flex items-center gap-2 text-[#5C2A10] dark:text-[#C4946A]">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[#5C2A10] dark:text-[#C4946A]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        "id-ID",
                        { dateStyle: "full", timeStyle: "short" },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pengiriman */}
              <div className="bg-[#FDF6EF] dark:bg-[#1A0800]/50 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[#1C0A00] dark:text-[#F5E6D3] flex items-center gap-2">
                  {selectedOrder.deliveryMethod === "delivery" ? (
                    <>
                      <Truck className="w-4 h-4 text-brand-500" /> Pengiriman
                    </>
                  ) : (
                    <>
                      <Store className="w-4 h-4 text-green-500" /> Ambil di Toko
                    </>
                  )}
                </h3>
                {selectedOrder.deliveryMethod === "delivery" && (
                  <div className="space-y-2 text-sm">
                    {selectedOrder.deliveryAddress && (
                      <div className="flex items-start gap-2 text-[#5C2A10] dark:text-[#C4946A]">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{selectedOrder.deliveryAddress}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#5C2A10] dark:text-[#C4946A]">
                      <span>Jarak</span>
                      <span className="font-medium">
                        {selectedOrder.deliveryDistance ?? "-"} km
                      </span>
                    </div>
                    <div className="flex justify-between text-[#5C2A10] dark:text-[#C4946A]">
                      <span>Ongkos kirim</span>
                      <span className="font-bold text-brand-600 dark:text-brand-400">
                        {formatRupiah(selectedOrder.deliveryFee)}
                      </span>
                    </div>
                  </div>
                )}
                {selectedOrder.deliveryMethod === "pickup" && (
                  <p className="text-sm text-[#7A3B1E] dark:text-[#C4946A]">
                    Pelanggan akan mengambil pesanan langsung di toko.
                  </p>
                )}
              </div>

              {/* Midtrans ID */}
              {selectedOrder.midtransOrderId && (
                <div className="bg-[#FDF6EF] dark:bg-[#1A0800]/50 rounded-xl p-4">
                  <p className="text-xs text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider font-semibold mb-1">
                    Midtrans Order ID
                  </p>
                  <p className="font-mono text-sm text-[#1C0A00] dark:text-[#F5E6D3]">
                    {selectedOrder.midtransOrderId}
                  </p>
                </div>
              )}

              {/* Daftar Item */}
              <div>
                <h3 className="text-sm font-semibold text-[#1C0A00] dark:text-[#F5E6D3] flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4" /> Daftar Item (
                  {selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-[#FDF6EF] dark:bg-[#1A0800]/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-xs font-bold">
                          {item.quantity}x
                        </span>
                        <div>
                          <p className="font-medium text-[#1C0A00] dark:text-[#F5E6D3] text-sm">
                            {item.product.name}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-brand-500 font-medium">
                              {item.variant.label}
                            </p>
                          )}
                          <p className="text-xs text-[#7A3B1E] dark:text-[#C4946A]">
                            @ {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#1C0A00] dark:text-[#F5E6D3]">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-[#F0D5C8] dark:border-brand-900/40 space-y-2">
                {selectedOrder.deliveryFee > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-[#5C2A10] dark:text-[#C4946A]">
                      <span>Subtotal produk</span>
                      <span>
                        {formatRupiah(
                          selectedOrder.totalAmount - selectedOrder.deliveryFee,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-[#5C2A10] dark:text-[#C4946A]">
                      <span>Ongkos kirim</span>
                      <span>{formatRupiah(selectedOrder.deliveryFee)}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3]">
                    Total Pembayaran
                  </span>
                  <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                    {formatRupiah(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#F0D5C8] dark:border-brand-900/40">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-[#FDF6EF] hover:bg-[#F0E4D4] dark:bg-[#3D1F0A] dark:hover:bg-[#4A2810] text-[#5C2A10] dark:text-[#D4A882] font-medium rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}