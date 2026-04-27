const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
  // ============================================================
  // SEPATU
  // ============================================================
  {
    name: "Sepatu Shandy",
    description: "Sepatu Shandy aneka ukuran",
    price: 57500,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 32", price: 57500, stock: 1 },
      { label: "UK 37", price: 60000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att PA700",
    description: "Sepatu Pro Att seri PA700",
    price: 116000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 42", price: 116000, stock: 1 },
      { label: "UK 43", price: 126000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att MA900",
    description: "Sepatu Pro Att seri MA900",
    price: 124000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 37", price: 124000, stock: 1 },
      { label: "UK 38", price: 134000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att PI600",
    description: "Sepatu Pro Att seri PI600",
    price: 114000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 36", price: 114000, stock: 1 },
      { label: "UK 38", price: 134000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att PC950",
    description: "Sepatu Pro Att seri PC950",
    price: 132000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [{ label: "UK 42", price: 132000, stock: 2 }],
  },
  {
    name: "Sepatu Pro Att GI351V",
    description: "Sepatu Pro Att seri GI 351V",
    price: 96500,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 31", price: 96500, stock: 1 },
      { label: "UK 33", price: 116500, stock: 1 },
      { label: "UK 34", price: 126500, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att MGA490V",
    description: "Sepatu Pro Att seri MGA 490V",
    price: 122000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 30", price: 122000, stock: 1 },
      { label: "UK 33", price: 128000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att MCL670V",
    description: "Sepatu Pro Att seri MCL 670V",
    price: 124000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 37", price: 124000, stock: 1 },
      { label: "UK 38", price: 133000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att SHM261V",
    description: "Sepatu Pro Att seri SHM 261V",
    price: 105000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 33", price: 105000, stock: 1 },
      { label: "UK 34", price: 115000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att TEC750V",
    description: "Sepatu Pro Att seri TEC 750V",
    price: 105000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [{ label: "UK 33", price: 105000, stock: 1 }],
  },
  {
    name: "Sepatu Pro Att TEC890V",
    description: "Sepatu Pro Att seri TEC 890V",
    price: 124000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [{ label: "UK 37", price: 124000, stock: 1 }],
  },
  {
    name: "Sepatu Pro Att TEC890",
    description: "Sepatu Pro Att seri TEC 890",
    price: 124000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 37", price: 124000, stock: 1 },
      { label: "UK 38", price: 134000, stock: 1 },
    ],
  },
  {
    name: "Sepatu Pro Att CIA150V",
    description: "Sepatu Pro Att seri CIA 150V",
    price: 95000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [{ label: "UK 33", price: 95000, stock: 1 }],
  },
  {
    name: "Sepatu New Era Pro Lexus Denza",
    description: "Sepatu New Era Pro seri Lexus Denza",
    price: 106500,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 39", price: 106500, stock: 1 },
      { label: "UK 40", price: 111500, stock: 2 },
      { label: "UK 41", price: 116500, stock: 4 },
      { label: "UK 42", price: 121500, stock: 2 },
      { label: "UK 43", price: 126500, stock: 2 },
    ],
  },
  {
    name: "Sepatu New Era Pro Force One",
    description: "Sepatu New Era Pro seri Force One",
    price: 109000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 41", price: 109000, stock: 1 },
      { label: "UK 42", price: 114000, stock: 2 },
      { label: "UK 43", price: 119000, stock: 1 },
      { label: "UK 44", price: 124000, stock: 1 },
    ],
  },
  {
    name: "Sepatu New Era Pro Magneti",
    description: "Sepatu New Era Pro seri Magneti",
    price: 110000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 33", price: 110000, stock: 2 },
      { label: "UK 34", price: 115000, stock: 1 },
      { label: "UK 35", price: 120000, stock: 1 },
      { label: "UK 36", price: 125000, stock: 2 },
    ],
  },
  {
    name: "Sepatu New Era Pro Denza",
    description: "Sepatu New Era Pro seri Denza",
    price: 100000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 34", price: 100000, stock: 2 },
      { label: "UK 35", price: 105000, stock: 3 },
      { label: "UK 36", price: 110000, stock: 2 },
      { label: "UK 37", price: 115000, stock: 3 },
      { label: "UK 38", price: 120000, stock: 1 },
    ],
  },
  {
    name: "Sepatu New Era Pro Winner",
    description: "Sepatu New Era Pro seri Winner",
    price: 87500,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 35", price: 87500, stock: 1 },
      { label: "UK 36", price: 92500, stock: 2 },
      { label: "UK 37", price: 97500, stock: 2 },
      { label: "UK 38", price: 102500, stock: 1 },
    ],
  },
  {
    name: "Sepatu New Era Pro Virgo",
    description: "Sepatu New Era Pro seri Virgo",
    price: 100000,
    category: "Sepatu",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 40", price: 100000, stock: 2 },
      { label: "UK 41", price: 105000, stock: 1 },
      { label: "UK 42", price: 110000, stock: 1 },
      { label: "UK 43", price: 115000, stock: 2 },
    ],
  },

  // ============================================================
  // SANDAL
  // ============================================================
  {
    name: "Sandal Dewasa Pria New Era Profound",
    description: "Sandal dewasa pria New Era seri Profound",
    price: 37000,
    category: "Sandal",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 39", price: 37000, stock: 3 },
      { label: "UK 40", price: 39000, stock: 1 },
      { label: "UK 41", price: 42000, stock: 4 },
    ],
  },
  {
    name: "Sandal Selop New Era",
    description: "Sandal selop New Era",
    price: 35000,
    category: "Sandal",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 39", price: 35000, stock: 1 },
      { label: "UK 41", price: 38000, stock: 2 },
    ],
  },
  {
    name: "Sandal Selop X",
    description: "Sandal selop seri X",
    price: 35000,
    category: "Sandal",
    stock: 0,
    imageUrl: null,
    variants: [{ label: "UK 40", price: 35000, stock: 1 }],
  },
  {
    name: "Sandal Selop DK",
    description: "Sandal selop seri DK",
    price: 35000,
    category: "Sandal",
    stock: 0,
    imageUrl: null,
    variants: [
      { label: "UK 40", price: 35000, stock: 1 },
      { label: "UK 42", price: 43000, stock: 2 },
    ],
  },
  {
    name: "Sandal Selop Wanita",
    description: "Sandal selop wanita",
    price: 40000,
    category: "Sandal",
    stock: 3,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Wanita Breslin",
    description: "Sandal wanita seri Breslin",
    price: 35000,
    category: "Sandal",
    stock: 1,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sepatu Sandal Wanita",
    description: "Sepatu sandal wanita",
    price: 30000,
    category: "Sandal",
    stock: 5,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Karakter Cowok",
    description: "Sandal anak karakter cowok",
    price: 8000,
    category: "Sandal",
    stock: 5,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Cowok Anak Balacca",
    description: "Sandal anak cowok seri Balacca",
    price: 33000,
    category: "Sandal",
    stock: 2,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Cowok Dulux",
    description: "Sandal anak cowok seri Dulux",
    price: 30000,
    category: "Sandal",
    stock: 1,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Cowok Porto",
    description: "Sandal anak cowok seri Porto",
    price: 25000,
    category: "Sandal",
    stock: 1,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Together",
    description: "Sandal anak seri Together",
    price: 25000,
    category: "Sandal",
    stock: 4,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Morego",
    description: "Sandal anak seri Morego",
    price: 30000,
    category: "Sandal",
    stock: 3,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Anak Slop Dulux",
    description: "Sandal anak slop seri Dulux",
    price: 30000,
    category: "Sandal",
    stock: 3,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Remaja New Era",
    description: "Sandal remaja New Era",
    price: 45000,
    category: "Sandal",
    stock: 4,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Sepatu Morego Remaja",
    description: "Sandal sepatu remaja seri Morego",
    price: 45000,
    category: "Sandal",
    stock: 1,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Dulux 2-5 Tahun",
    description: "Sandal anak Dulux untuk usia 2-5 tahun",
    price: 25000,
    category: "Sandal",
    stock: 13,
    imageUrl: null,
    variants: [],
  },
  {
    name: "Sandal Senang",
    description: "Sandal Senang",
    price: 25000,
    category: "Sandal",
    stock: 2,
    imageUrl: null,
    variants: [],
  },
];

async function main() {
  console.log("Mulai memasukkan produk sepatu & sandal...");
  let created = 0;

  for (const p of products) {
    const { variants, ...productData } = p;

    const product = await prisma.product.create({
      data: {
        ...productData,
        variants:
          variants.length > 0
            ? {
                create: variants.map((v) => ({
                  label: v.label,
                  price: v.price,
                  stock: v.stock,
                })),
              }
            : undefined,
      },
    });

    console.log(`✓ ${product.name}`);
    created++;
  }

  console.log(`\nSelesai! ${created} produk berhasil ditambahkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
