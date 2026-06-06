const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    // Kaos
    { name: "Kaos Vivo Collection", price: 40000, stock: 3, category: "Kaos", description: "Kaos Vivo Collection, desain trendy" },
    { name: "Kaos Athlete", price: 85000, stock: 1, category: "Kaos", description: "Kaos Athlete, bahan premium sport" },
    { name: "Kaos D'Best XXL", price: 32000, stock: 8, category: "Kaos", description: "Kaos D'Best ukuran XXL" },
    { name: "Kaos D'Best XL", price: 30000, stock: 1, category: "Kaos", description: "Kaos D'Best ukuran XL" },
    { name: "Kaos D'Best L", price: 28000, stock: 1, category: "Kaos", description: "Kaos D'Best ukuran L" },
    { name: "Kaos Dujati XL", price: 38000, stock: 2, category: "Kaos", description: "Kaos Dujati ukuran XL" },
    { name: "Kaos Bos Muda XXL", price: 32000, stock: 1, category: "Kaos", description: "Kaos Bos Muda ukuran XXL" },
    { name: "Kaos Blast XXXL", price: 35000, stock: 3, category: "Kaos", description: "Kaos Blast ukuran XXXL" },
    { name: "Kaos Blast L", price: 28000, stock: 1, category: "Kaos", description: "Kaos Blast ukuran L" },
    { name: "Kaos Hankey M", price: 42000, stock: 4, category: "Kaos", description: "Kaos Hankey ukuran M" },

    // Dress & Baju Anak
    { name: "Dress Mikayla", price: 55000, stock: 7, category: "Dress", description: "Dress Mikayla, cantik dan elegan" },
    { name: "Kaos Anak Adios", price: 23000, stock: 4, category: "Baju Anak", description: "Kaos anak Adios, nyaman untuk aktifitas" },
    { name: "Kaos Anak Ajwa", price: 32000, stock: 3, category: "Baju Anak", description: "Kaos anak Ajwa, bahan adem" },
    { name: "Setcel Anak", price: 45000, stock: 3, category: "Baju Anak", description: "Setelan celana anak, lengkap dan nyaman" },
    { name: "Setelan Anak Elcio", price: 25000, stock: 6, category: "Baju Anak", description: "Setelan anak Elcio, praktis dan modis" },

    // Daster
    { name: "Daster Ibu", price: 40000, stock: 5, category: "Daster", description: "Daster ibu, nyaman untuk di rumah" },
    { name: "Daster Aura", price: 45000, stock: 2, category: "Daster", description: "Daster Aura, bahan halus dan adem" },
    { name: "Daster Kelelawar", price: 40000, stock: 5, category: "Daster", description: "Daster kelelawar, model simpel" },
    { name: "Daster Burberry", price: 40000, stock: 3, category: "Daster", description: "Daster Burberry, desain mewah" },
    { name: "Daster Sakina", price: 40000, stock: 1, category: "Daster", description: "Daster Sakina, sopan dan nyaman" },
    { name: "Daster Lea", price: 42000, stock: 1, category: "Daster", description: "Daster Lea, model modern" },
    { name: "Daster Anum Fashion", price: 60000, stock: 1, category: "Daster", description: "Daster Anum Fashion, premium" },
    { name: "Daster Reni", price: 45000, stock: 1, category: "Daster", description: "Daster Reni, elegan untuk sehari-hari" },
    { name: "Setcel Pendek Sakina", price: 50000, stock: 3, category: "Daster", description: "Setelan celana pendek Sakina" },
    { name: "Setcel Pendek Tiara", price: 45000, stock: 2, category: "Daster", description: "Setelan celana pendek Tiara" },
  ];

  console.log(`Menambahkan ${products.length} produk baru...`);

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category,
        description: p.description,
      },
    });
    console.log(`✅ ${product.name} - Rp ${p.price.toLocaleString("id-ID")} (stok: ${p.stock})`);
  }

  // Dress Dev Aurel - with variants (sizes)
  console.log(`\nMenambahkan Dress Dev Aurel dengan varian ukuran...`);
  const dressDevAurel = await prisma.product.create({
    data: {
      name: "Dress Dev Aurel (Baju Turun Naik)",
      price: 36000, // lowest variant price
      stock: 12, // total stock
      category: "Dress",
      description: "Dress Dev Aurel baju turun naik, tersedia berbagai ukuran",
      variants: {
        create: [
          { label: "UK 8", price: 36000, stock: 1 },
          { label: "UK 10", price: 40000, stock: 5 },
          { label: "UK 12", price: 42000, stock: 3 },
          { label: "UK 14", price: 44000, stock: 1 },
          { label: "UK 18", price: 48000, stock: 1 },
          { label: "UK 20", price: 50000, stock: 1 },
        ],
      },
    },
  });
  console.log(`✅ ${dressDevAurel.name} - 6 varian ukuran (UK 8-20)`);

  console.log(`\n🎉 Selesai! ${products.length + 1} produk berhasil ditambahkan.`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });