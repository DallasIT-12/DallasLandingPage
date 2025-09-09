import { NextRequest, NextResponse } from 'next/server';

// Mock payment status checker
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // In real implementation, you would call Midtrans API to check status
    // For demo purposes, we'll simulate different statuses
    const mockStatuses = ['pending', 'settlement', 'expire', 'deny', 'cancel'];
    const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

    const mockResponse = {
      order_id: orderId,
      transaction_status: randomStatus,
      payment_type: 'bank_transfer',
      transaction_time: new Date().toISOString(),
      gross_amount: '100000',
      currency: 'IDR',
      signature_key: 'mock_signature',
      status_code: randomStatus === 'settlement' ? '200' : '201',
      status_message: getStatusMessage(randomStatus),
      fraud_status: 'accept',
      settlement_time: randomStatus === 'settlement' ? new Date().toISOString() : null
    };

    // In real implementation:
    /*
    const midtransClient = require('midtrans-client');
    
    const apiClient = new midtransClient.CoreApi({
      isProduction: process.env.NODE_ENV === 'production',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    const statusResponse = await apiClient.transaction.status(orderId);
    */

    return NextResponse.json({
      success: true,
      data: mockResponse
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'pending':
      return 'Menunggu pembayaran';
    case 'settlement':
      return 'Pembayaran berhasil';
    case 'expire':
      return 'Pembayaran kadaluarsa';
    case 'deny':
      return 'Pembayaran ditolak';
    case 'cancel':
      return 'Pembayaran dibatalkan';
    default:
      return 'Status tidak dikenal';
  }
}