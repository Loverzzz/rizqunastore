const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  // ========================
  // TAS
  // ========================
  {
    name: "Tas Trplsvn",
    description: "Tas sekolah merek Trplsvn",
    price: 68000,
    category: "Tas",
    stock: 3,
  },
  {
    name: "Tas Bagston",
    description: "Tas sekolah merek Bagston",
    price: 85000,
    category: "Tas",
    stock: 1,
  },
  {
    name: "Tas Pollo Danny",
    description: "Tas sekolah merek Pollo Danny",
    price: 75000,
    category: "Tas",
    stock: 2,
  },
  {
    name: "Tas Pollo Paris",
    description: "Tas sekolah merek Pollo Paris",
    price: 78500,
    category: "Tas",
    stock: 2,
  },
  {
    name: "Tas Anak + Botol",
    description: "Tas anak lengkap dengan botol minum",
    price: 45000,
    category: "Tas",
    stock: 11,
  },
  {
    name: "Tas Bonita",
    description: "Tas sekolah merek Bonita",
    price: 75000,
    category: "Tas",
    stock: 2,
  },

  // ========================
  // ROK PUTIH PANJANG - PURNAMA
  // ========================
  {
    name: "Rok Putih Panjang Purnama Uk 7",
    description: "Rok putih panjang seragam sekolah merek Purnama ukuran 7",
    price: 91000,
    category: "Seragam Sekolah",
    stock: 2,
  },
  {
    name: "Rok Putih Panjang Purnama Uk 8",
    description: "Rok putih panjang seragam sekolah merek Purnama ukuran 8",
    price: 95000,
    category: "Seragam Sekolah",
    stock: 3,
  },

  // ========================
  // ROK PUTIH PANJANG - RACHMA JAYA
  // ========================
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 3",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 3",
    price: 72000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 4",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 4",
    price: 77000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 5",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 5",
    price: 82000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 6",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 6",
    price: 87000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 7",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 7",
    price: 92000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 8",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 8",
    price: 97000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 9",
    description: "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 9",
    price: 102000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 10",
    description:
      "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 10",
    price: 107000,
    category: "Seragam Sekolah",
    stock: 9,
  },
  {
    name: "Rok Putih Panjang Rachma Jaya Uk 12",
    description:
      "Rok putih panjang seragam sekolah merek Rachma Jaya ukuran 12",
    price: 117000,
    category: "Seragam Sekolah",
    stock: 2,
  },

  // ========================
  // CELANA MERAH PANJANG
  // ========================
  {
    name: "Celana Merah Panjang Uk 20",
    description: "Celana merah panjang seragam sekolah ukuran 20",
    price: 86000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Celana Merah Panjang Uk 21",
    description: "Celana merah panjang seragam sekolah ukuran 21",
    price: 88000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Celana Merah Panjang Uk 22",
    description: "Celana merah panjang seragam sekolah ukuran 22",
    price: 90000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Merah Panjang Uk 23",
    description: "Celana merah panjang seragam sekolah ukuran 23",
    price: 92000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Celana Merah Panjang Uk 24",
    description: "Celana merah panjang seragam sekolah ukuran 24",
    price: 94000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Celana Merah Panjang Uk 25",
    description: "Celana merah panjang seragam sekolah ukuran 25",
    price: 98000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Celana Merah Panjang Uk 26",
    description: "Celana merah panjang seragam sekolah ukuran 26",
    price: 102000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Merah Panjang Uk 27",
    description: "Celana merah panjang seragam sekolah ukuran 27",
    price: 106000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Celana Merah Panjang Uk 28",
    description: "Celana merah panjang seragam sekolah ukuran 28",
    price: 110000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Celana Merah Panjang Uk 29",
    description: "Celana merah panjang seragam sekolah ukuran 29",
    price: 114000,
    category: "Seragam Sekolah",
    stock: 10,
  },
  {
    name: "Celana Merah Panjang Uk 30",
    description: "Celana merah panjang seragam sekolah ukuran 30",
    price: 118000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Celana Merah Panjang Uk 31",
    description: "Celana merah panjang seragam sekolah ukuran 31",
    price: 122000,
    category: "Seragam Sekolah",
    stock: 3,
  },
  {
    name: "Celana Merah Panjang Uk 32",
    description: "Celana merah panjang seragam sekolah ukuran 32",
    price: 125000,
    category: "Seragam Sekolah",
    stock: 9,
  },
  {
    name: "Celana Merah Panjang Uk 33",
    description: "Celana merah panjang seragam sekolah ukuran 33",
    price: 130000,
    category: "Seragam Sekolah",
    stock: 1,
  },
  {
    name: "Celana Merah Panjang Uk 34",
    description: "Celana merah panjang seragam sekolah ukuran 34",
    price: 135000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Celana Merah Panjang Uk 35",
    description: "Celana merah panjang seragam sekolah ukuran 35",
    price: 150000,
    category: "Seragam Sekolah",
    stock: 4,
  },

  // ========================
  // HEM PUTIH PENDEK - PURNAMA
  // ========================
  {
    name: "Hem Putih Pendek Purnama Uk 6",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Purnama ukuran 6",
    price: 56000,
    category: "Seragam Sekolah",
    stock: 8,
  },

  // ========================
  // HEM PUTIH PENDEK - RACHMA JAYA
  // ========================
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 3",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 3",
    price: 56000,
    category: "Seragam Sekolah",
    stock: 14,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 4",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 4",
    price: 58000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 5",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 5",
    price: 60000,
    category: "Seragam Sekolah",
    stock: 15,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 6",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 6",
    price: 62000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 7",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 7",
    price: 64000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 8",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 8",
    price: 66000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 9",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 9",
    price: 68000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 10",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 10",
    price: 70000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 11",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 11",
    price: 72000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Pendek Rachma Jaya Uk 12",
    description:
      "Kemeja putih lengan pendek seragam sekolah merek Rachma Jaya ukuran 12",
    price: 74000,
    category: "Seragam Sekolah",
    stock: 8,
  },

  // ========================
  // HEM COKLAT PENGGALANG PENDEK
  // ========================
  {
    name: "Hem Coklat Penggalang Pendek Uk 4",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 4",
    price: 56000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Hem Coklat Penggalang Pendek Uk 5",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 5",
    price: 58000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Hem Coklat Penggalang Pendek Uk 6",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 6",
    price: 60000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Hem Coklat Penggalang Pendek Uk 7",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 7",
    price: 62000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Hem Coklat Penggalang Pendek Uk 9",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 9",
    price: 66000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Hem Coklat Penggalang Pendek Uk 10",
    description:
      "Kemeja coklat lengan pendek seragam pramuka penggalang ukuran 10",
    price: 70000,
    category: "Seragam Pramuka",
    stock: 5,
  },

  // ========================
  // HEM PENGGALANG PANJANG
  // ========================
  {
    name: "Hem Penggalang Panjang Uk 6",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 6",
    price: 67000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Hem Penggalang Panjang Uk 7",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 7",
    price: 69000,
    category: "Seragam Pramuka",
    stock: 6,
  },
  {
    name: "Hem Penggalang Panjang Uk 8",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 8",
    price: 71000,
    category: "Seragam Pramuka",
    stock: 7,
  },
  {
    name: "Hem Penggalang Panjang Uk 9",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 9",
    price: 73000,
    category: "Seragam Pramuka",
    stock: 6,
  },
  {
    name: "Hem Penggalang Panjang Uk 10",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 10",
    price: 75000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Hem Penggalang Panjang Uk 11",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 11",
    price: 77000,
    category: "Seragam Pramuka",
    stock: 7,
  },
  {
    name: "Hem Penggalang Panjang Uk 12",
    description: "Kemeja lengan panjang seragam pramuka penggalang ukuran 12",
    price: 82000,
    category: "Seragam Pramuka",
    stock: 12,
  },

  // ========================
  // BAJU SIAGA PENDEK
  // ========================
  {
    name: "Baju Siaga Pendek Uk 4",
    description: "Baju siaga lengan pendek seragam pramuka ukuran 4",
    price: 67000,
    category: "Seragam Pramuka",
    stock: 1,
  },
  {
    name: "Baju Siaga Pendek Uk 6",
    description: "Baju siaga lengan pendek seragam pramuka ukuran 6",
    price: 71000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Baju Siaga Pendek Uk 7",
    description: "Baju siaga lengan pendek seragam pramuka ukuran 7",
    price: 73000,
    category: "Seragam Pramuka",
    stock: 7,
  },

  // ========================
  // BAJU SIAGA PANJANG
  // ========================
  {
    name: "Baju Siaga Panjang Uk 3",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 3",
    price: 68000,
    category: "Seragam Pramuka",
    stock: 3,
  },
  {
    name: "Baju Siaga Panjang Uk 4",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 4",
    price: 70000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Baju Siaga Panjang Uk 5",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 5",
    price: 73000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Baju Siaga Panjang Uk 6",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 6",
    price: 75000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Baju Siaga Panjang Uk 7",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 7",
    price: 79000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Baju Siaga Panjang Uk 8",
    description: "Baju siaga lengan panjang seragam pramuka ukuran 8",
    price: 81000,
    category: "Seragam Pramuka",
    stock: 4,
  },

  // ========================
  // CELANA PUTIH PENDEK PURNAMA
  // ========================
  {
    name: "Celana Putih Pendek Purnama Uk 6",
    description: "Celana putih pendek seragam sekolah merek Purnama ukuran 6",
    price: 73000,
    category: "Seragam Sekolah",
    stock: 13,
  },
  {
    name: "Celana Putih Pendek Purnama Uk 5",
    description: "Celana putih pendek seragam sekolah merek Purnama ukuran 5",
    price: 75000,
    category: "Seragam Sekolah",
    stock: 15,
  },

  // ========================
  // CELANA PENDEK COKLAT
  // ========================
  {
    name: "Celana Pendek Coklat Uk 9",
    description: "Celana pendek coklat seragam pramuka ukuran 9",
    price: 79000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Celana Pendek Coklat Uk 10",
    description: "Celana pendek coklat seragam pramuka ukuran 10",
    price: 82000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Celana Pendek Coklat Uk 11",
    description: "Celana pendek coklat seragam pramuka ukuran 11",
    price: 85000,
    category: "Seragam Pramuka",
    stock: 3,
  },
  {
    name: "Celana Pendek Coklat Uk 12",
    description: "Celana pendek coklat seragam pramuka ukuran 12",
    price: 88000,
    category: "Seragam Pramuka",
    stock: 5,
  },

  // ========================
  // ROK PUTIH PENDEK
  // ========================
  {
    name: "Rok Putih Pendek Uk 3",
    description: "Rok putih pendek seragam sekolah ukuran 3",
    price: 56000,
    category: "Seragam Sekolah",
    stock: 2,
  },
  {
    name: "Rok Putih Pendek Uk 5",
    description: "Rok putih pendek seragam sekolah ukuran 5",
    price: 59000,
    category: "Seragam Sekolah",
    stock: 2,
  },
  {
    name: "Rok Putih Pendek Uk 9",
    description: "Rok putih pendek seragam sekolah ukuran 9",
    price: 72000,
    category: "Seragam Sekolah",
    stock: 6,
  },

  // ========================
  // ROK MERAH PENDEK
  // ========================
  {
    name: "Rok Merah Pendek Uk 3",
    description: "Rok merah pendek seragam sekolah ukuran 3",
    price: 52000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Rok Merah Pendek Uk 4",
    description: "Rok merah pendek seragam sekolah ukuran 4",
    price: 54000,
    category: "Seragam Sekolah",
    stock: 2,
  },
  {
    name: "Rok Merah Pendek Uk 5",
    description: "Rok merah pendek seragam sekolah ukuran 5",
    price: 60000,
    category: "Seragam Sekolah",
    stock: 2,
  },
  {
    name: "Rok Merah Pendek Uk 7",
    description: "Rok merah pendek seragam sekolah ukuran 7",
    price: 64000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Rok Merah Pendek Uk 8",
    description: "Rok merah pendek seragam sekolah ukuran 8",
    price: 66000,
    category: "Seragam Sekolah",
    stock: 2,
  },

  // ========================
  // HEM PUTIH PANJANG
  // ========================
  {
    name: "Hem Putih Panjang Uk 3",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 3",
    price: 63000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Panjang Uk 4",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 4",
    price: 65000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Panjang Uk 5",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 5",
    price: 67000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Panjang Uk 6",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 6",
    price: 69000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Hem Putih Panjang Uk 7",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 7",
    price: 71000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Hem Putih Panjang Uk 8",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 8",
    price: 73000,
    category: "Seragam Sekolah",
    stock: 3,
  },
  {
    name: "Hem Putih Panjang Uk 9",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 9",
    price: 75000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Panjang Uk 10",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 10",
    price: 77000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Hem Putih Panjang Uk 11",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 11",
    price: 79000,
    category: "Seragam Sekolah",
    stock: 17,
  },
  {
    name: "Hem Putih Panjang Uk 12",
    description: "Kemeja putih lengan panjang seragam sekolah ukuran 12",
    price: 81000,
    category: "Seragam Sekolah",
    stock: 8,
  },

  // ========================
  // ROK MERAH PANJANG
  // ========================
  {
    name: "Rok Merah Panjang Uk 3",
    description: "Rok merah panjang seragam sekolah ukuran 3",
    price: 72000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Merah Panjang Uk 4",
    description: "Rok merah panjang seragam sekolah ukuran 4",
    price: 77000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Rok Merah Panjang Uk 5",
    description: "Rok merah panjang seragam sekolah ukuran 5",
    price: 82000,
    category: "Seragam Sekolah",
    stock: 11,
  },
  {
    name: "Rok Merah Panjang Uk 6",
    description: "Rok merah panjang seragam sekolah ukuran 6",
    price: 87000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Rok Merah Panjang Uk 7",
    description: "Rok merah panjang seragam sekolah ukuran 7",
    price: 92000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Merah Panjang Uk 8",
    description: "Rok merah panjang seragam sekolah ukuran 8",
    price: 97000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Rok Merah Panjang Uk 9",
    description: "Rok merah panjang seragam sekolah ukuran 9",
    price: 102000,
    category: "Seragam Sekolah",
    stock: 3,
  },
  {
    name: "Rok Merah Panjang Uk 10",
    description: "Rok merah panjang seragam sekolah ukuran 10",
    price: 107000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Rok Merah Panjang Uk 11",
    description: "Rok merah panjang seragam sekolah ukuran 11",
    price: 112000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Rok Merah Panjang Uk 12",
    description: "Rok merah panjang seragam sekolah ukuran 12",
    price: 117000,
    category: "Seragam Sekolah",
    stock: 12,
  },

  // ========================
  // CELANA PUTIH PANJANG
  // ========================
  {
    name: "Celana Putih Panjang Uk 21",
    description: "Celana putih panjang seragam sekolah ukuran 21",
    price: 88000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Putih Panjang Uk 22",
    description: "Celana putih panjang seragam sekolah ukuran 22",
    price: 90000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Celana Putih Panjang Uk 23",
    description: "Celana putih panjang seragam sekolah ukuran 23",
    price: 92000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Celana Putih Panjang Uk 24",
    description: "Celana putih panjang seragam sekolah ukuran 24",
    price: 94000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Putih Panjang Uk 25",
    description: "Celana putih panjang seragam sekolah ukuran 25",
    price: 98000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Putih Panjang Uk 26",
    description: "Celana putih panjang seragam sekolah ukuran 26",
    price: 102000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Celana Putih Panjang Uk 27",
    description: "Celana putih panjang seragam sekolah ukuran 27",
    price: 106000,
    category: "Seragam Sekolah",
    stock: 9,
  },
  {
    name: "Celana Putih Panjang Uk 28",
    description: "Celana putih panjang seragam sekolah ukuran 28",
    price: 110000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Celana Putih Panjang Uk 29",
    description: "Celana putih panjang seragam sekolah ukuran 29",
    price: 114000,
    category: "Seragam Sekolah",
    stock: 4,
  },
  {
    name: "Celana Putih Panjang Uk 30",
    description: "Celana putih panjang seragam sekolah ukuran 30",
    price: 118000,
    category: "Seragam Sekolah",
    stock: 8,
  },
  {
    name: "Celana Putih Panjang Uk 31",
    description: "Celana putih panjang seragam sekolah ukuran 31",
    price: 122000,
    category: "Seragam Sekolah",
    stock: 9,
  },
  {
    name: "Celana Putih Panjang Uk 32",
    description: "Celana putih panjang seragam sekolah ukuran 32",
    price: 126000,
    category: "Seragam Sekolah",
    stock: 6,
  },
  {
    name: "Celana Putih Panjang Uk 33",
    description: "Celana putih panjang seragam sekolah ukuran 33",
    price: 131000,
    category: "Seragam Sekolah",
    stock: 7,
  },
  {
    name: "Celana Putih Panjang Uk 34",
    description: "Celana putih panjang seragam sekolah ukuran 34",
    price: 135000,
    category: "Seragam Sekolah",
    stock: 4,
  },

  // ========================
  // ROK COKLAT PANJANG
  // ========================
  {
    name: "Rok Coklat Panjang Uk 3",
    description: "Rok coklat panjang seragam pramuka ukuran 3",
    price: 69000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Rok Coklat Panjang Uk 4",
    description: "Rok coklat panjang seragam pramuka ukuran 4",
    price: 74000,
    category: "Seragam Pramuka",
    stock: 9,
  },
  {
    name: "Rok Coklat Panjang Uk 5",
    description: "Rok coklat panjang seragam pramuka ukuran 5",
    price: 79000,
    category: "Seragam Pramuka",
    stock: 9,
  },
  {
    name: "Rok Coklat Panjang Uk 6",
    description: "Rok coklat panjang seragam pramuka ukuran 6",
    price: 84000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Rok Coklat Panjang Uk 7",
    description: "Rok coklat panjang seragam pramuka ukuran 7",
    price: 89000,
    category: "Seragam Pramuka",
    stock: 9,
  },
  {
    name: "Rok Coklat Panjang Uk 8",
    description: "Rok coklat panjang seragam pramuka ukuran 8",
    price: 94000,
    category: "Seragam Pramuka",
    stock: 10,
  },
  {
    name: "Rok Coklat Panjang Uk 9",
    description: "Rok coklat panjang seragam pramuka ukuran 9",
    price: 99000,
    category: "Seragam Pramuka",
    stock: 12,
  },
  {
    name: "Rok Coklat Panjang Uk 10",
    description: "Rok coklat panjang seragam pramuka ukuran 10",
    price: 104000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Rok Coklat Panjang Uk 11",
    description: "Rok coklat panjang seragam pramuka ukuran 11",
    price: 109000,
    category: "Seragam Pramuka",
    stock: 4,
  },

  // ========================
  // CELANA COKLAT KEMPOL
  // ========================
  {
    name: "Celana Coklat Kempol Uk 20",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 20",
    price: 105000,
    category: "Seragam Pramuka",
    stock: 6,
  },
  {
    name: "Celana Coklat Kempol Uk 21",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 21",
    price: 105000,
    category: "Seragam Pramuka",
    stock: 9,
  },
  {
    name: "Celana Coklat Kempol Uk 22",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 22",
    price: 110000,
    category: "Seragam Pramuka",
    stock: 7,
  },
  {
    name: "Celana Coklat Kempol Uk 23",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 23",
    price: 110000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Celana Coklat Kempol Uk 24",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 24",
    price: 115000,
    category: "Seragam Pramuka",
    stock: 3,
  },
  {
    name: "Celana Coklat Kempol Uk 25",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 25",
    price: 115000,
    category: "Seragam Pramuka",
    stock: 2,
  },
  {
    name: "Celana Coklat Kempol Uk 26",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 26",
    price: 115000,
    category: "Seragam Pramuka",
    stock: 6,
  },
  {
    name: "Celana Coklat Kempol Uk 27",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 27",
    price: 124000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Celana Coklat Kempol Uk 28",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 28",
    price: 134000,
    category: "Seragam Pramuka",
    stock: 12,
  },
  {
    name: "Celana Coklat Kempol Uk 29",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 29",
    price: 144000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Celana Coklat Kempol Uk 30",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 30",
    price: 154000,
    category: "Seragam Pramuka",
    stock: 7,
  },
  {
    name: "Celana Coklat Kempol Uk 31",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 31",
    price: 164000,
    category: "Seragam Pramuka",
    stock: 8,
  },
  {
    name: "Celana Coklat Kempol Uk 32",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 32",
    price: 174000,
    category: "Seragam Pramuka",
    stock: 5,
  },
  {
    name: "Celana Coklat Kempol Uk 33",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 33",
    price: 184000,
    category: "Seragam Pramuka",
    stock: 4,
  },
  {
    name: "Celana Coklat Kempol Uk 34",
    description: "Celana coklat panjang kempol seragam pramuka ukuran 34",
    price: 194000,
    category: "Seragam Pramuka",
    stock: 4,
  },

  // ========================
  // CELANA HIJAU
  // ========================
  {
    name: "Celana Hijau Uk 23",
    description: "Celana hijau seragam sekolah ukuran 23",
    price: 93000,
    category: "Seragam Sekolah",
    stock: 3,
  },
  {
    name: "Celana Hijau Uk 24",
    description: "Celana hijau seragam sekolah ukuran 24",
    price: 96000,
    category: "Seragam Sekolah",
    stock: 5,
  },
  {
    name: "Celana Hijau Uk 25",
    description: "Celana hijau seragam sekolah ukuran 25",
    price: 100000,
    category: "Seragam Sekolah",
    stock: 5,
  },
];

async function main() {
  console.log(`Menambahkan ${products.length} produk ke database...`);

  let created = 0;
  for (const product of products) {
    try {
      const p = await prisma.product.create({
        data: product,
      });
      created++;
      console.log(`  ✓ ${p.name} (Rp${p.price.toLocaleString("id-ID")})`);
    } catch (err) {
      console.error(`  ✗ Gagal: ${product.name} - ${err.message}`);
    }
  }

  console.log(
    `\nSelesai! ${created}/${products.length} produk berhasil ditambahkan.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
