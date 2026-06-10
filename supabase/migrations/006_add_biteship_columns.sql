-- Add Biteship integration columns to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS biteship_order_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS biteship_tracking_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS waybill_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_status TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_history JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS courier_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS courier_service_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS destination_area_id TEXT;

-- Index for webhook lookups
CREATE INDEX IF NOT EXISTS idx_orders_biteship_order_id ON public.orders(biteship_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_waybill_id ON public.orders(waybill_id);

-- Add weight column to order_items if not exists
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 200;
