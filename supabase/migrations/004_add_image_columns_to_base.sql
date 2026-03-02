-- ============================================================
-- Migration 004: Add missing `image` and `images` columns
-- to `paperlisens_products_base` table.
--
-- Problem: The API routes (POST/PUT) write `image` and `images`
-- to the base product table, but the original migration 002
-- only created these columns in `paperlisens_product_variants`.
-- This caused product-level thumbnails and gallery photos
-- to silently fail or be ignored.
--
-- Also adds `attr_label_1` and `attr_label_2` columns which
-- are used by the admin panel for variation group labels.
-- ============================================================

-- Add `image` column (single thumbnail URL)
ALTER TABLE paperlisens_products_base
ADD COLUMN IF NOT EXISTS image TEXT NOT NULL DEFAULT '/placeholder.png';

-- Add `images` column (JSON array of gallery photo URLs)
ALTER TABLE paperlisens_products_base
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Add `attr_label_1` column (e.g., "Pilih Variasi", "Ukuran")
ALTER TABLE paperlisens_products_base
ADD COLUMN IF NOT EXISTS attr_label_1 TEXT DEFAULT 'Pilih Variasi';

-- Add `attr_label_2` column (e.g., "Warna", optional second variation axis)
ALTER TABLE paperlisens_products_base
ADD COLUMN IF NOT EXISTS attr_label_2 TEXT DEFAULT NULL;

-- ============================================================
-- Also add missing `variant_name_2` columns to the variants
-- table. The admin panel supports 2-axis variations (e.g.,
-- Size + Color), but the original migration 002 only created
-- `variant_name` (1 axis). These columns are written by the
-- PUT API route and used by the admin variant generator.
-- ============================================================

-- Add `variant_name_2` column (second variation axis, e.g., "Warna")
ALTER TABLE paperlisens_product_variants
ADD COLUMN IF NOT EXISTS variant_name_2 TEXT DEFAULT NULL;

-- Add `variant_name_2_en` column (English translation)
ALTER TABLE paperlisens_product_variants
ADD COLUMN IF NOT EXISTS variant_name_2_en TEXT DEFAULT NULL;

-- Add `variant_name_2_zh` column (Chinese translation)
ALTER TABLE paperlisens_product_variants
ADD COLUMN IF NOT EXISTS variant_name_2_zh TEXT DEFAULT NULL;
