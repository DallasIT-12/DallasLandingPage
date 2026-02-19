-- Paperlisens: Base products + variants schema
-- Same key (product) = shared name & description; variants = different prices, images
-- Run in Supabase SQL Editor after 001 (or as fresh setup)

-- Base product: shared name, description, category
CREATE TABLE IF NOT EXISTS paperlisens_products_base (
  id TEXT PRIMARY KEY,
  product_slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description TEXT,
  description_en TEXT,
  description_zh TEXT,
  category TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Variants: each has own price, image, variant name (same product key)
CREATE TABLE IF NOT EXISTS paperlisens_product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES paperlisens_products_base(id) ON DELETE CASCADE,
  variant_name TEXT,
  variant_name_en TEXT,
  variant_name_zh TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '/placeholder.png',
  images JSONB DEFAULT '[]'::jsonb,
  sold INTEGER NOT NULL DEFAULT 0,
  variant_slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product_id ON paperlisens_product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_base_slug ON paperlisens_products_base(slug);
CREATE INDEX IF NOT EXISTS idx_variants_slug ON paperlisens_product_variants(variant_slug);

ALTER TABLE paperlisens_products_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE paperlisens_product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read base" ON paperlisens_products_base FOR SELECT USING (true);
CREATE POLICY "Allow public read variants" ON paperlisens_product_variants FOR SELECT USING (true);
