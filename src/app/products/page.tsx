import { PrismaClient } from '@prisma/client';
import ProductList from '@/components/ProductList';
import { PackageSearch } from 'lucide-react';

const prisma = new PrismaClient();

// Disable caching for this route during development
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Fetch real products from DB
  let rawProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Fallback Dummy Data if DB is empty
  let products = rawProducts.length > 0 ? rawProducts.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  })) : [
    {
      id: '1',
      name: 'Buku Tulis Sinar Dunia 58 Lembar (Pack)',
      description: 'Buku tulis berkualitas tinggi, isi 10 buku per pack.',
      price: 35000,
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      category: 'Alat Tulis',
      stock: 50,
    },
    {
      id: '2',
      name: 'Beras Premium Pulen 5Kg',
      description: 'Beras putih pulen pilihan keluarga.',
      price: 75000,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop',
      category: 'Sembako',
      stock: 20,
    },
    {
      id: '3',
      name: 'Minyak Goreng Bimoli 2 Liter',
      description: 'Minyak goreng kelapa sawit jernih.',
      price: 38000,
      imageUrl: 'https://images.unsplash.com/photo-1620600465549-38b4383c26cb?q=80&w=600&auto=format&fit=crop',
      category: 'Sembako',
      stock: 30,
    },
    {
      id: '4',
      name: 'Chitato Sapi Panggang 68g',
      description: 'Keripik kentang renyah rasa sapi panggang.',
      price: 11000,
      imageUrl: 'https://images.unsplash.com/photo-1566418361715-ddc6375a0224?q=80&w=600&auto=format&fit=crop',
      category: 'Jajanan',
      stock: 100,
    },
    {
      id: '5',
      name: 'Pulpen Kenko Gel 0.5mm (Box)',
      description: 'Pulpen gel hitam anti macet isi 12 pcs.',
      price: 24000,
      imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295a5f97?q=80&w=600&auto=format&fit=crop',
      category: 'Alat Tulis',
      stock: 40,
    }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList products={products as any} />
      </div>
    </div>
  );
}
