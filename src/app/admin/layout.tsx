"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Ticket,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produk", href: "/admin/products", icon: Package },
    { name: "Pesanan Toko", href: "/admin/orders", icon: ShoppingBag },
    { name: "Booking Playground", href: "/admin/bookings", icon: Ticket },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDF6EF] dark:bg-[#1A0800] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#2D1506] border-r border-[#F0D5C8] dark:border-brand-900/40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="h-16 flex items-center px-6 border-b border-[#F0D5C8] dark:border-brand-900/40">
          <Link
            href="/admin"
            className="text-2xl font-black text-brand-600 dark:text-brand-400"
          >
            Rizquna<span className="text-gray-900 dark:text-white">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                    : "text-[#5C2A10] dark:text-[#C4946A] hover:bg-[#FDF6EF] dark:hover:bg-[#3D1F0A] hover:text-[#1C0A00] dark:hover:text-[#F5E6D3]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#F0D5C8] dark:border-brand-900/40">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-[#2D1506] border-b border-[#F0D5C8] dark:border-brand-900/40 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 mr-2 text-[#7A3B1E] hover:text-[#1C0A00] dark:text-[#C4946A] dark:hover:text-[#F5E6D3] lg:hidden rounded-lg hover:bg-[#FDF6EF] dark:hover:bg-[#3D1F0A]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-[#1C0A00] dark:text-[#F5E6D3] lg:hidden">
              Admin Panel
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold border border-brand-200 dark:border-brand-800 text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
