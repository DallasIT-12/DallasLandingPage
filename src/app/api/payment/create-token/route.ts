import { NextRequest, NextResponse } from 'next/server';

// Mock Midtrans API - In production, use real Midtrans credentials
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'your-server-key';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || 'your-client-key';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface PaymentRequest {
  orderId: string;
  amount: number;
  customerDetails: {
    first_name: string;
    phone: string;
    email?: string;
    billing_address: {
      address: string;
      city: string;
      postal_code: string;
    };
  };
  itemDetails: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    
    // Validate request body
    if (!body.orderId || !body.amount || !body.customerDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would call Midtrans API here
    // For demo purposes, we'll simulate the response
    const mockResponse = {
      token: `mock_token_${body.orderId}_${Date.now()}`,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${body.orderId}`,
      order_id: body.orderId,
      gross_amount: body.amount,
      transaction_status: 'pending',
      payment_type: 'bank_transfer',
      transaction_time: new Date().toISOString(),
      expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // In real implementation:
    /*
    const midtransClient = require('midtrans-client');
    
    const snap = new midtransClient.Snap({
      isProduction: IS_PRODUCTION,
      serverKey: MIDTRANS_SERVER_KEY,
      clientKey: MIDTRANS_CLIENT_KEY
    });

    const parameter = {
      transaction_details: {
        order_id: body.orderId,
        gross_amount: body.amount
      },
      customer_details: body.customerDetails,
      item_details: body.itemDetails,
      enabled_payments: ['bank_transfer', 'echannel', 'gopay', 'shopeepay', 'other_qris']
    };

    const transaction = await snap.createTransaction(parameter);
    */

    return NextResponse.json({
      success: true,
      data: mockResponse
    });

  } catch (error) {
    console.error('Payment token creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment token' },
      { status: 500 }
    );
  }
}