-- ============================================
-- Migration 005: Auth (NextAuth v5) + Orders + Addresses
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Create next_auth schema for NextAuth adapter
CREATE SCHEMA IF NOT EXISTS next_auth;

-- Grant permissions
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT ALL ON SEQUENCES TO service_role;

-- 2. Users table (NextAuth compatible + custom fields)
CREATE TABLE IF NOT EXISTS next_auth.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  password_hash TEXT,       -- For credentials login (null for Google-only users)
  phone TEXT,               -- Phone number
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Accounts table (for OAuth providers like Google)
CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  UNIQUE(provider, "providerAccountId")
);

-- 4. Sessions table
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

-- 5. Verification tokens (for email verification)
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ============================================
-- Public schema: Orders, Order Items, Addresses
-- ============================================

-- 6. User Shipping Addresses
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES next_auth.users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Rumah',
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  province TEXT,
  city TEXT,
  district TEXT,
  postal_code TEXT,
  full_address TEXT NOT NULL,
  rajaongkir_city_id TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES next_auth.users(id) ON DELETE SET NULL,
  
  -- Guest checkout fields
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  
  -- Order status
  status TEXT DEFAULT 'pending_payment',
  -- Status values: pending_payment, paid, processing, shipped, delivered, cancelled, expired
  
  -- Payment info (Midtrans)
  payment_status TEXT DEFAULT 'unpaid',
  payment_method TEXT,
  midtrans_transaction_id TEXT,
  midtrans_order_id TEXT UNIQUE,
  midtrans_snap_token TEXT,
  paid_at TIMESTAMPTZ,
  
  -- Pricing
  subtotal INTEGER NOT NULL DEFAULT 0,
  shipping_cost INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  
  -- Shipping info
  shipping_address JSONB,
  shipping_courier TEXT,
  shipping_service TEXT,
  shipping_etd TEXT,
  tracking_number TEXT,
  
  -- Extra
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  variant_id TEXT,
  product_name TEXT NOT NULL,
  variant_name TEXT,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_midtrans_order_id ON public.orders(midtrans_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_guest_email ON public.orders(guest_email);
CREATE INDEX IF NOT EXISTS idx_orders_guest_phone ON public.orders(guest_phone);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON public.user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_userId ON next_auth.accounts("userId");
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON next_auth.sessions("userId");

-- ============================================
-- RLS (Row Level Security) policies
-- ============================================

-- Enable RLS
ALTER TABLE next_auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (needed for NextAuth adapter)
CREATE POLICY "Service role full access users" ON next_auth.users
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access accounts" ON next_auth.accounts
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access sessions" ON next_auth.sessions
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access verification_tokens" ON next_auth.verification_tokens
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access orders" ON public.orders
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access order_items" ON public.order_items
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access user_addresses" ON public.user_addresses
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Helper: Auto-update updated_at timestamp
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON next_auth.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
