# 🗄️ Supabase Database Setup

## Langkah Setup Supabase

### 1. **Buat Project Supabase**
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat account dan login
3. Klik "New Project"
4. Pilih organisasi dan beri nama project
5. Pilih region terdekat (Singapore untuk Indonesia)
6. Buat password database yang kuat
7. Tunggu project selesai dibuat (~2 menit)

### 2. **Dapatkan Connection String**
1. Masuk ke project dashboard
2. Klik **Settings** di sidebar kiri
3. Klik **Database** 
4. Scroll ke **Connection string** section
5. Pilih tab **URI**
6. Copy connection string (format: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)

### 3. **Update Environment Variables**
1. Copy file `.env.example` ke `.env`
2. Ganti `[YOUR-PASSWORD]` dengan password database Anda
3. Ganti `[YOUR-PROJECT-REF]` dengan project reference ID Anda
4. Simpan file `.env`

### 4. **Deploy Database Schema**
Jalankan command berikut untuk membuat tabel:

```bash
# Push schema ke Supabase
npx prisma db push

# Seed initial data
npm run db:seed
```

### 5. **Verify Connection**
Test koneksi dengan menjalankan:

```bash
# Test database connection
npx prisma studio
```

Browser akan terbuka dengan Prisma Studio untuk manage database.

## 🚀 Production Deployment

### Untuk Vercel:
1. Add environment variables di Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL` 
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`

2. Deploy akan otomatis run migrations

### Database Migration Commands:
```bash
# Generate migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## 📦 Paperlisens Products (New)

### Setup Paperlisens Database

1. **Dapatkan API Keys** dari Supabase Dashboard:
   - Settings → API → Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Settings → API → anon public (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Settings → API → service_role (`SUPABASE_SERVICE_ROLE_KEY`) - untuk admin/write

2. **Tambahkan ke `.env.local`**:
   ```
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
   SUPABASE_SERVICE_ROLE_KEY="eyJ..."  # untuk seed & admin
   ```

3. **Jalankan migration SQL** di Supabase SQL Editor:
   - Buka `supabase/migrations/001_paperlisens_products.sql`
   - Copy isinya ke Supabase Dashboard → SQL Editor → New Query
   - Run

4. **Optional: Schema produk + variants** (satu key, banyak variant, nama/deskripsi sama):
   - Jalankan `supabase/migrations/002_products_and_variants.sql`
   - Admin: "Add Product (base)" → isi key, nama, deskripsi → "Add Variant" untuk tiap varian (harga, image beda)

5. **Seed produk existing** (optional):
   ```bash
   npm run db:seed-paperlisens
   ```

6. **Manage products** via:
   - Admin: `/admin/paperlisens/products` - Tambah/edit/hapus produk
   - Supabase Dashboard: Table Editor → paperlisens_products

Tanpa Supabase: Website tetap jalan dengan fallback ke data static di `src/data/products.ts`.

## 📊 Fitur Database

- **Paperlisens Products**: Katalog produk Paperlisens (box cupcake, paper tray, dll)
- **Customer Management**: Data pelanggan dengan phone unique
- **Product Catalog**: Produk kotak rokok custom  
- **Order System**: Sistem pesanan lengkap dengan status tracking
- **Order Items**: Detail item dalam setiap pesanan
- **Email Integration**: Otomatis kirim notifikasi admin & customer

## 🔧 Troubleshooting

### Connection Issues:
- Pastikan IP address di-whitelist di Supabase (Settings > Authentication > URL Configuration)
- Verify password database benar
- Check project reference ID

### Migration Issues:
- Run `npx prisma db push --force-reset` untuk reset schema
- Pastikan tidak ada data penting sebelum reset

### Performance:
- Supabase free tier: 500MB storage, 2GB bandwidth/month
- Upgrade ke Pro jika perlu lebih banyak resource