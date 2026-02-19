-- Paperlisens Products Table
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS paperlisens_products (
  id TEXT PRIMARY KEY,
  product_slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  variant TEXT,
  variant_en TEXT,
  variant_zh TEXT,
  description TEXT,
  description_en TEXT,
  description_zh TEXT,
  category TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '/placeholder.png',
  images JSONB DEFAULT '[]'::jsonb,
  sold INTEGER NOT NULL DEFAULT 0,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_paperlisens_products_slug ON paperlisens_products(slug);
CREATE INDEX IF NOT EXISTS idx_paperlisens_products_product_slug ON paperlisens_products(product_slug);
CREATE INDEX IF NOT EXISTS idx_paperlisens_products_category ON paperlisens_products(category);

-- Enable Row Level Security (optional - allows public read if we add policy)
ALTER TABLE paperlisens_products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for product catalog)
CREATE POLICY "Allow public read" ON paperlisens_products
  FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users (add Supabase Auth later if needed)
-- For now: use Supabase Dashboard Table Editor to add products, or run API with service_role key
