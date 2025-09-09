const fs = require('fs');
const path = require('path');

console.log('🚀 Supabase Setup Helper');
console.log('=======================');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ File .env tidak ditemukan!');
    console.log('📋 Copy .env.example ke .env terlebih dahulu');
    process.exit(1);
}

// Read current .env
const envContent = fs.readFileSync(envPath, 'utf8');

console.log('📋 Langkah Setup Supabase:');
console.log('');

if (envContent.includes('[YOUR-PASSWORD]') || envContent.includes('password123')) {
    console.log('⚠️  Database URL masih menggunakan placeholder');
    console.log('');
    console.log('🔧 Yang perlu dilakukan:');
    console.log('1. Buat project baru di https://supabase.com');
    console.log('2. Pergi ke Settings > Database');  
    console.log('3. Copy "Connection string" dari tab URI');
    console.log('4. Update DATABASE_URL di file .env');
    console.log('5. Jalankan: npm run setup-db');
    console.log('');
    console.log('📝 Format connection string:');
    console.log('DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"');
    console.log('');
} else {
    console.log('✅ Database URL sudah dikonfigurasi');
    console.log('');
    console.log('🔄 Langkah selanjutnya:');
    console.log('1. Test koneksi: npx prisma db push');
    console.log('2. Seed data: npm run db:seed');
    console.log('3. Open Prisma Studio: npx prisma studio');
}

console.log('📚 Dokumentasi lengkap: SUPABASE_SETUP.md');