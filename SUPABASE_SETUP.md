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

## 📊 Fitur Database

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