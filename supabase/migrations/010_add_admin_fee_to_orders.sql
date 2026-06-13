-- ============================================
-- Migration 010: Add admin_fee to orders table
-- ============================================

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS admin_fee INTEGER DEFAULT 0;
