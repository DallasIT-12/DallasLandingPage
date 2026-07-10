-- Migration 010: Remove cost_price (HPP) columns from paperlisens tables
ALTER TABLE IF EXISTS public.paperlisens_product_variants DROP COLUMN IF EXISTS cost_price;
ALTER TABLE IF EXISTS public.paperlisens_products DROP COLUMN IF EXISTS cost_price;
ALTER TABLE IF EXISTS public.paperlisens_products_base DROP COLUMN IF EXISTS cost_price;
