-- Migration 009: Add cost_price (HPP), price, and weight to paperlisens_products_base table
ALTER TABLE IF EXISTS public.paperlisens_products_base
  ADD COLUMN IF NOT EXISTS cost_price INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS price INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 200;
