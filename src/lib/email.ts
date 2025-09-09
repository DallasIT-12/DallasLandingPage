import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerCity: string;
  totalAmount: number;
  paymentMethod: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
}

export async function sendOrderNotificationToAdmin(orderData: OrderNotificationData) {
  try {
    const itemsHTML = orderData.items.map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">Rp${item.price.toLocaleString()}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">Rp${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🔔 Pesanan Baru - Paperlisens</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #f97316; margin-top: 0;">Detail Pesanan</h2>
            <p><strong>Nomor Pesanan:</strong> ${orderData.orderNumber}</p>
            <p><strong>Metode Pembayaran:</strong> ${orderData.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : orderData.paymentMethod === 'transfer' ? 'Transfer Bank' : 'E-Wallet'}</p>
            <p><strong>Total:</strong> <span style="color: #f97316; font-weight: bold;">Rp${orderData.totalAmount.toLocaleString()}</span></p>
            ${orderData.notes ? `<p><strong>Catatan:</strong> ${orderData.notes}</p>` : ''}
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #f97316; margin-top: 0;">Data Customer</h2>
            <p><strong>Nama:</strong> ${orderData.customerName}</p>
            <p><strong>Telepon:</strong> ${orderData.customerPhone}</p>
            ${orderData.customerEmail ? `<p><strong>Email:</strong> ${orderData.customerEmail}</p>` : ''}
            <p><strong>Alamat:</strong> ${orderData.customerAddress}</p>
            <p><strong>Kota:</strong> ${orderData.customerCity}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #f97316; margin-top: 0;">Item Pesanan</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f97316; color: white;">
                  <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Produk</th>
                  <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Qty</th>
                  <th style="padding: 12px; border: 1px solid #ddd; text-align: right;">Harga</th>
                  <th style="padding: 12px; border: 1px solid #ddd; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
          </div>
        </div>

        <div style="padding: 20px; text-align: center; background-color: #f97316; color: white;">
          <p style="margin: 0;">Silakan segera proses pesanan ini melalui WhatsApp: 
            <a href="https://wa.me/${orderData.customerPhone}" style="color: white; text-decoration: underline;">
              ${orderData.customerPhone}
            </a>
          </p>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Paperlisens <noreply@your-domain.com>',
      to: [process.env.ADMIN_EMAIL || 'admin@paperlisens.com'],
      subject: `🔔 Pesanan Baru #${orderData.orderNumber} - ${orderData.customerName}`,
      html: emailHTML,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Email notification error:', error);
    return { success: false, error: error };
  }
}

export async function sendOrderConfirmationToCustomer(orderData: OrderNotificationData) {
  if (!orderData.customerEmail) {
    return { success: false, error: 'No customer email provided' };
  }

  try {
    const itemsHTML = orderData.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">Rp${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">✅ Konfirmasi Pesanan - Paperlisens</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Halo <strong>${orderData.customerName}</strong>,</p>
          <p>Terima kasih telah berbelanja di Paperlisens! Pesanan Anda telah kami terima dan akan segera diproses.</p>
          
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="color: #059669; margin-top: 0;">Detail Pesanan</h3>
            <p><strong>Nomor Pesanan:</strong> ${orderData.orderNumber}</p>
            <p><strong>Total:</strong> <span style="color: #f97316; font-weight: bold;">Rp${orderData.totalAmount.toLocaleString()}</span></p>
            <p><strong>Metode Pembayaran:</strong> ${orderData.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : orderData.paymentMethod === 'transfer' ? 'Transfer Bank' : 'E-Wallet'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Item yang Dipesan:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Produk</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Qty</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
          </div>

          <div style="background-color: #fef3f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <h3 style="color: #dc2626; margin-top: 0;">Langkah Selanjutnya:</h3>
            <p>Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi lebih lanjut.</p>
            <p>Jika ada pertanyaan, silakan hubungi kami di: <strong>081234567890</strong></p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Email ini dikirim otomatis, mohon tidak membalas email ini.
          </p>
        </div>

        <div style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">&copy; 2024 Paperlisens - Percetakan Dallas</p>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Paperlisens <noreply@your-domain.com>',
      to: [orderData.customerEmail],
      subject: `✅ Konfirmasi Pesanan #${orderData.orderNumber} - Paperlisens`,
      html: emailHTML,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Customer email notification error:', error);
    return { success: false, error: error };
  }
}