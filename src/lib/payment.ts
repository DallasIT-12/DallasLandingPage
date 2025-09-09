// Payment utility functions for Paperlisens

interface PaymentData {
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

// Bank account details for manual transfer
export const BANK_ACCOUNTS = {
  bca: {
    name: 'BCA',
    accountNumber: '1234567890',
    accountName: 'PAPERLISENS',
    logo: '🏦'
  },
  mandiri: {
    name: 'Mandiri',
    accountNumber: '1370012345678',
    accountName: 'PAPERLISENS',
    logo: '🏦'
  },
  bni: {
    name: 'BNI',
    accountNumber: '1234567890',
    accountName: 'PAPERLISENS',
    logo: '🏦'
  },
  bri: {
    name: 'BRI',
    accountNumber: '123456789012345',
    accountName: 'PAPERLISENS',
    logo: '🏦'
  }
};

// Generate payment token for Midtrans
export async function generatePaymentToken(paymentData: PaymentData) {
  try {
    const response = await fetch('/api/payment/create-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      throw new Error('Failed to create payment token');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating payment token:', error);
    throw error;
  }
}

// Check payment status
export async function checkPaymentStatus(orderId: string) {
  try {
    const response = await fetch(`/api/payment/status/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
}

// Format currency to Indonesian Rupiah
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Generate unique order ID
export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PL${timestamp}${random}`;
}

// Validate payment method
export function validatePaymentMethod(method: string): boolean {
  const validMethods = ['cod', 'transfer', 'ewallet'];
  return validMethods.includes(method);
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}