"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect, useTransition } from "react";
import { createOrder, updateOrderStatus } from "@/actions/order";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

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
    
    startTransition(async () => {
      const orderData = {
        customerName,
        customerPhone,
        totalAmount: getTotalPrice(),
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const result = await createOrder(orderData);
      
      if (result.success && result.orderId) {
        
        // Fetch Snap Token from our new API
        try {
          const response = await fetch('/api/midtrans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: result.orderId })
          });
          
          const { token } = await response.json();
          
          if (token && window.snap) {
            window.snap.pay(token, {
              onSuccess: async function() {
                // Update status order ke PAID langsung dari klien
                await updateOrderStatus(result.orderId!, "PAID");
                clearCart();
                router.push(`/order-success?name=${encodeURIComponent(customerName)}&type=order`);
              },
              onPending: function() {
                // Status tetap PENDING, cukup redirect
                clearCart();
                router.push(`/order-success?name=${encodeURIComponent(customerName)}&type=order`);
              },
              onError: function() {
                alert("Pembayaran gagal. Silakan coba lagi.");
              },
              onClose: function() {
                // User menutup pop-up, tidak perlu action
              }
            });
          } else {
             alert("Sistem pembayaran sedang bermasalah. Silakan coba lagi nanti.");
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Keranjang Belanja Kosong</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Ups! Anda belum menambahkan produk apapun ke keranjang. Silakan lihat katalog produk kami.
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
              <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 p-2">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply flex-shrink-0" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                  )}
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">{item.name}</h3>
                  <p className="text-brand-600 dark:text-brand-400 font-semibold">{formatRupiah(item.price)}</p>
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
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} barang)</span>
                  <span>{formatRupiah(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-slate-700">
                  <span>Total Tagihan</span>
                  <span className="text-brand-600 dark:text-brand-400">{formatRupiah(getTotalPrice())}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. WhatsApp</label>
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
