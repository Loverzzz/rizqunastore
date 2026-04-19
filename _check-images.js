const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma.product
  .findMany({
    where: { imageUrl: { not: null } },
    select: { name: true, imageUrl: true },
    orderBy: { name: "asc" },
  })
  .then((r) => {
    if (r.length === 0) console.log("Tidak ada produk dengan imageUrl.");
    r.forEach((x) => console.log(`${x.name} | ${x.imageUrl}`));
  })
  .finally(() => prisma.$disconnect());
