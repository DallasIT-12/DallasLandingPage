/**
 * Midtrans Snap API - Server-side integration
 * Uses direct HTTP calls (no SDK dependency needed)
 */

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

const BASE_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1'
  : 'https://app.sandbox.midtrans.com/snap/v1';

const CORE_API_URL = IS_PRODUCTION
  ? 'https://api.midtrans.com/v2'
  : 'https://api.sandbox.midtrans.com/v2';

export const SNAP_JS_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

function getAuthHeader() {
  return 'Basic ' + Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');
}

export interface MidtransItemDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface MidtransCustomerDetail {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  billing_address?: {
    address: string;
    city: string;
    postal_code?: string;
  };
  shipping_address?: {
    first_name: string;
    address: string;
    city: string;
    postal_code?: string;
    phone: string;
  };
}

export interface CreateTransactionParams {
  orderId: string;
  grossAmount: number;
  items: MidtransItemDetail[];
  customer: MidtransCustomerDetail;
}

/**
 * Create a Snap transaction and get the token + redirect URL
 */
export async function createSnapTransaction(params: CreateTransactionParams) {
  const { orderId, grossAmount, items, customer } = params;

  const payload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: items.map(item => ({
      id: item.id,
      name: item.name.substring(0, 50), // Midtrans max 50 chars
      price: item.price,
      quantity: item.quantity,
    })),
    customer_details: {
      first_name: customer.first_name,
      last_name: customer.last_name || '',
      email: customer.email,
      phone: customer.phone,
      billing_address: customer.billing_address,
      shipping_address: customer.shipping_address,
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dallas-printingid.com'}/id/paperlisens/checkout/success`,
    },
    // QRIS only payment
    enabled_payments: ['other_qris', 'gopay'],
    credit_card: {
      secure: true,
    },
  };

  const response = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader(),
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('[Midtrans] Create transaction error:', response.status, errorData);
    throw new Error(`Midtrans error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return {
    token: data.token as string,
    redirect_url: data.redirect_url as string,
  };
}

/**
 * Create a QRIS charge directly via Core API
 * Returns QR code URL for direct display (no Snap popup needed)
 */
export async function createQRISCharge(params: CreateTransactionParams) {
  const { orderId, grossAmount, items, customer } = params;

  const payload = {
    payment_type: 'qris',
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: items.map(item => ({
      id: item.id,
      name: item.name.substring(0, 50),
      price: item.price,
      quantity: item.quantity,
    })),
    customer_details: {
      first_name: customer.first_name,
      last_name: customer.last_name || '',
      email: customer.email,
      phone: customer.phone,
      billing_address: customer.billing_address,
      shipping_address: customer.shipping_address,
    },
    qris: {
      acquirer: 'gopay',
    },
    custom_expiry: {
      expiry_duration: 5,
      unit: 'minute',
    },
  };

  const response = await fetch(`${CORE_API_URL}/charge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader(),
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('[Midtrans] QRIS charge error:', response.status, errorData);
    throw new Error(`Midtrans QRIS error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  
  // Extract QR code URL from actions
  const qrAction = data.actions?.find((a: any) => a.name === 'generate-qr-code');
  const qrUrl = qrAction?.url || null;
  const qrString = data.actions?.find((a: any) => a.name === 'deeplink-redirect')?.url || null;

  return {
    transaction_id: data.transaction_id as string,
    order_id: data.order_id as string,
    qr_url: qrUrl as string | null,
    qr_string: qrString as string | null,
    expiry_time: data.expiry_time as string,
    transaction_status: data.transaction_status as string,
    gross_amount: data.gross_amount as string,
  };
}

/**
 * Verify transaction status from Midtrans Core API
 */
export async function getTransactionStatus(orderIdOrTransactionId: string) {
  const response = await fetch(`${CORE_API_URL}/${orderIdOrTransactionId}/status`, {
    method: 'GET',
    headers: {
      'Authorization': getAuthHeader(),
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Midtrans status error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

/**
 * Verify the signature of a Midtrans webhook notification
 */
export function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string
): string {
  const crypto = require('crypto');
  const input = orderId + statusCode + grossAmount + MIDTRANS_SERVER_KEY;
  return crypto.createHash('sha512').update(input).digest('hex');
}

/**
 * Map Midtrans transaction status to our order status
 */
export function mapTransactionStatus(transactionStatus: string, fraudStatus?: string): {
  orderStatus: string;
  paymentStatus: string;
} {
  switch (transactionStatus) {
    case 'capture':
      if (fraudStatus === 'accept') {
        return { orderStatus: 'paid', paymentStatus: 'paid' };
      }
      return { orderStatus: 'pending_payment', paymentStatus: 'unpaid' };

    case 'settlement':
      return { orderStatus: 'paid', paymentStatus: 'paid' };

    case 'pending':
      return { orderStatus: 'pending_payment', paymentStatus: 'unpaid' };

    case 'deny':
    case 'cancel':
      return { orderStatus: 'cancelled', paymentStatus: 'failed' };

    case 'expire':
      return { orderStatus: 'expired', paymentStatus: 'expired' };

    case 'refund':
    case 'partial_refund':
      return { orderStatus: 'cancelled', paymentStatus: 'refunded' };

    default:
      return { orderStatus: 'pending_payment', paymentStatus: 'unpaid' };
  }
}
