const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ============================================================
// PRODUK DENGAN VARIAN UKURAN
// ============================================================
const variantProducts = [
  {
    name: "Buku Gambar",
    description: "Buku gambar",
    price: 4500,
    category: "Alat Tulis",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "A3", price: 7500, stock: 12 },
      { label: "A4", price: 4500, stock: 0 },
    ],
  },
  {
    name: "Kwitansi",
    description: "Blok kwitansi",
    price: 3000,
    category: "Alat Tulis",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "Kecil", price: 3000, stock: 8 },
      { label: "Besar", price: 5000, stock: 10 },
    ],
  },
  {
    name: "Binder Clip",
    description: "Klip binder/jepitan kertas aneka ukuran",
    price: 500,
    category: "Alat Tulis",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "No.107", price: 500, stock: 108 },
      { label: "No.155", price: 1000, stock: 71 },
      { label: "No.200", price: 10500, stock: 3 },
      { label: "No.280 V-Tec", price: 3000, stock: 6 },
    ],
  },
  {
    name: "Bendera Merah Putih",
    description: "Bendera merah putih",
    price: 15000,
    category: "Lainnya",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "60x70 cm", price: 15000, stock: 12 },
      { label: "90x120 cm", price: 30000, stock: 26 },
    ],
  },
  {
    name: "Kuas Cat",
    description: "Kuas melukis/kuas cat",
    price: 2500,
    category: "Alat Tulis",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 2", price: 2500, stock: 6 },
      { label: "UK 3", price: 3500, stock: 10 },
      { label: "UK 3 (kecil)", price: 3000, stock: 11 },
      { label: "UK 4", price: 3500, stock: 3 },
      { label: "UK 6", price: 4500, stock: 10 },
    ],
  },
];

// ============================================================
// PRODUK TANPA VARIAN
// ============================================================
const simpleProducts = [
  // === BUKU ===
  {
    name: "Buku Akuntansi",
    description: "Buku akuntansi",
    price: 15000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Buku 3 Kolom",
    description: "Buku 3 kolom",
    price: 15000,
    category: "Alat Tulis",
    stock: 4,
  },
  {
    name: "Notebook",
    description: "Notebook/buku catatan kecil",
    price: 5000,
    category: "Alat Tulis",
    stock: 8,
  },
  {
    name: "Buku Agenda",
    description: "Buku agenda/diary",
    price: 25000,
    category: "Alat Tulis",
    stock: 2,
  },

  // === LEM ===
  {
    name: "Lem Giakol",
    description: "Lem merek Giakol",
    price: 2000,
    category: "Alat Tulis",
    stock: 10,
  },
  {
    name: "Lem Fox",
    description: "Lem merek Fox",
    price: 12000,
    category: "Alat Tulis",
    stock: 3,
  },

  // === ALAT TULIS ===
  {
    name: "Penghapus Papan",
    description: "Penghapus papan tulis/whiteboard",
    price: 7000,
    category: "Alat Tulis",
    stock: 7,
  },
  {
    name: "Paper Clip Joyko",
    description: "Klip kertas merek Joyko",
    price: 5000,
    category: "Alat Tulis",
    stock: 11,
  },
  {
    name: "Isi Staples",
    description: "Isi staples refill",
    price: 3500,
    category: "Alat Tulis",
    stock: 53,
  },
  {
    name: "Staples",
    description: "Mesin stapler",
    price: 10000,
    category: "Alat Tulis",
    stock: 17,
  },
  {
    name: "Kertas Folio",
    description: "Kertas folio (harga per 3 lembar)",
    price: 2000,
    category: "Alat Tulis",
    stock: 90,
  },
  {
    name: "Kain Flanel",
    description: "Kain flanel untuk kerajinan",
    price: 2000,
    category: "Alat Tulis",
    stock: 82,
  },

  // === MAP & FOLDER ===
  {
    name: "Bag Folder Vis",
    description: "Bag folder merek Vis",
    price: 4000,
    category: "Alat Tulis",
    stock: 20,
  },
  {
    name: "Map Coklat",
    description: "Map kertas warna coklat",
    price: 5000,
    category: "Alat Tulis",
    stock: 18,
  },
  {
    name: "Map Kertas",
    description: "Map kertas",
    price: 1000,
    category: "Alat Tulis",
    stock: 85,
  },
  {
    name: "Map Plastik",
    description: "Map plastik transparan",
    price: 10000,
    category: "Alat Tulis",
    stock: 12,
  },
  {
    name: "Map Spring",
    description: "Map spring/map binder",
    price: 30000,
    category: "Alat Tulis",
    stock: 29,
  },

  // === KOTAK PENSIL ===
  {
    name: "Kotak Pensil Labubu Kain",
    description: "Kotak pensil bahan kain motif Labubu",
    price: 15000,
    category: "Alat Tulis",
    stock: 9,
  },
  {
    name: "Kotak Pensil Kain Frozen",
    description: "Kotak pensil bahan kain motif Frozen",
    price: 14500,
    category: "Alat Tulis",
    stock: 1,
  },
  {
    name: "Kotak Pensil Frozen Magnet",
    description: "Kotak pensil Frozen dengan magnet",
    price: 12500,
    category: "Alat Tulis",
    stock: 1,
  },
  {
    name: "Kotak Pensil BC670",
    description: "Kotak pensil model BC670",
    price: 23000,
    category: "Alat Tulis",
    stock: 4,
  },
  {
    name: "Kotak Pensil SPS8631",
    description: "Kotak pensil model SPS8631",
    price: 23000,
    category: "Alat Tulis",
    stock: 5,
  },
  {
    name: "Kotak Pensil C62065",
    description: "Kotak pensil model C62065",
    price: 20000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Kotak Pensil Besi",
    description: "Kotak pensil dari besi/logam",
    price: 19000,
    category: "Alat Tulis",
    stock: 1,
  },

  // === SPIDOL & CAT ===
  {
    name: "Spidol GM",
    description: "Spidol merek GM",
    price: 13000,
    category: "Alat Tulis",
    stock: 9,
  },
  {
    name: "Pallet Bunga",
    description: "Palet cat motif bunga",
    price: 5000,
    category: "Alat Tulis",
    stock: 3,
  },
  {
    name: "Pallet Dino",
    description: "Palet cat motif dinosaurus",
    price: 5000,
    category: "Alat Tulis",
    stock: 6,
  },
  {
    name: "Cat Air",
    description: "Cat air untuk melukis",
    price: 12000,
    category: "Alat Tulis",
    stock: 18,
  },

  // === ONGOTAN / STAPLER MODEL ===
  {
    name: "Ongotan 18111",
    description: "Stapler model 18111",
    price: 42000,
    category: "Alat Tulis",
    stock: 4,
  },
  {
    name: "Ongotan 6631",
    description: "Stapler model 6631",
    price: 37000,
    category: "Alat Tulis",
    stock: 1,
  },
  {
    name: "Ongotan 6500",
    description: "Stapler model 6500",
    price: 37000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Ongotan 7707",
    description: "Stapler model 7707",
    price: 24000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Ongotan 2375",
    description: "Stapler model 2375",
    price: 32000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Ongotan 0053",
    description: "Stapler model 0053",
    price: 32000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Ongotan Qianlimu",
    description: "Stapler merek Qianlimu",
    price: 35000,
    category: "Alat Tulis",
    stock: 3,
  },

  // === SAMPUL BUKU (SAMAK) ===
  {
    name: "Samak Batik",
    description: "Sampul buku motif batik (harga per 3 lembar)",
    price: 2000,
    category: "Alat Tulis",
    stock: 210,
  },
  {
    name: "Samak Coklat",
    description: "Sampul buku warna coklat (harga per 3 lembar)",
    price: 2000,
    category: "Alat Tulis",
    stock: 160,
  },
  {
    name: "Samak Coklat Anak",
    description: "Sampul buku coklat ukuran anak",
    price: 500,
    category: "Alat Tulis",
    stock: 38,
  },
  {
    name: "Samak Plastik Tebal Buku Kecil",
    description: "Sampul plastik tebal buku kecil (harga per 3 lembar)",
    price: 2000,
    category: "Alat Tulis",
    stock: 550,
  },
  {
    name: "Samak Plastik Tipis Buku Kecil",
    description: "Sampul plastik tipis buku kecil",
    price: 500,
    category: "Alat Tulis",
    stock: 85,
  },
  {
    name: "Samak Plastik LKS",
    description: "Sampul plastik untuk LKS (harga per 3 lembar)",
    price: 2000,
    category: "Alat Tulis",
    stock: 86,
  },
  {
    name: "Samak Plastik Boxing",
    description: "Sampul plastik boxing",
    price: 1000,
    category: "Alat Tulis",
    stock: 188,
  },

  // === BENDERA ===
  {
    name: "Bendera 17an Renteng",
    description: "Bendera 17 Agustus model renteng",
    price: 6500,
    category: "Lainnya",
    stock: 19,
  },
  {
    name: "Bendera 17an Pluit",
    description: "Bendera 17 Agustus model pluit",
    price: 1500,
    category: "Lainnya",
    stock: 93,
  },
  {
    name: "Bendera Tunas 90x120",
    description: "Bendera tunas kelapa ukuran 90x120 cm",
    price: 30000,
    category: "Seragam Pramuka",
    stock: 20,
  },
  {
    name: "Bendera Wosem 90x120",
    description: "Bendera Wosem ukuran 90x120 cm",
    price: 30000,
    category: "Seragam Pramuka",
    stock: 20,
  },

  // === SERAGAM PRAMUKA ===
  {
    name: "Tetampan Hijau",
    description: "Tetampan pramuka warna hijau",
    price: 11000,
    category: "Seragam Pramuka",
    stock: 10,
  },
  {
    name: "Tetampan Merah 1 Rumbai",
    description: "Tetampan merah 1 rumbai",
    price: 11000,
    category: "Seragam Pramuka",
    stock: 60,
  },
  {
    name: "Tetampan Merah 2 Rumbai",
    description: "Tetampan merah 2 rumbai",
    price: 22000,
    category: "Seragam Pramuka",
    stock: 19,
  },
  {
    name: "Tongkat Semaphore",
    description: "Tongkat semaphore pramuka",
    price: 15000,
    category: "Seragam Pramuka",
    stock: 19,
  },

  // === ELEKTRONIK ===
  {
    name: "Tablet LCD Anak",
    description: "Tablet LCD tulis hapus untuk anak",
    price: 22000,
    category: "Lainnya",
    stock: 22,
  },
];

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("Menambahkan produk batch 2 (April 2026)...\n");

  let sukses = 0;
  let gagal = 0;

  // Produk dengan varian
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
          variants: { create: p.variants },
        },
      });
      console.log(`✅ ${p.name} (${p.variants.length} varian)`);
      sukses++;
    } catch (e) {
      console.error(`❌ ${p.name}: ${e.message}`);
      gagal++;
    }
  }

  // Produk tanpa varian
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
      console.log(
        `✅ ${p.name} — stok: ${p.stock}, harga: ${p.price.toLocaleString("id-ID")}`,
      );
      sukses++;
    } catch (e) {
      console.error(`❌ ${p.name}: ${e.message}`);
      gagal++;
    }
  }

  const total = variantProducts.length + simpleProducts.length;
  console.log(`\n✔ ${sukses}/${total} produk berhasil ditambahkan.`);
  if (gagal > 0) console.log(`✘ ${gagal} produk gagal.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
