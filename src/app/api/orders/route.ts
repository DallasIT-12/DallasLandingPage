import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generateOrderId } from '../../../lib/payment';
import { sendOrderNotificationToAdmin, sendOrderConfirmationToCustomer } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      customerDetails,
      items,
      paymentMethod,
      totalAmount,
      notes
    } = data;

    // Map frontend product IDs to database products
    const productMapping = {
      '1': 'Kotak Rokok Custom - Malboro',
      '2': 'Kotak Rokok Custom - Gudang Garam', 
      '3': 'Kotak Rokok Custom - Djarum',
      '4': 'Kotak Rokok Custom - LA'
    };

    // Get or create products for each item
    const processedItems = [];
    for (const item of items) {
      const productName = productMapping[item.id as keyof typeof productMapping];
      if (!productName) {
        continue; // Skip unknown products
      }

      // Find or create product
      let product = await prisma.product.findFirst({
        where: { name: productName }
      });

      if (!product) {
        // Create product if it doesn't exist
        product = await prisma.product.create({
          data: {
            name: productName,
            price: item.price,
            category: 'rokok',
            isActive: true
          }
        });
      }

      processedItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      });
    }

    // Find existing customer or create new one
    let customer = await prisma.customer.findFirst({
      where: {
        phone: customerDetails.phone
      }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerDetails.first_name,
          phone: customerDetails.phone,
          email: customerDetails.email || null,
          address: customerDetails.billing_address.address,
          city: customerDetails.billing_address.city,
          postalCode: customerDetails.billing_address.postal_code
        }
      });
    } else {
      // Update existing customer
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: customerDetails.first_name,
          email: customerDetails.email || null,
          address: customerDetails.billing_address.address,
          city: customerDetails.billing_address.city,
          postalCode: customerDetails.billing_address.postal_code
        }
      });
    }

    // Generate unique order number
    const orderNumber = generateOrderId();

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        paymentMethod,
        totalAmount,
        notes: notes || null,
        orderItems: {
          create: processedItems
        }
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    // Send email notifications
    try {
      const emailData = {
        orderNumber: order.orderNumber,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email || undefined,
        customerAddress: customer.address,
        customerCity: customer.city,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        items: order.orderItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.unitPrice
        })),
        notes: order.notes || undefined
      };

      // Send admin notification (don't wait for it to complete)
      sendOrderNotificationToAdmin(emailData).catch(error => 
        console.error('Failed to send admin notification:', error)
      );

      // Send customer confirmation if email is provided
      if (customer.email) {
        sendOrderConfirmationToCustomer(emailData).catch(error => 
          console.error('Failed to send customer confirmation:', error)
        );
      }
    } catch (emailError) {
      console.error('Email notification setup error:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          customer: true,
          orderItems: {
            include: {
              product: true
            }
          }
        }
      }),
      prisma.order.count()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}