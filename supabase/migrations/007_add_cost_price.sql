-- Add HPP (cost price) to both product tables
ALTER TABLE IF EXISTS paperlisens_product_variants 
  ADD COLUMN IF NOT EXISTS cost_price INTEGER DEFAULT 0;

ALTER TABLE IF EXISTS paperlisens_products
  ADD COLUMN IF NOT EXISTS cost_price INTEGER DEFAULT 0;

