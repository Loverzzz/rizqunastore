"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/product";
import { useTransition } from "react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      startTransition(async () => {
        await deleteProduct(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus Produk"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
