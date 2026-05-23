import { NextRequest, NextResponse } from 'next/server';
import { createQRISCharge } from '@/lib/midtrans';
import { createClient } from '@supabase/supabase-js';
import { generateOrderId } from '@/lib/payment';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, shippingCost, shippingCourier, shippingService, shippingEtd, userId, notes, paymentMethod } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Item pesanan tidak boleh kosong' }, { status: 400 });
    }
    if (!customer?.name || !customer?.phone) {
      return NextResponse.json({ error: 'Nama dan nomor telepon wajib diisi' }, { status: 400 });
    }
    if (!customer?.address || !customer?.city) {
      return NextResponse.json({ error: 'Alamat pengiriman wajib diisi' }, { status: 400 });
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = shippingCost || 0;
    const total = subtotal + shipping;

    // Generate order ID
    const orderNumber = generateOrderId();
    const midtransOrderId = `PL-${orderNumber}`;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Shared order data
    const shippingAddress = {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      district: customer.district || '',
      province: customer.province || '',
      postal_code: customer.postalCode || '',
    };

    // Helper: save order items
    const saveOrderItems = async (orderId: string) => {
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: String(item.productId || item.id),
        variant_id: item.variantId || null,
        product_name: item.name,
        variant_name: item.variantName || null,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null,
      }));
      const { error } = await supabase.from('order_items').insert(orderItems);
      if (error) console.error('[Payment] Order items save error:', error);
    };

    // ==========================================
    // COD Flow: skip Midtrans, save order directly
    // ==========================================
    if (paymentMethod === 'cod') {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: userId || null,
          guest_name: !userId ? customer.name : null,
          guest_email: !userId ? customer.email : null,
          guest_phone: !userId ? customer.phone : null,
          status: 'processing',
          payment_status: 'cod',
          payment_method: 'cod',
          midtrans_order_id: midtransOrderId,
          subtotal,
          shipping_cost: shipping,
          total,
          shipping_address: shippingAddress,
          shipping_courier: shippingCourier || null,
          shipping_service: shippingService || null,
          shipping_etd: shippingEtd || null,
          notes: notes || null,
        })
        .select('id')
        .single();

      if (orderError) {
        console.error('[Payment] COD order save error:', orderError);
        return NextResponse.json({ error: 'Gagal menyimpan pesanan' }, { status: 500 });
      }

      await saveOrderItems(order.id);
      console.log(`[Payment] COD order created: ${orderNumber}`);

      return NextResponse.json({
        success: true,
        data: { orderId: order.id, orderNumber, midtransOrderId },
      });
    }

    // ==========================================
    // QRIS Flow: create Midtrans charge
    // ==========================================
    const midtransItems = items.map((item: any) => ({
      id: String(item.productId || item.id),
      name: (item.name || 'Produk').substring(0, 50),
      price: item.price,
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      midtransItems.push({
        id: 'SHIPPING',
        name: `Ongkir ${shippingCourier || ''} ${shippingService || ''}`.trim().substring(0, 50),
        price: shipping,
        quantity: 1,
      });
    }

    const qrisResult = await createQRISCharge({
      orderId: midtransOrderId,
      grossAmount: total,
      items: midtransItems,
      customer: {
        first_name: customer.name,
        email: customer.email || `${customer.phone}@guest.paperlisens.com`,
        phone: customer.phone,
        shipping_address: {
          first_name: customer.name,
          address: customer.address,
          city: customer.city,
          postal_code: customer.postalCode || '',
          phone: customer.phone,
        },
      },
    });

    // Save order to database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: userId || null,
        guest_name: !userId ? customer.name : null,
        guest_email: !userId ? customer.email : null,
        guest_phone: !userId ? customer.phone : null,
        status: 'pending_payment',
        payment_status: 'unpaid',
        payment_method: 'qris',
        midtrans_order_id: midtransOrderId,
        subtotal,
        shipping_cost: shipping,
        total,
        shipping_address: shippingAddress,
        shipping_courier: shippingCourier || null,
        shipping_service: shippingService || null,
        shipping_etd: shippingEtd || null,
        notes: notes || null,
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('[Payment] Order save error:', orderError);
      return NextResponse.json({ error: 'Gagal menyimpan pesanan' }, { status: 500 });
    }

    await saveOrderItems(order.id);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber,
        midtransOrderId,
        qrUrl: qrisResult.qr_url,
        expiryTime: qrisResult.expiry_time,
        transactionStatus: qrisResult.transaction_status,
        grossAmount: qrisResult.gross_amount,
      },
    });
  } catch (error: any) {
    console.error('[Payment] Create error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal membuat pembayaran' },
      { status: 500 }
    );
  }
}
