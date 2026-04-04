"use client";

import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  MapPin,
  Store,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect, useTransition } from "react";
import { createOrder } from "@/actions/order";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}

// Koordinat toko Rizquna
const STORE_LAT = -7.0267455;
const STORE_LNG = 112.0983932;

// Ongkir per km (Rp)
const ONGKIR_PER_KM = 3000;
const ONGKIR_MIN = 5000;
const ONGKIR_MAX = 50000;
const MAX_DELIVERY_KM = 15;

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateOngkir(distanceKm: number): number {
  const fee = Math.round(distanceKm * ONGKIR_PER_KM);
  return Math.min(Math.max(fee, ONGKIR_MIN), ONGKIR_MAX);
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Delivery State
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup",
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung geolokasi.");
      return;
    }
    setIsLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = haversineDistance(
          STORE_LAT,
          STORE_LNG,
          position.coords.latitude,
          position.coords.longitude,
        );
        const roundedDist = Math.round(dist * 10) / 10;
        setDeliveryDistance(roundedDist);
        if (roundedDist > MAX_DELIVERY_KM) {
          setLocationError(
            `Jarak ${roundedDist} km melebihi batas pengiriman (maks ${MAX_DELIVERY_KM} km). Silakan pilih Ambil di Toko.`,
          );
          setDeliveryFee(0);
        } else {
          setDeliveryFee(calculateOngkir(roundedDist));
          setLocationError("");
        }
        setIsLocating(false);
      },
      () => {
        setLocationError(
          "Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleDeliveryMethodChange = (method: "pickup" | "delivery") => {
    setDeliveryMethod(method);
    if (method === "pickup") {
      setDeliveryFee(0);
      setDeliveryDistance(null);
      setDeliveryAddress("");
      setLocationError("");
    }
  };

  const totalWithDelivery = getTotalPrice() + deliveryFee;

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Mohon lengkapi nama dan nomor WhatsApp Anda.");
      return;
    }
    if (deliveryMethod === "delivery") {
      if (!deliveryAddress.trim()) {
        alert("Mohon masukkan alamat pengiriman.");
        return;
      }
      if (deliveryDistance === null || deliveryDistance > MAX_DELIVERY_KM) {
        alert(
          "Mohon deteksi lokasi Anda terlebih dahulu dan pastikan dalam jangkauan.",
        );
        return;
      }
    }

    startTransition(async () => {
      const orderData = {
        customerName,
        customerPhone,
        totalAmount: totalWithDelivery,
        deliveryMethod,
        deliveryAddress:
          deliveryMethod === "delivery" ? deliveryAddress : undefined,
        deliveryFee: deliveryMethod === "delivery" ? deliveryFee : 0,
        deliveryDistance:
          deliveryMethod === "delivery"
            ? (deliveryDistance ?? undefined)
            : undefined,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const result = await createOrder(orderData);

      if (result.success && result.orderId) {
        // Fetch Snap Token from our new API
        try {
          const response = await fetch("/api/midtrans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: result.orderId }),
          });

          const { token } = await response.json();

          if (token && window.snap) {
            window.snap.pay(token, {
              onSuccess: async function () {
                clearCart();
                router.push(`/order-success?type=order&status=paid`);
              },
              onPending: function () {
                clearCart();
                router.push(`/order-success?type=order&status=pending`);
              },
              onError: function () {
                alert("Pembayaran gagal. Silakan coba lagi.");
              },
              onClose: function () {
                alert(
                  "Popup pembayaran ditutup. Transaksi Anda belum selesai dibayar.",
                );
              },
            });
          } else {
            alert(
              "Sistem pembayaran sedang bermasalah. Silakan coba lagi nanti.",
            );
          }
        } catch (error) {
          console.error("Error Triggering Snap:", error);
          alert("Terjadi kesalahan saat menghubungkan ke Midtrans.");
        }
      } else {
        alert(result.error || "Terjadi kesalahan saat checkout.");
      }
    });
  };

  if (!mounted) return null; // Prevent hydration error

  if (items.length === 0) {
    return (
      <div className="py-12 bg-gray-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Keranjang Belanja Kosong
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Ups! Anda belum menambahkan produk apapun ke keranjang. Silakan
            lihat katalog produk kami.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 p-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply flex-shrink-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Img
                    </div>
                  )}
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-brand-600 dark:text-brand-400 font-semibold">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
                Ringkasan Pesanan
              </h2>

              {/* Delivery Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Metode Pengambilan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleDeliveryMethodChange("pickup")}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      deliveryMethod === "pickup"
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                        : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                    }`}
                  >
                    <Store
                      className={`w-5 h-5 mx-auto mb-1 ${deliveryMethod === "pickup" ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`}
                    />
                    <p
                      className={`text-sm font-semibold ${deliveryMethod === "pickup" ? "text-brand-600 dark:text-brand-400" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      Ambil di Toko
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Gratis
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeliveryMethodChange("delivery")}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      deliveryMethod === "delivery"
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                        : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                    }`}
                  >
                    <Truck
                      className={`w-5 h-5 mx-auto mb-1 ${deliveryMethod === "delivery" ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`}
                    />
                    <p
                      className={`text-sm font-semibold ${deliveryMethod === "delivery" ? "text-brand-600 dark:text-brand-400" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      Dikirim
                    </p>
                    <p className="text-xs text-gray-500">+ Ongkir</p>
                  </button>
                </div>
              </div>

              {/* Delivery Details */}
              {deliveryMethod === "delivery" && (
                <div className="mb-6 space-y-3 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-600">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Alamat Pengiriman
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Masukkan alamat lengkap..."
                      rows={2}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none text-sm resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={isLocating}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <MapPin className="w-4 h-4" />
                    {isLocating
                      ? "Mendeteksi lokasi..."
                      : "Deteksi Lokasi Saya"}
                  </button>

                  {locationError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      {locationError}
                    </p>
                  )}

                  {deliveryDistance !== null && !locationError && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Jarak dari toko</span>
                        <span className="font-semibold">
                          {deliveryDistance} km
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Ongkos kirim</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400">
                          {formatRupiah(deliveryFee)}
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400">
                    Maks. {MAX_DELIVERY_KM} km dari toko. Ongkir Rp
                    {ONGKIR_PER_KM.toLocaleString()}/km (min Rp
                    {ONGKIR_MIN.toLocaleString()}, maks Rp
                    {ONGKIR_MAX.toLocaleString()}).
                  </p>
                </div>
              )}

              {/* Pickup Info */}
              {deliveryMethod === "pickup" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                        Ambil di Rizquna Store
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Pesanan bisa diambil setelah konfirmasi via WhatsApp.
                      </p>
                      <a
                        href="https://maps.app.goo.gl/H8BcHnWQpdyWnSECA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                      >
                        📍 Lihat lokasi di Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    Subtotal ({items.reduce((a, b) => a + b.quantity, 0)}{" "}
                    barang)
                  </span>
                  <span>{formatRupiah(getTotalPrice())}</span>
                </div>
                {deliveryMethod === "delivery" && deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Ongkos kirim ({deliveryDistance} km)</span>
                    <span>{formatRupiah(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-slate-700">
                  <span>Total Tagihan</span>
                  <span className="text-brand-600 dark:text-brand-400">
                    {formatRupiah(totalWithDelivery)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    "Memproses..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Lanjut Pembayaran
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
