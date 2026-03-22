const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    name: "Buku Tulis Sinar Dunia 58 Lembar (Pack)",
    description: "Buku tulis berkualitas tinggi, isi 10 buku per pack.",
    price: 35000,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Alat Tulis",
    stock: 50,
  },
  {
    name: "Beras Premium Pulen 5Kg",
    description: "Beras putih pulen pilihan keluarga.",
    price: 75000,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
    category: "Sembako",
    stock: 20,
  },
  {
    name: "Minyak Goreng Bimoli 2 Liter",
    description: "Minyak goreng kelapa sawit jernih.",
    price: 38000,
    imageUrl: "https://images.unsplash.com/photo-1620600465549-38b4383c26cb?q=80&w=600&auto=format&fit=crop",
    category: "Sembako",
    stock: 30,
  },
  {
    name: "Chitato Sapi Panggang 68g",
    description: "Keripik kentang renyah rasa sapi panggang.",
    price: 11000,
    imageUrl: "https://images.unsplash.com/photo-1566418361715-ddc6375a0224?q=80&w=600&auto=format&fit=crop",
    category: "Jajanan",
    stock: 100,
  },
  {
    name: "Pulpen Kenko Gel 0.5mm (Box)",
    description: "Pulpen gel hitam anti macet isi 12 pcs.",
    price: 24000,
    imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295a5f97?q=80&w=600&auto=format&fit=crop",
    category: "Alat Tulis",
    stock: 40,
  }
];

async function main() {
  console.log('Seeding database...');
  for (const product of products) {
    const p = await prisma.product.create({
      data: product
    });
    console.log(`Created: ${p.id} - ${p.name}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
