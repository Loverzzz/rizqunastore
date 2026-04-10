const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Produk TANPA varian (harga & stok langsung)
const simpleProducts = [
  {
    name: "Tas Trplsvn",
    description: "Tas sekolah merek Trplsvn",
    price: 68000,
    category: "Tas",
    stock: 3,
  },
  {
    name: "Tas Bagston",
    description: "Tas sekolah merek Bagston",
    price: 85000,
    category: "Tas",
    stock: 1,
  },
  {
    name: "Tas Pollo Danny",
    description: "Tas sekolah merek Pollo Danny",
    price: 75000,
    category: "Tas",
    stock: 2,
  },
  {
    name: "Tas Pollo Paris",
    description: "Tas sekolah merek Pollo Paris",
    price: 78500,
    category: "Tas",
    stock: 2,
  },
  {
    name: "Tas Anak + Botol",
    description: "Tas anak lengkap dengan botol minum",
    price: 45000,
    category: "Tas",
    stock: 11,
  },
  {
    name: "Tas Bonita",
    description: "Tas sekolah merek Bonita",
    price: 75000,
    category: "Tas",
    stock: 2,
  },
];

// Produk DENGAN varian ukuran
const variantProducts = [
  {
    name: "Rok Putih Panjang Purnama",
    description: "Rok putih panjang seragam sekolah merek Purnama",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 7", price: 91000, stock: 2 },
      { label: "Uk 8", price: 95000, stock: 3 },
    ],
  },
  {
    name: "Rok Putih Panjang Rachma Jaya",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 72000, stock: 5 },
      { label: "Uk 4", price: 77000, stock: 6 },
      { label: "Uk 5", price: 82000, stock: 6 },
      { label: "Uk 6", price: 87000, stock: 4 },
      { label: "Uk 7", price: 92000, stock: 6 },
      { label: "Uk 8", price: 97000, stock: 5 },
      { label: "Uk 9", price: 102000, stock: 4 },
      { label: "Uk 10", price: 107000, stock: 9 },
      { label: "Uk 12", price: 117000, stock: 2 },
    ],
  },
  {
    name: "Celana Merah Panjang",
    description: "Celana merah panjang seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 20", price: 86000, stock: 8 },
      { label: "Uk 21", price: 88000, stock: 5 },
      { label: "Uk 22", price: 90000, stock: 6 },
      { label: "Uk 23", price: 92000, stock: 5 },
      { label: "Uk 24", price: 94000, stock: 4 },
      { label: "Uk 25", price: 98000, stock: 7 },
      { label: "Uk 26", price: 102000, stock: 6 },
      { label: "Uk 27", price: 106000, stock: 7 },
      { label: "Uk 28", price: 110000, stock: 4 },
      { label: "Uk 29", price: 114000, stock: 10 },
      { label: "Uk 30", price: 118000, stock: 8 },
      { label: "Uk 31", price: 122000, stock: 3 },
      { label: "Uk 32", price: 125000, stock: 9 },
      { label: "Uk 33", price: 130000, stock: 1 },
      { label: "Uk 34", price: 135000, stock: 5 },
      { label: "Uk 35", price: 150000, stock: 4 },
    ],
  },
  {
    name: "Hem Putih Pendek Purnama",
    description: "Kemeja putih lengan pendek seragam sekolah merek Purnama",
    category: "Seragam Sekolah",
    variants: [{ label: "Uk 6", price: 56000, stock: 8 }],
  },
  {
    name: "Hem Putih Pendek Rachma Jaya",
    description: "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 56000, stock: 14 },
      { label: "Uk 4", price: 58000, stock: 8 },
      { label: "Uk 5", price: 60000, stock: 15 },
      { label: "Uk 6", price: 62000, stock: 7 },
      { label: "Uk 7", price: 64000, stock: 7 },
      { label: "Uk 8", price: 66000, stock: 6 },
      { label: "Uk 9", price: 68000, stock: 6 },
      { label: "Uk 10", price: 70000, stock: 4 },
      { label: "Uk 11", price: 72000, stock: 5 },
      { label: "Uk 12", price: 74000, stock: 8 },
    ],
  },
  {
    name: "Hem Coklat Penggalang Pendek",
    description: "Kemeja coklat lengan pendek seragam pramuka penggalang",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 4", price: 56000, stock: 8 },
      { label: "Uk 5", price: 58000, stock: 8 },
      { label: "Uk 6", price: 60000, stock: 8 },
      { label: "Uk 7", price: 62000, stock: 4 },
      { label: "Uk 9", price: 66000, stock: 8 },
      { label: "Uk 10", price: 70000, stock: 5 },
    ],
  },
  {
    name: "Hem Penggalang Panjang",
    description: "Kemeja lengan panjang seragam pramuka penggalang",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 6", price: 67000, stock: 8 },
      { label: "Uk 7", price: 69000, stock: 6 },
      { label: "Uk 8", price: 71000, stock: 7 },
      { label: "Uk 9", price: 73000, stock: 6 },
      { label: "Uk 10", price: 75000, stock: 4 },
      { label: "Uk 11", price: 77000, stock: 7 },
      { label: "Uk 12", price: 82000, stock: 12 },
    ],
  },
  {
    name: "Baju Siaga Pendek",
    description: "Baju siaga lengan pendek seragam pramuka",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 4", price: 67000, stock: 1 },
      { label: "Uk 6", price: 71000, stock: 4 },
      { label: "Uk 7", price: 73000, stock: 7 },
    ],
  },
  {
    name: "Baju Siaga Panjang",
    description: "Baju siaga lengan panjang seragam pramuka",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 3", price: 68000, stock: 3 },
      { label: "Uk 4", price: 70000, stock: 4 },
      { label: "Uk 5", price: 73000, stock: 5 },
      { label: "Uk 6", price: 75000, stock: 8 },
      { label: "Uk 7", price: 79000, stock: 5 },
      { label: "Uk 8", price: 81000, stock: 4 },
    ],
  },
  {
    name: "Celana Putih Pendek Purnama",
    description: "Celana putih pendek seragam sekolah merek Purnama",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 5", price: 75000, stock: 15 },
      { label: "Uk 6", price: 73000, stock: 13 },
    ],
  },
  {
    name: "Celana Pendek Coklat",
    description: "Celana pendek coklat seragam pramuka",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 9", price: 79000, stock: 4 },
      { label: "Uk 10", price: 82000, stock: 5 },
      { label: "Uk 11", price: 85000, stock: 3 },
      { label: "Uk 12", price: 88000, stock: 5 },
    ],
  },
  {
    name: "Rok Putih Pendek",
    description: "Rok putih pendek seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 56000, stock: 2 },
      { label: "Uk 5", price: 59000, stock: 2 },
      { label: "Uk 9", price: 72000, stock: 6 },
    ],
  },
  {
    name: "Rok Merah Pendek",
    description: "Rok merah pendek seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 52000, stock: 5 },
      { label: "Uk 4", price: 54000, stock: 2 },
      { label: "Uk 5", price: 60000, stock: 2 },
      { label: "Uk 7", price: 64000, stock: 7 },
      { label: "Uk 8", price: 66000, stock: 2 },
    ],
  },
  {
    name: "Hem Putih Panjang",
    description: "Kemeja putih lengan panjang seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 63000, stock: 5 },
      { label: "Uk 4", price: 65000, stock: 5 },
      { label: "Uk 5", price: 67000, stock: 5 },
      { label: "Uk 6", price: 69000, stock: 8 },
      { label: "Uk 7", price: 71000, stock: 4 },
      { label: "Uk 8", price: 73000, stock: 3 },
      { label: "Uk 9", price: 75000, stock: 5 },
      { label: "Uk 10", price: 77000, stock: 5 },
      { label: "Uk 11", price: 79000, stock: 17 },
      { label: "Uk 12", price: 81000, stock: 8 },
    ],
  },
  {
    name: "Rok Merah Panjang",
    description: "Rok merah panjang seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 3", price: 72000, stock: 6 },
      { label: "Uk 4", price: 77000, stock: 8 },
      { label: "Uk 5", price: 82000, stock: 11 },
      { label: "Uk 6", price: 87000, stock: 5 },
      { label: "Uk 7", price: 92000, stock: 6 },
      { label: "Uk 8", price: 97000, stock: 8 },
      { label: "Uk 9", price: 102000, stock: 3 },
      { label: "Uk 10", price: 107000, stock: 6 },
      { label: "Uk 11", price: 112000, stock: 7 },
      { label: "Uk 12", price: 117000, stock: 12 },
    ],
  },
  {
    name: "Celana Putih Panjang",
    description: "Celana putih panjang seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 21", price: 88000, stock: 6 },
      { label: "Uk 22", price: 90000, stock: 4 },
      { label: "Uk 23", price: 92000, stock: 5 },
      { label: "Uk 24", price: 94000, stock: 6 },
      { label: "Uk 25", price: 98000, stock: 6 },
      { label: "Uk 26", price: 102000, stock: 8 },
      { label: "Uk 27", price: 106000, stock: 9 },
      { label: "Uk 28", price: 110000, stock: 7 },
      { label: "Uk 29", price: 114000, stock: 4 },
      { label: "Uk 30", price: 118000, stock: 8 },
      { label: "Uk 31", price: 122000, stock: 9 },
      { label: "Uk 32", price: 126000, stock: 6 },
      { label: "Uk 33", price: 131000, stock: 7 },
      { label: "Uk 34", price: 135000, stock: 4 },
    ],
  },
  {
    name: "Rok Coklat Panjang",
    description: "Rok coklat panjang seragam pramuka",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 3", price: 69000, stock: 5 },
      { label: "Uk 4", price: 74000, stock: 9 },
      { label: "Uk 5", price: 79000, stock: 9 },
      { label: "Uk 6", price: 84000, stock: 8 },
      { label: "Uk 7", price: 89000, stock: 9 },
      { label: "Uk 8", price: 94000, stock: 10 },
      { label: "Uk 9", price: 99000, stock: 12 },
      { label: "Uk 10", price: 104000, stock: 4 },
      { label: "Uk 11", price: 109000, stock: 4 },
    ],
  },
  {
    name: "Celana Coklat Kempol",
    description: "Celana coklat panjang kempol seragam pramuka",
    category: "Seragam Pramuka",
    variants: [
      { label: "Uk 20", price: 105000, stock: 6 },
      { label: "Uk 21", price: 105000, stock: 9 },
      { label: "Uk 22", price: 110000, stock: 7 },
      { label: "Uk 23", price: 110000, stock: 4 },
      { label: "Uk 24", price: 115000, stock: 3 },
      { label: "Uk 25", price: 115000, stock: 2 },
      { label: "Uk 26", price: 115000, stock: 6 },
      { label: "Uk 27", price: 124000, stock: 4 },
      { label: "Uk 28", price: 134000, stock: 12 },
      { label: "Uk 29", price: 144000, stock: 5 },
      { label: "Uk 30", price: 154000, stock: 7 },
      { label: "Uk 31", price: 164000, stock: 8 },
      { label: "Uk 32", price: 174000, stock: 5 },
      { label: "Uk 33", price: 184000, stock: 4 },
      { label: "Uk 34", price: 194000, stock: 4 },
    ],
  },
  {
    name: "Celana Hijau",
    description: "Celana hijau seragam sekolah",
    category: "Seragam Sekolah",
    variants: [
      { label: "Uk 23", price: 93000, stock: 3 },
      { label: "Uk 24", price: 96000, stock: 5 },
      { label: "Uk 25", price: 100000, stock: 5 },
    ],
  },
];

async function main() {
  // Hapus data lama
  console.log("Menghapus produk lama...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  let totalProducts = 0;
  let totalVariants = 0;

  // 1. Produk tanpa varian
  console.log("\n--- Produk Tanpa Varian ---");
  for (const p of simpleProducts) {
    const created = await prisma.product.create({ data: p });
    totalProducts++;
    console.log(
      `  ✓ ${created.name} — Rp${created.price.toLocaleString("id-ID")} (stok: ${created.stock})`,
    );
  }

  // 2. Produk dengan varian
  console.log("\n--- Produk Dengan Varian Ukuran ---");
  for (const p of variantProducts) {
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);

    const created = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: minPrice,
        category: p.category,
        stock: totalStock,
        variants: {
          create: p.variants,
        },
      },
      include: { variants: true },
    });

    totalProducts++;
    totalVariants += created.variants.length;
    console.log(
      `  ✓ ${created.name} — ${created.variants.length} ukuran, total stok: ${totalStock}`,
    );
  }

  console.log(
    `\n✅ Selesai! ${totalProducts} produk & ${totalVariants} varian berhasil ditambahkan.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
