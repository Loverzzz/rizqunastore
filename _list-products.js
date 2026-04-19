const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma.product
  .findMany({
    select: { name: true, price: true, stock: true, category: true },
    orderBy: { name: "asc" },
  })
  .then((r) =>
    r.forEach((x) =>
      console.log(`${x.name} | ${x.price} | stok:${x.stock} | ${x.category}`),
    ),
  )
  .finally(() => prisma.$disconnect());
