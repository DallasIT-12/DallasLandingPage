-- Ciptakan bucket "products" (public) di Supabase Storage
INSERT INTO public.storage_buckets (id, name, public) -- Kadang storage.buckets, namun biasanya di Supabase itu schema storage
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Opsional: Jika menggunakan schema storage (sebagian besar versi Supabase modern menggunakan schema storage)
-- Anda bisa menjalankan yang ini jika baris di atas error:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('products', 'products', true)
-- ON CONFLICT (id) DO NOTHING;

-- Buat RLS (Row Level Security) Policies agar gambar bisa diakses publik (untuk website) dan di-upload (hanya oleh admin/authenticated)

-- 1. Berikan akses BACA (SELECT) untuk publik (Semua orang bisa melihat gambar produk)
CREATE POLICY "Public Read Access Products Bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- 2. Berikan akses UPLOAD (INSERT) hanya untuk user yang terautentikasi (Admin)
CREATE POLICY "Auth Insert Access Products Bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- 3. Berikan akses UPDATE hanya untuk user yang terautentikasi (Admin)
CREATE POLICY "Auth Update Access Products Bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- 4. Berikan akses DELETE (HAPUS) hanya untuk user yang terautentikasi (Admin)
CREATE POLICY "Auth Delete Access Products Bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');
