import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { items, shippingCost } = await request.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Items required' }, { status: 400 });
    }

    // 1. Fetch cost_price for each variantId and productId from DB
    const variantIds = items.map(item => item.variantId).filter(Boolean);
    const productIds = items.map(item => item.productId).filter(Boolean);

    const [variantsRes, baseRes] = await Promise.all([
      supabase
        .from('paperlisens_product_variants')
        .select('id, cost_price')
        .in('id', variantIds),
      supabase
        .from('paperlisens_products_base')
        .select('id, cost_price')
        .in('id', productIds)
    ]);

    if (variantsRes.error) throw variantsRes.error;
    if (baseRes.error) throw baseRes.error;

    const variantMap = new Map();
    variantsRes.data?.forEach(v => variantMap.set(v.id, v));

    const baseMap = new Map();
    baseRes.data?.forEach(b => baseMap.set(b.id, b));

    // 2. Calculate margin pool = Σ (price - cost_price) × qty
    let marginPool = 0;
    items.forEach(item => {
      let cost = 0;
      const v = item.variantId ? variantMap.get(item.variantId) : null;

      if (v && v.cost_price) {
        cost = v.cost_price;
      } else {
        // Fallback to base product cost_price from base table
        const b = baseMap.get(item.productId);
        cost = b?.cost_price || 0;
      }

      const margin = (item.price - cost) * item.quantity;
      marginPool += margin;
    });

    // We only use 100% of the margin pool for subsidy if it covers shipping
    // or use it all to reduce shipping.

    // 3. shipping_discount = Math.min(marginPool, shippingCost)
    const shippingDiscount = Math.min(marginPool, shippingCost || 0);

    // 4. excess = marginPool - shipping_discount
    const excess = marginPool - shippingDiscount;

    // 5. product_discount = excess (to show as voucher)
    // We can choose to give a cap or a percentage, but here we use all excess margin
    // as a product discount "voucher".
    const productDiscount = excess > 0 ? excess : 0;

    const totalDiscount = shippingDiscount + productDiscount;
    const finalShipping = Math.max(0, (shippingCost || 0) - shippingDiscount);

    return NextResponse.json({
      success: true,
      margin_pool: marginPool,
      shipping_discount: shippingDiscount,
      final_shipping: finalShipping,
      product_discount: productDiscount,
      total_discount: totalDiscount,
      message: shippingDiscount >= (shippingCost || 0) ? 'Gratis Ongkir!' : 'Ongkir Disubsidi'
    });
  } catch (error: any) {
    console.error('[Calculate Discount] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
