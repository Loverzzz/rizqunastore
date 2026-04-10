import prisma from "@/lib/prisma";
import OrdersTable from "@/components/OrdersTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true, variant: true },
      },
    },
  });

  // Serialize dates for client component
  const serializedOrders = orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      ...item,
      product: {
        id: item.product.id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: item.product.price,
      },
      variant: item.variant
        ? {
            id: item.variant.id,
            label: item.variant.label,
            price: item.variant.price,
          }
        : null,
    })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pesanan Toko
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola pesanan masuk dan status pembayaran pelanggan.
          </p>
        </div>
      </div>
      <OrdersTable orders={serializedOrders} />
    </div>
  );
}
