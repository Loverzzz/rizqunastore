const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Gamis Anak Alifa Fashion", price: 106000, stock: 2, category: "Gamis", description: "Gamis anak Alifa Fashion, sopan dan cantik" },
    { name: "Dress Fung Lie Jilbab", price: 45000, stock: 4, category: "Dress", description: "Dress Fung Lie dengan jilbab, set lengkap" },
    { name: "Atasan Blouse Cewek", price: 120000, stock: 1, category: "Atasan", description: "Atasan blouse cewek, elegan dan feminin" },
    { name: "Atasan Panjang CV", price: 65000, stock: 1, category: "Atasan", description: "Atasan panjang CV, nyaman dan sopan" },
    { name: "One Set Miracle", price: 155000, stock: 1, category: "Atasan", description: "One set Miracle, set lengkap dan mewah" },
    { name: "Sweater Hoodie FJR", price: 50000, stock: 6, category: "Kaos", description: "Sweater hoodie FJR, hangat dan stylish" },
    { name: "Setelan 3Second", price: 70000, stock: 2, category: "Atasan", description: "Setelan 3Second, casual dan trendy" },
    { name: "Kaos Tunik", price: 65000, stock: 2, category: "Atasan", description: "Kaos tunik, simpel dan nyaman" },
    { name: "One Set Pajamas Lady", price: 75000, stock: 1, category: "Daster", description: "One set pajamas lady, nyaman untuk tidur" },
    { name: "Dress Rompi Seven Authentic", price: 155000, stock: 4, category: "Dress", description: "Dress rompi Seven Authentic, premium" },
    { name: "Celana Jeans Caesar", price: 100000, stock: 1, category: "Celana", description: "Celana jeans Caesar, bahan denim berkualitas" },
    { name: "Celana Panjang Oskosh", price: 60000, stock: 3, category: "Celana", description: "Celana panjang Oskosh, nyaman untuk anak" },
    { name: "Celana Pendek Oskosh", price: 38000, stock: 5, category: "Celana", description: "Celana pendek Oskosh, praktis untuk anak" },
    { name: "Celana Fasya Kids", price: 50000, stock: 1, category: "Celana", description: "Celana Fasya Kids, nyaman untuk anak" },
    { name: "Celana Pendek PEWE", price: 65000, stock: 4, category: "Celana", description: "Celana pendek PEWE, stylish dan nyaman" },
    { name: "Celana Pendek Factory", price: 60000, stock: 1, category: "Celana", description: "Celana pendek Factory, casual" },
    { name: "Gamis Salur/Stripe No Label", price: 95000, stock: 8, category: "Gamis", description: "Gamis salur/stripe tanpa label, simpel" },
    { name: "Setelan Rok Stripe", price: 90000, stock: 2, category: "Gamis", description: "Setelan rok stripe, cantik dan elegan" },
    { name: "Atasan A.Asyiah", price: 120000, stock: 1, category: "Atasan", description: "Atasan A.Asyiah, desain mewah" },
    { name: "Atasan Tunik", price: 90000, stock: 4, category: "Atasan", description: "Atasan tunik, sopan dan modis" },
    { name: "Kemeja Flanel Dippo", price: 75000, stock: 1, category: "Atasan", description: "Kemeja flanel Dippo, kasual dan hangat" },
    { name: "Kemeja Strip Bunga", price: 65000, stock: 1, category: "Atasan", description: "Kemeja strip bunga, feminin dan cantik" },
    { name: "Tunik Motif Minq", price: 200000, stock: 6, category: "Atasan", description: "Tunik motif Minq, premium dan eksklusif" },
    { name: "Tunik Motif Zara", price: 160000, stock: 2, category: "Atasan", description: "Tunik motif Zara, desain mewah" },
  ];

  console.log("Menambahkan " + products.length + " produk baru...");
  for (const p of products) {
    const product = await prisma.product.create({ data: p });
    console.log("✅ " + product.name + " - Rp " + p.price.toLocaleString("id-ID") + " (stok: " + p.stock + ")");
  }

  const variantProducts = [
    {
      name: "Baju Dress Pesta",
      category: "Dress",
      description: "Baju dress pesta, cocok untuk acara spesial",
      variants: [
        { label: "S", price: 50000, stock: 3 },
        { label: "M", price: 55000, stock: 2 },
        { label: "L", price: 60000, stock: 1 },
      ],
    },
    {
      name: "Setcel We3",
      category: "Baju Anak",
      description: "Setelan celana We3, trendy untuk anak",
      variants: [
        { label: "UK 4", price: 40000, stock: 1 },
        { label: "UK 10", price: 48000, stock: 1 },
        { label: "UK 12", price: 50000, stock: 3 },
        { label: "UK 14", price: 52000, stock: 5 },
      ],
    },
    {
      name: "Celana Jeans E&K Panjang",
      category: "Celana",
      description: "Celana jeans E&K panjang, denim berkualitas",
      variants: [
        { label: "UK 31", price: 95000, stock: 1 },
        { label: "UK 32", price: 95000, stock: 1 },
        { label: "UK 33", price: 100000, stock: 2 },
        { label: "UK 34", price: 100000, stock: 1 },
        { label: "UK 35", price: 105000, stock: 3 },
        { label: "UK 36", price: 105000, stock: 1 },
        { label: "UK 38", price: 110000, stock: 1 },
      ],
    },
    {
      name: "Jeans Pendek Orexas",
      category: "Celana",
      description: "Jeans pendek Orexas, casual dan stylish",
      variants: [
        { label: "UK 27", price: 60000, stock: 2 },
        { label: "UK 28", price: 65000, stock: 1 },
        { label: "UK 29", price: 70000, stock: 1 },
      ],
    },
  ];

  console.log("\nMenambahkan " + variantProducts.length + " produk dengan varian...");
  for (const vp of variantProducts) {
    const lowestPrice = Math.min(...vp.variants.map((v) => v.price));
    const totalStock = vp.variants.reduce((sum, v) => sum + v.stock, 0);
    const product = await prisma.product.create({
      data: {
        name: vp.name,
        price: lowestPrice,
        stock: totalStock,
        category: vp.category,
        description: vp.description,
        variants: { create: vp.variants },
      },
    });
    console.log("✅ " + product.name + " - " + vp.variants.length + " varian (stok total: " + totalStock + ")");
  }

  console.log("\n🎉 Selesai! " + (products.length + variantProducts.length) + " produk berhasil ditambahkan.");
}

main()
  .catch((e) => { console.error("❌ Error:", e.message); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });