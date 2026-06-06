const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Jilbab Plisket Segi 4", price: 20000, stock: 5, category: "Jilbab", description: "Jilbab plisket segi 4, nyaman dipakai sehari-hari" },
    { name: "Jilbab Azzara", price: 20000, stock: 19, category: "Jilbab", description: "Jilbab Azzara, bahan halus dan elegan" },
    { name: "Jilbab Motif", price: 30000, stock: 3, category: "Jilbab", description: "Jilbab motif, desain cantik dan modis" },
    { name: "Jilbab Motif Segi 4", price: 25000, stock: 6, category: "Jilbab", description: "Jilbab motif segi 4, motif menarik" },
    { name: "Jilbab Pad", price: 45000, stock: 1, category: "Jilbab", description: "Jilbab pad, premium dan nyaman" },
    { name: "Jilbab Pashmina Kelap Kelip", price: 35000, stock: 1, category: "Jilbab", description: "Jilbab pashmina kelap kelip, bahan mengkilap elegan" },
    { name: "Jilbab Plisket BR", price: 20000, stock: 16, category: "Jilbab", description: "Jilbab plisket BR, praktis dan rapi" },
    { name: "Jilbab Segi 4 Polos", price: 15000, stock: 14, category: "Jilbab", description: "Jilbab segi 4 polos, simpel dan nyaman" },
    { name: "Jilbab Segi 4 Motif", price: 35000, stock: 10, category: "Jilbab", description: "Jilbab segi 4 motif, desain modern" },
    { name: "Jilbab Segi 4 Polos 2", price: 16000, stock: 2, category: "Jilbab", description: "Jilbab segi 4 polos varian 2" },
    { name: "Jilbab Oskara", price: 20000, stock: 19, category: "Jilbab", description: "Jilbab Oskara, bahan lembut dan adem" },
    { name: "Jilbab Pad 2", price: 35000, stock: 12, category: "Jilbab", description: "Jilbab pad varian 2, nyaman dipakai" },
    { name: "Jilbab Wiru Besar", price: 35000, stock: 4, category: "Jilbab", description: "Jilbab wiru besar, elegan dan anggun" },
    { name: "Jilbab Wiru Kecil", price: 30000, stock: 11, category: "Jilbab", description: "Jilbab wiru kecil, simpel dan cantik" },
    { name: "Handuk Baby", price: 45000, stock: 1, category: "Handuk & Selimut", description: "Handuk baby, lembut untuk kulit bayi" },
    { name: "Handuk", price: 20000, stock: 3, category: "Handuk & Selimut", description: "Handuk serbaguna, tebal dan lembut" },
    { name: "Handuk Premium", price: 30000, stock: 16, category: "Handuk & Selimut", description: "Handuk premium, kualitas terbaik" },
    { name: "Selimut", price: 33000, stock: 13, category: "Handuk & Selimut", description: "Selimut hangat dan nyaman" },
    { name: "Sprei Bhe Bhe 180x120", price: 160000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei Bhe Bhe ukuran 180x120 cm" },
    { name: "Sprei Candi Mulyo 240x230", price: 200000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei Candi Mulyo ukuran 240x230 cm" },
    { name: "Sprei Vallery 200x200", price: 180000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei Vallery ukuran 200x200 cm" },
    { name: "Sprei Homemade 160x200", price: 95000, stock: 5, category: "Sprei & Bed Cover", description: "Sprei homemade ukuran 160x200 cm" },
    { name: "Sprei Homemade Premium 160x200", price: 85000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei homemade premium ukuran 160x200 cm" },
    { name: "Sprei Vallery Polos 180x200", price: 160000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei Vallery polos ukuran 180x200 cm" },
    { name: "Sprei Homemade 120x200", price: 70000, stock: 1, category: "Sprei & Bed Cover", description: "Sprei homemade ukuran 120x200 cm" },
    { name: "Bed Cover", price: 190000, stock: 1, category: "Sprei & Bed Cover", description: "Bed cover, desain elegan" },
    { name: "Sarung Bantal Sofa", price: 65000, stock: 1, category: "Rumah Tangga", description: "Sarung bantal sofa, mempercantik ruangan" },
    { name: "Serbet", price: 2000, stock: 68, category: "Rumah Tangga", description: "Serbet dapur, praktis dan menyerap air" },
    { name: "Taplak Motif", price: 35000, stock: 6, category: "Rumah Tangga", description: "Taplak motif, mempercantik meja makan" },
    { name: "Topi Kelinci", price: 15000, stock: 2, category: "Aksesoris", description: "Topi kelinci lucu untuk anak" },
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

  console.log(`\n🎉 Selesai! ${products.length} produk berhasil ditambahkan.`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });