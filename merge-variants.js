const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================
// Definisi grup yang akan digabung menjadi 1 produk + varian
// ============================================================
const mergeGroups = [
  {
    newName: "Solasi",
    description: "Solasi/selotip bening",
    category: "Alat Tulis",
    oldNames: ["Solasi Kecil", "Solasi Tanggung", "Solasi/Lakban Besar"],
    variantMap: {
      "Solasi Kecil": { label: "Kecil", price: 2000 },
      "Solasi Tanggung": { label: "Tanggung", price: 8000 },
      "Solasi/Lakban Besar": { label: "Besar", price: 10000 },
    },
  },
  {
    newName: "Lakban Hitam",
    description: "Lakban/solasi hitam",
    category: "Alat Tulis",
    oldNames: ["Lakban Hitam Sedang", "Lakban Hitam Besar"],
    variantMap: {
      "Lakban Hitam Sedang": { label: "Sedang", price: 11000 },
      "Lakban Hitam Besar": { label: "Besar", price: 15000 },
    },
  },
  {
    newName: "Origami",
    description: "Kertas origami aneka ukuran",
    category: "Alat Tulis",
    oldNames: [
      "Origami 12x12",
      "Origami 14x14",
      "Origami 16x16",
      "Origami 20x20",
    ],
    variantMap: {
      "Origami 12x12": { label: "12x12 cm", price: 2500 },
      "Origami 14x14": { label: "14x14 cm", price: 3000 },
      "Origami 16x16": { label: "16x16 cm", price: 4000 },
      "Origami 20x20": { label: "20x20 cm", price: 5000 },
    },
  },
  {
    newName: "Vtec Glue Stick",
    description: "Lem stick merek Vtec",
    category: "Alat Tulis",
    oldNames: ["Vtec Glue Stick Kecil", "Vtec Glue Stick Besar"],
    variantMap: {
      "Vtec Glue Stick Kecil": { label: "Kecil", price: 5000 },
      "Vtec Glue Stick Besar": { label: "Besar", price: 7000 },
    },
  },
  {
    newName: "Hasduk",
    description: "Hasduk/setangan leher pramuka",
    category: "Seragam Pramuka",
    oldNames: ["Hasduk SD", "Hasduk SMP", "Hasduk SMA", "Hasduk Satin"],
    variantMap: {
      "Hasduk SD": { label: "SD", price: 15000 },
      "Hasduk SMP": { label: "SMP", price: 17000 },
      "Hasduk SMA": { label: "SMA", price: 20000 },
      "Hasduk Satin": { label: "Satin", price: 23000 },
    },
  },
];

async function mergeGroup(group) {
  console.log(
    `\n▶ Menggabungkan: ${group.oldNames.join(" + ")} → "${group.newName}"`,
  );

  // Ambil semua produk lama
  const oldProducts = await prisma.product.findMany({
    where: { name: { in: group.oldNames } },
    include: { orderItems: true, variants: true },
  });

  if (oldProducts.length === 0) {
    console.log(`  ⚠️  Tidak ada produk ditemukan, skip.`);
    return;
  }

  // Cek order items
  const withOrders = oldProducts.filter((p) => p.orderItems.length > 0);
  if (withOrders.length > 0) {
    console.log(
      `  ⚠️  Produk berikut punya order, akan dipindahkan: ${withOrders.map((p) => p.name).join(", ")}`,
    );
  }

  // Susun varian dari stok produk lama
  const variants = group.oldNames
    .map((name) => {
      const found = oldProducts.find((p) => p.name === name);
      const vm = group.variantMap[name];
      if (!found || !vm) return null;
      return { label: vm.label, price: vm.price, stock: found.stock };
    })
    .filter(Boolean);

  // Harga terendah sebagai harga dasar produk
  const minPrice = Math.min(...variants.map((v) => v.price));

  // Buat produk baru dengan varian
  const newProduct = await prisma.product.create({
    data: {
      name: group.newName,
      description: group.description,
      price: minPrice,
      category: group.category,
      stock: 0,
      imageUrl: null,
      variants: { create: variants },
    },
    include: { variants: true },
  });
  console.log(
    `  ✅ Produk baru dibuat: "${newProduct.name}" (${newProduct.variants.length} varian)`,
  );

  // Pindahkan order items ke produk baru jika ada
  for (const oldProduct of withOrders) {
    const newVariant = newProduct.variants.find(
      (v) => v.label === group.variantMap[oldProduct.name]?.label,
    );
    await prisma.orderItem.updateMany({
      where: { productId: oldProduct.id, variantId: null },
      data: { productId: newProduct.id, variantId: newVariant?.id ?? null },
    });
    console.log(
      `  ↳ Order items "${oldProduct.name}" dipindahkan ke varian "${newVariant?.label}"`,
    );
  }

  // Hapus varian lama dan produk lama
  for (const old of oldProducts) {
    await prisma.productVariant.deleteMany({ where: { productId: old.id } });
    await prisma.product.delete({ where: { id: old.id } });
    console.log(`  🗑  "${old.name}" dihapus`);
  }
}

async function fixDuplicateLemPovinal() {
  console.log(`\n▶ Fix duplikat: "Lem povinal" (huruf kecil)`);
  const dup = await prisma.product.findFirst({
    where: { name: "Lem povinal" },
    include: { orderItems: true },
  });
  if (!dup) {
    console.log(`  ℹ️  Tidak ditemukan, mungkin sudah dihapus.`);
    return;
  }
  if (dup.orderItems.length > 0) {
    const canonical = await prisma.product.findFirst({
      where: { name: "Lem Povinal" },
    });
    if (canonical) {
      await prisma.orderItem.updateMany({
        where: { productId: dup.id },
        data: { productId: canonical.id },
      });
      console.log(`  ↳ Order items dipindahkan ke "Lem Povinal"`);
    }
  }
  await prisma.product.delete({ where: { id: dup.id } });
  console.log(`  ✅ Duplikat "Lem povinal" dihapus`);
}

async function main() {
  console.log("=== Merge produk duplikat/varian ukuran ===");

  for (const group of mergeGroups) {
    await mergeGroup(group);
  }

  await fixDuplicateLemPovinal();

  console.log("\n✔ Selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
