-- ============================================
-- Migration 006: Move users table to public schema
-- The next_auth schema causes issues with Supabase client
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- Create users table in public schema (if not exists)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  password_hash TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access users" ON public.users
  FOR ALL USING (true) WITH CHECK (true);

-- Copy data from next_auth.users if any exists
INSERT INTO public.users (id, name, email, "emailVerified", image, password_hash, phone, created_at, updated_at)
SELECT id, name, email, "emailVerified", image, password_hash, phone, created_at, updated_at
FROM next_auth.users
ON CONFLICT (email) DO NOTHING;

-- Update trigger
CREATE OR REPLACE TRIGGER trigger_public_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
