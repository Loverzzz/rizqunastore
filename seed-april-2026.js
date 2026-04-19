const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const newProducts = [
  // === PRAMUKA & SERAGAM ===
  {
    name: "Tali Tampar",
    description: "Tali tampar",
    price: 15000,
    category: "Seragam Pramuka",
    stock: 116,
  },
  {
    name: "Bendera Semaphore",
    description: "Bendera semaphore pramuka",
    price: 10000,
    category: "Seragam Pramuka",
    stock: 18,
  },
  {
    name: "Hasduk Satin",
    description: "Hasduk/setangan leher bahan satin",
    price: 23000,
    category: "Seragam Pramuka",
    stock: 1,
  },
  {
    name: "Hasduk SMA",
    description: "Hasduk/setangan leher pramuka SMA",
    price: 20000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Hasduk SD",
    description: "Hasduk/setangan leher pramuka SD",
    price: 15000,
    category: "Seragam Pramuka",
    stock: 15,
  },
  {
    name: "Hasduk SMP",
    description: "Hasduk/setangan leher pramuka SMP",
    price: 17000,
    category: "Seragam Pramuka",
    stock: 48,
  },

  // === JAM & AKSESORI ===
  {
    name: "Jam Guess",
    description: "Jam tangan Guess",
    price: 40000,
    category: "Lainnya",
    stock: 4,
  },
  {
    name: "Jam DW",
    description: "Jam tangan DW",
    price: 30000,
    category: "Lainnya",
    stock: 9,
  },
  {
    name: "Baterai Jam Tangan Sony",
    description: "Baterai jam tangan merek Sony",
    price: 4000,
    category: "Lainnya",
    stock: 106,
  },

  // === ALAT TULIS - TIPE-X ===
  {
    name: "Tipe-X Joyko",
    description: "Tipe-x/correction pen merek Joyko",
    price: 6000,
    category: "Alat Tulis",
    stock: 5,
  },
  {
    name: "Tipe-X Kenko",
    description: "Tipe-x/correction pen merek Kenko",
    price: 6000,
    category: "Alat Tulis",
    stock: 16,
  },
  {
    name: "Tipe-X BT21",
    description: "Tipe-x/correction pen motif BT21",
    price: 3000,
    category: "Alat Tulis",
    stock: 1,
  },
  {
    name: "Tipe-X Vtec",
    description: "Tipe-x/correction pen merek Vtec",
    price: 5000,
    category: "Alat Tulis",
    stock: 14,
  },
  {
    name: "Tipe-X GM",
    description: "Tipe-x/correction pen merek GM",
    price: 5000,
    category: "Alat Tulis",
    stock: 2,
  },
  {
    name: "Tipe-X Sunwell",
    description: "Tipe-x/correction pen merek Sunwell",
    price: 5000,
    category: "Alat Tulis",
    stock: 15,
  },
  {
    name: "Tipe-X Joyko Motif",
    description: "Tipe-x/correction pen Joyko motif",
    price: 5500,
    category: "Alat Tulis",
    stock: 6,
  },

  // === ALAT TULIS - LEM & GLUE ===
  {
    name: "Vtec Glue Stick Kecil",
    description: "Lem stick Vtec ukuran kecil",
    price: 5000,
    category: "Alat Tulis",
    stock: 26,
  },
  {
    name: "Vtec Glue Stick Besar",
    description: "Lem stick Vtec ukuran besar",
    price: 7000,
    category: "Alat Tulis",
    stock: 0,
  },
  {
    name: "Lem Castol",
    description: "Lem merek Castol",
    price: 7000,
    category: "Alat Tulis",
    stock: 11,
  },
  {
    name: "Lem O-Glue",
    description: "Lem merek O-Glue",
    price: 4000,
    category: "Alat Tulis",
    stock: 8,
  },
  {
    name: "Lem Povinal",
    description: "Lem Povinal",
    price: 6000,
    category: "Alat Tulis",
    stock: 12,
  },
  {
    name: "Lem Bakar",
    description: "Lem tembak/lem bakar (hot glue)",
    price: 2000,
    category: "Alat Tulis",
    stock: 117,
  },

  // === ALAT TULIS - LAINNYA ===
  {
    name: "Highlighter Joyko",
    description: "Stabilo/highlighter merek Joyko",
    price: 5000,
    category: "Alat Tulis",
    stock: 14,
  },
  {
    name: "Ongotan",
    description: "Ongotan/staple remover",
    price: 3000,
    category: "Alat Tulis",
    stock: 21,
  },
  {
    name: "Ongotan Pistol",
    description: "Ongotan/staple remover model pistol",
    price: 3500,
    category: "Alat Tulis",
    stock: 46,
  },
  {
    name: "Label Nama",
    description: "Stiker/label nama",
    price: 5000,
    category: "Alat Tulis",
    stock: 28,
  },
  {
    name: "Kertas Gambar",
    description: "Kertas gambar",
    price: 5000,
    category: "Alat Tulis",
    stock: 12,
  },
  {
    name: "Origami 12x12",
    description: "Kertas origami ukuran 12x12 cm",
    price: 2500,
    category: "Alat Tulis",
    stock: 16,
  },
  {
    name: "Origami 14x14",
    description: "Kertas origami ukuran 14x14 cm",
    price: 3000,
    category: "Alat Tulis",
    stock: 12,
  },
  {
    name: "Origami 16x16",
    description: "Kertas origami ukuran 16x16 cm",
    price: 4000,
    category: "Alat Tulis",
    stock: 33,
  },
  {
    name: "Origami 20x20",
    description: "Kertas origami ukuran 20x20 cm",
    price: 5000,
    category: "Alat Tulis",
    stock: 14,
  },
  {
    name: "Sticky Note Kecil",
    description: "Sticky note/notes tempel ukuran kecil",
    price: 5500,
    category: "Alat Tulis",
    stock: 8,
  },

  // === SOLASI & LAKBAN ===
  {
    name: "Solasi Kecil",
    description: "Solasi/selotip ukuran kecil",
    price: 2000,
    category: "Alat Tulis",
    stock: 26,
  },
  {
    name: "Solasi Tanggung",
    description: "Solasi/selotip ukuran tanggung",
    price: 8000,
    category: "Alat Tulis",
    stock: 3,
  },
  {
    name: "Solasi/Lakban Besar",
    description: "Solasi/lakban bening ukuran besar",
    price: 10000,
    category: "Alat Tulis",
    stock: 5,
  },
  {
    name: "Lakban Hitam Sedang",
    description: "Lakban hitam ukuran sedang",
    price: 11000,
    category: "Alat Tulis",
    stock: 11,
  },
  {
    name: "Lakban Hitam Besar",
    description: "Lakban hitam ukuran besar",
    price: 15000,
    category: "Alat Tulis",
    stock: 10,
  },
  {
    name: "Double Tip",
    description: "Double tip/double-sided tape",
    price: 3500,
    category: "Alat Tulis",
    stock: 4,
  },
];

async function main() {
  console.log("Menambahkan produk baru (April 2026)...\n");

  let sukses = 0;
  let gagal = 0;

  for (const p of newProducts) {
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

  console.log(`\n✔ ${sukses} produk berhasil ditambahkan.`);
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
