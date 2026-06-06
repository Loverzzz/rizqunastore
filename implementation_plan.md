# 🔍 Audit & Redesign Plan — Rizquna Store & Playground

## Executive Summary

Saya telah memeriksa seluruh codebase website Rizquna Store (Next.js 16 + Tailwind 4 + Prisma + Midtrans). Berikut adalah **temuan kekurangan** dan **rencana redesign UI/UX** untuk membuat website lebih profesional, menarik, dan user-friendly.

---

## Temuan Kekurangan (Audit Results)

### 🔴 Critical Issues

| # | Masalah | Lokasi | Dampak |
|---|---------|--------|--------|
| 1 | **Tidak ada halaman 404 (Not Found)** | `src/app/` | User mendapat halaman error default Next.js yang jelek |
| 2 | **Tidak ada `<meta>` OG tags / Social sharing** | [layout.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/layout.tsx) | Link share di WhatsApp/FB tidak ada preview gambar/deskripsi |
| 3 | **Navbar tidak highlight active route** | [Navbar.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/Navbar.tsx) | User tidak tahu sedang di halaman mana |
| 4 | **Tidak ada favicon yang proper** | `src/app/favicon.ico` | 25KB favicon (terlalu besar), tidak ada manifest/icons untuk PWA |
| 5 | **Homepage hero image terlalu berat** | `public/rizquna.jpg` (3MB!) | Memperlambat LCP drastis, seharusnya dioptimasi |

### 🟡 Design & UX Issues

| # | Masalah | Lokasi | Dampak |
|---|---------|--------|--------|
| 6 | **Kategori link di homepage tidak filter** | [page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/page.tsx#L106-L111) | Semua kategori menuju `/products` tanpa query param filter |
| 7 | **Tidak ada scroll-to-top button** | Semua halaman | UX buruk di halaman panjang (products, cart) |
| 8 | **Tidak ada breadcrumb navigation** | Halaman products, store, playground | User kehilangan konteks navigasi |
| 9 | **Footer disclaimer redundan** | [Footer.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/Footer.tsx) + [ProductList.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/ProductList.tsx) | Disclaimer yang sama muncul 2x di halaman products |
| 10 | **Product card "No Image" placeholder jelek** | [ProductCard.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/ProductCard.tsx#L98-L101) | Hanya teks "No Image", seharusnya ada placeholder icon yang proper |
| 11 | **Halaman Store tidak ada Google Maps embed** | [store/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/store/page.tsx#L148-L178) | Hanya placeholder link, bukan actual map embed |
| 12 | **Loading states minimal** | Berbagai halaman | Cart page tidak ada loading skeleton, hanya `null` return |
| 13 | **Playground page tidak ada gallery/foto** | [playground/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/playground/page.tsx) | Hanya form booking, tidak ada visual tentang playground |
| 14 | **Tidak ada animasi scroll reveal** | Semua section | Section hanya muncul statis, kurang engaging |
| 15 | **Mobile menu tidak close on route change** | [Navbar.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/Navbar.tsx) | Menu menutup via onClick, tapi tidak auto-close saat navigasi |

### 🔵 Technical & SEO Issues

| # | Masalah | Lokasi |
|---|---------|--------|
| 16 | **Sitemap tidak include `/store` route** | [sitemap.ts](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/sitemap.ts) |
| 17 | **Playground page tidak ada metadata (SSR)** | [playground/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/playground/page.tsx) — client-only, no metadata export |
| 18 | **Cart page tidak ada metadata** | [cart/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/cart/page.tsx) |
| 19 | **`body` CSS font override `Inter`** | [globals.css](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/globals.css#L51) — `font-family: Arial` overrides Inter |
| 20 | **`window.snap` type declaration di cart page** | [cart/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/cart/page.tsx#L21-L25) — seharusnya di global `.d.ts` |

---

## Proposed UI/Design Changes

### Phase 1: Quick Wins — Polish & Fix (Priority: HIGH)

#### [NEW] `not-found.tsx` — Custom 404 Page
- Desain full-page 404 dengan ilustrasi, tombol kembali ke beranda
- Gunakan animasi framer-motion

#### [MODIFY] [layout.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/layout.tsx)
- Tambahkan Open Graph metadata (og:title, og:description, og:image, og:url)
- Tambahkan Twitter Card metadata
- Fix `body` font agar Inter terpakai proper

#### [MODIFY] [globals.css](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/globals.css)
- Hapus `font-family: Arial` yang override Inter
- Tambahkan CSS untuk smooth scroll behavior
- Tambahkan custom scrollbar styling untuk warm theme

#### [MODIFY] [Navbar.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/Navbar.tsx)
- Tambahkan active route indicator (underline/highlight) menggunakan `usePathname()`
- Tambahkan logo image atau icon yang proper (bukan hanya teks)
- Auto-close mobile menu on route change

#### [MODIFY] [ProductCard.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/ProductCard.tsx)
- Ganti "No Image" text dengan proper placeholder (ikon Package/ImageOff dari lucide)
- Tambahkan badge "Habis" jika stok = 0
- Tambahkan subtle hover animation pada harga

---

### Phase 2: Homepage Redesign (Priority: HIGH)

#### [MODIFY] [page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/page.tsx) — Homepage
Redesign homepage dengan elemen berikut:

1. **Hero Section Upgrade**:
   - Tambahkan animated floating badges/stats (jumlah produk, rating, dll)
   - Tambahkan subtle particle/shimmer effect pada background gradient
   - Optimasi hero image loading

2. **Kategori dengan Filter Link**:
   - Ubah href kategori agar link ke `/products?category=Alat%20Tulis` dst
   - Tambahkan icon/emoji yang lebih besar dan animated on hover

3. **Tambahkan Section "Produk Terbaru"**:
   - Carousel/slider 4-6 produk terbaru dari database
   - Auto-scroll dengan pause on hover

4. **Tambahkan Section "Kenapa Rizquna?"** (Trust indicators):
   - 3-4 cards: Harga Terjangkau, Produk Lengkap, Pengiriman Cepat, Playground Aman
   - Animated counters (jumlah produk, pelanggan, dll)

5. **Scroll-Reveal Animations**:
   - Setiap section fade-in saat scroll menggunakan `whileInView` framer-motion

6. **Testimonial Section** (Optional, static data):
   - 3 review cards dari pelanggan

---

### Phase 3: Page-by-Page Enhancement (Priority: MEDIUM)

#### [MODIFY] [ProductList.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/components/ProductList.tsx)
- Hapus disclaimer ganda (cukup di footer)
- Tambahkan product count indicator ("Menampilkan 24 dari 56 produk")
- Tambahkan view toggle (grid 3-col / grid 4-col / list view)
- Tambahkan sort option (Harga Termurah, Terbaru, A-Z)

#### [MODIFY] [store/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/store/page.tsx)
- Embed Google Maps `<iframe>` actual dengan koordinat yang sudah ada
- Tambahkan foto toko dari `rizquna.jpg`
- Tambahkan section "Cara Menuju Toko" dengan directions

#### [MODIFY] [playground/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/playground/page.tsx)
- Pisahkan page menjadi server component (layout dengan metadata) + client component (form)
- Tambahkan gallery/image section playground
- Tambahkan animasi step-by-step booking guide
- Tambahkan FAQ section

#### [MODIFY] [cart/page.tsx](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/cart/page.tsx)
- Tambahkan loading skeleton saat `!mounted`
- Tambahkan slide-in animation untuk cart items
- Tambahkan "Anda mungkin juga suka" recommendation section

#### [NEW] `ScrollToTop.tsx` Component
- Floating button yang muncul saat scroll > 300px
- Smooth scroll ke atas dengan animasi

---

### Phase 4: SEO & Performance (Priority: MEDIUM)

#### [MODIFY] [sitemap.ts](file:///c:/Users/Pongo/OneDrive/Documents/rizquna/src/app/sitemap.ts)
- Tambahkan `/store` route
- Tambahkan `/cart` route

#### [MODIFY] Playground & Cart Metadata
- Tambahkan metadata export untuk halaman yang belum ada

#### Performance Optimizations
- Compress `rizquna.jpg` dari 3MB → <200KB (WebP)
- Gunakan `priority` dan `sizes` yang proper untuk gambar

---

## User Review Required

> [!IMPORTANT]
> **Hero Image**: Apakah gambar `rizquna.jpg` (3MB) sudah yang terbaik? Atau ada foto toko yang lebih baru/berkualitas lebih baik? Saya akan mengoptimasi ukurannya dari 3MB → ~200KB.

> [!IMPORTANT]
> **Google Maps Embed**: Untuk embed Google Maps di halaman Lokasi, apakah Anda punya API Key Google Maps? Jika tidak, saya akan gunakan iframe embed gratis.

> [!IMPORTANT]
> **Foto Playground**: Apakah ada foto-foto area playground yang bisa ditampilkan? Jika tidak, saya akan generate placeholder image untuk sementara.

## Open Questions

1. **Domain**: Apakah website sudah live di `rizquna.com`? Ini penting untuk OG tags dan sitemap.
2. **Logo**: Apakah Rizquna punya logo resmi (file SVG/PNG)? Saat ini navbar hanya menggunakan teks "Rizquna".
3. **Warna brand**: Apakah palet warna warm terracotta/amber saat ini sudah sesuai dengan branding offline toko? Atau ada preferensi warna lain?
4. **Section testimonial**: Apakah ingin menambahkan testimonial/review dari pelanggan di homepage? Jika ya, saya bisa buat dengan data static.

---

## Verification Plan

### Automated Tests
- `npm run build` — pastikan tidak ada error build
- Lighthouse audit (Performance, Accessibility, SEO, Best Practices)
- Visual check di browser (responsive: mobile, tablet, desktop)

### Manual Verification
- Test semua link navigasi (navbar, footer, kategori)
- Test dark mode toggle
- Test responsiveness di viewport 375px, 768px, 1440px
- Verify OG tags dengan WhatsApp link preview
