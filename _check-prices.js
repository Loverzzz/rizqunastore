const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  const products = await p.product.findMany({
    select: { name: true, price: true, category: true },
    orderBy: { name: 'asc' }
  });
  console.log('Total produk:', products.length);
  products.forEach(pr => {
    console.log(`${pr.category} | ${pr.name} | Rp ${pr.price.toLocaleString('id-ID')}`);
  });
  await p.$disconnect();
})();