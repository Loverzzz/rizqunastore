const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Produk DENGAN varian ukuran
const variantProducts = [
  {
    name: "Jilbab Sekolah Putih",
    description: "Jilbab sekolah warna putih",
    price: 22000,
    category: "Seragam Sekolah",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "Uk 1", price: 22000, stock: 18 },
      { label: "Uk 2", price: 25000, stock: 40 },
      { label: "Uk 3", price: 28000, stock: 49 },
      { label: "Uk 4", price: 31000, stock: 12 },
      { label: "Uk 5", price: 34000, stock: 12 },
    ],
  },
  {
    name: "Jilbab Sekolah Coklat",
    description: "Jilbab sekolah warna coklat",
    price: 25000,
    category: "Seragam Sekolah",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "Uk 2", price: 25000, stock: 7 },
      { label: "Uk 3", price: 28000, stock: 16 },
      { label: "Uk 4", price: 31000, stock: 16 },
      { label: "Uk 5", price: 34000, stock: 14 },
    ],
  },
];

// Produk TANPA varian
const simpleProducts = [
  // === KOSMETIK ===
  {
    name: "Lipbalm Viva",
    description: "Lip balm merek Viva",
    price: 14500,
    category: "Lainnya",
    stock: 3,
  },
  {
    name: "Kutek Naura",
    description: "Kutek kuku merek Naura",
    price: 20000,
    category: "Lainnya",
    stock: 7,
  },
  {
    name: "Lipcream Pinkflash",
    description: "Lip cream merek Pinkflash",
    price: 20000,
    category: "Lainnya",
    stock: 5,
  },
  {
    name: "Maybeline Bulu Mata",
    description: "Bulu mata palsu Maybeline",
    price: 10000,
    category: "Lainnya",
    stock: 3,
  },
  {
    name: "Implora Eyeshadow",
    description: "Eyeshadow palette Implora",
    price: 26500,
    category: "Lainnya",
    stock: 2,
  },

  // === ALAT TULIS - PENSIL ===
  {
    name: "Pensil Greebel",
    description: "Pensil tulis merek Greebel",
    price: 5000,
    category: "Alat Tulis",
    stock: 20,
  },
  {
    name: "Pensil Faber",
    description: "Pensil tulis merek Faber Castell",
    price: 5000,
    category: "Alat Tulis",
    stock: 16,
  },
  {
    name: "Pensil Staedler",
    description: "Pensil tulis merek Staedtler",
    price: 4500,
    category: "Alat Tulis",
    stock: 48,
  },
  {
    name: "Pensil Joyko",
    description: "Pensil tulis merek Joyko",
    price: 2000,
    category: "Alat Tulis",
    stock: 23,
  },
  {
    name: "Pensil Benefit",
    description: "Pensil tulis merek Benefit",
    price: 2000,
    category: "Alat Tulis",
    stock: 9,
  },
  {
    name: "Pensil Montana",
    description: "Pensil tulis merek Montana",
    price: 1000,
    category: "Alat Tulis",
    stock: 76,
  },

  // === ALAT TULIS - PULPEN ===
  {
    name: "Pulpen Standar Biru",
    description: "Pulpen standar tinta biru",
    price: 2500,
    category: "Alat Tulis",
    stock: 24,
  },
  {
    name: "Pulpen Biru Artline",
    description: "Pulpen Artline tinta biru",
    price: 2000,
    category: "Alat Tulis",
    stock: 9,
  },
  {
    name: "Pulpen Standar Merah",
    description: "Pulpen standar tinta merah",
    price: 2500,
    category: "Alat Tulis",
    stock: 12,
  },
  {
    name: "Pulpen Benefit Biru",
    description: "Pulpen Benefit tinta biru",
    price: 3000,
    category: "Alat Tulis",
    stock: 21,
  },
  {
    name: "Pulpen Standar Hitam",
    description: "Pulpen standar tinta hitam",
    price: 2500,
    category: "Alat Tulis",
    stock: 40,
  },
  {
    name: "Pulpen Lilin",
    description: "Pulpen lilin",
    price: 2000,
    category: "Alat Tulis",
    stock: 4,
  },
  {
    name: "Pulpen Tizo Zebra Hitam",
    description: "Pulpen Tizo Zebra tinta hitam",
    price: 4500,
    category: "Alat Tulis",
    stock: 14,
  },
  {
    name: "Pulpen Warna Warni",
    description: "Pulpen warna-warni",
    price: 6500,
    category: "Alat Tulis",
    stock: 17,
  },
  {
    name: "Pulpen Tizo Zebra Biru",
    description: "Pulpen Tizo Zebra tinta biru",
    price: 4500,
    category: "Alat Tulis",
    stock: 282,
  },
  {
    name: "Pulpen K123",
    description: "Pulpen K123",
    price: 2500,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Pulpen Tizo Karakter",
    description: "Pulpen Tizo karakter lucu",
    price: 2500,
    category: "Alat Tulis",
    stock: 74,
  },

  // === ALAT TULIS - SPIDOL ===
  {
    name: "Spidol Safari Hitam",
    description: "Spidol Safari tinta hitam",
    price: 2000,
    category: "Alat Tulis",
    stock: 32,
  },
  {
    name: "Spidol Merah Artline",
    description: "Spidol Artline tinta merah",
    price: 2000,
    category: "Alat Tulis",
    stock: 3,
  },
  {
    name: "Spidol Snowman Whiteboard",
    description: "Spidol whiteboard Snowman",
    price: 7500,
    category: "Alat Tulis",
    stock: 34,
  },
  {
    name: "Spidol Snowman Permanent",
    description: "Spidol permanent Snowman",
    price: 7500,
    category: "Alat Tulis",
    stock: 7,
  },

  // === ALAT TULIS - PENGHAPUS ===
  {
    name: "Penghapus Joyko",
    description: "Penghapus merek Joyko",
    price: 1000,
    category: "Alat Tulis",
    stock: 40,
  },
  {
    name: "Penghapus Vis-1",
    description: "Penghapus merek Vis-1",
    price: 2000,
    category: "Alat Tulis",
    stock: 36,
  },
  {
    name: "Penghapus Joyko Besar",
    description: "Penghapus Joyko ukuran besar",
    price: 2000,
    category: "Alat Tulis",
    stock: 37,
  },
  {
    name: "Penghapus Staedler",
    description: "Penghapus merek Staedtler",
    price: 2500,
    category: "Alat Tulis",
    stock: 23,
  },
  {
    name: "Penghapus Faber",
    description: "Penghapus merek Faber Castell",
    price: 3000,
    category: "Alat Tulis",
    stock: 47,
  },
  {
    name: "Penghapus Big",
    description: "Penghapus ukuran besar",
    price: 1000,
    category: "Alat Tulis",
    stock: 26,
  },

  // === KESEHATAN / OBAT ===
  {
    name: "Minyak Tawon DD",
    description: "Minyak gosok Tawon DD",
    price: 28000,
    category: "Lainnya",
    stock: 2,
  },
  {
    name: "Minyak Tawon EE",
    description: "Minyak gosok Tawon EE",
    price: 55000,
    category: "Lainnya",
    stock: 6,
  },
  {
    name: "Minyak Kayu Putih",
    description: "Minyak kayu putih",
    price: 20500,
    category: "Lainnya",
    stock: 1,
  },
  {
    name: "Ultra Flu",
    description: "Obat flu Ultra Flu",
    price: 4000,
    category: "Lainnya",
    stock: 11,
  },
  {
    name: "Freshcare Patch",
    description: "Koyo aroma terapi Freshcare Patch",
    price: 12000,
    category: "Lainnya",
    stock: 9,
  },
  {
    name: "Minyak Freshcare Hot",
    description: "Minyak angin Freshcare Hot",
    price: 13000,
    category: "Lainnya",
    stock: 3,
  },
  {
    name: "Freshcare Citrus",
    description: "Minyak angin Freshcare Citrus",
    price: 13000,
    category: "Lainnya",
    stock: 2,
  },
  {
    name: "Betadine",
    description: "Antiseptik Betadine",
    price: 5000,
    category: "Lainnya",
    stock: 1,
  },

  // === LAINNYA ===
  {
    name: "Bedak Sunisa",
    description: "Bedak padat Sunisa",
    price: 35000,
    category: "Lainnya",
    stock: 6,
  },
  {
    name: "Bedak Marks",
    description: "Bedak padat Marks",
    price: 18000,
    category: "Lainnya",
    stock: 9,
  },
  {
    name: "Jarum Pentul",
    description: "Jarum pentul",
    price: 2000,
    category: "Lainnya",
    stock: 33,
  },
  {
    name: "Pin Korpri Tebel",
    description: "Pin Korpri model tebal",
    price: 20000,
    category: "Lainnya",
    stock: 8,
  },
  {
    name: "Pin Korpri Biasa",
    description: "Pin Korpri model biasa",
    price: 10000,
    category: "Lainnya",
    stock: 4,
  },
  {
    name: "Bed Kabupaten Tuban 1 Set",
    description: "Badge/bed Kabupaten Tuban satu set lengkap",
    price: 7500,
    category: "Lainnya",
    stock: 46,
  },
];

async function main() {
  console.log("Menambahkan produk baru...\n");

  let successCount = 0;
  let variantCount = 0;

  // Tambah produk dengan varian
  for (const p of variantProducts) {
    try {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock,
          imageUrl: p.imageUrl,
          variants: {
            create: p.variants,
          },
        },
      });
      console.log(`✅ ${p.name} (${p.variants.length} ukuran)`);
      successCount++;
      variantCount += p.variants.length;
    } catch (e) {
      console.error(`❌ ${p.name}: ${e.message}`);
    }
  }

  // Tambah produk tanpa varian
  for (const p of simpleProducts) {
    try {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock,
          imageUrl: null,
        },
      });
      console.log(`✅ ${p.name} (stok: ${p.stock})`);
      successCount++;
    } catch (e) {
      console.error(`❌ ${p.name}: ${e.message}`);
    }
  }

  const total = variantProducts.length + simpleProducts.length;
  console.log(`\n${successCount}/${total} produk berhasil ditambahkan.`);
  console.log(`${variantCount} varian ukuran ditambahkan.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
