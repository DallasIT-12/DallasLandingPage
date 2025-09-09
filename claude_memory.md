# 🤖 Claude Memory - Dallas Company Project

## 📋 Project Overview
- **Project Name**: Dallas Company / Paperlisens
- **Type**: E-commerce website for custom cigarette box printing
- **Tech Stack**: Next.js 15, TypeScript, Prisma, Supabase, Resend
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

### **Main Pages:**
- `/` - Landing page (Percetakan Dallas branding)
- `/paperlisens` - E-commerce page for cigarette boxes
- `/admin` - Order management dashboard

### **API Endpoints:**
- `POST /api/orders` - Create new order
- `GET /api/orders` - List orders (admin)
- `GET /api/orders/[orderId]` - Get order details
- `PUT /api/orders/[orderId]` - Update order status
- `GET /api/products` - Get products
- `POST /api/payment/create-token` - Generate payment token
- `GET /api/payment/status/[orderId]` - Check payment status

## 🗄️ Database Schema (Supabase PostgreSQL)

### **Models:**
```prisma
Customer {
  id, name, phone, email?, address, city, postalCode
  orders -> Order[]
}

Product {
  id, name, description?, price, image?, category, isActive
  orderItems -> OrderItem[]
}

Order {
  id, orderNumber, customerId, status, paymentMethod, totalAmount, notes?
  customer -> Customer
  orderItems -> OrderItem[]
}

OrderItem {
  id, orderId, productId, quantity, unitPrice, totalPrice
  order -> Order
  product -> Product
}

OrderStatus: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
```

## 🛒 E-commerce Features

### **Products:**
1. Kotak Rokok Custom - Malboro (Rp15.000)
2. Kotak Rokok Custom - Gudang Garam (Rp15.000)
3. Kotak Rokok Custom - Djarum (Rp15.000)
4. Kotak Rokok Custom - LA (Rp15.000)

### **Payment Methods:**
- COD (Cash on Delivery)
- Transfer Bank (BCA, Mandiri, BNI, BRI)
- E-Wallet (GoPay, OVO, DANA, ShopeePay)

### **Cart System:**
- Flying cart animation
- Quantity management
- Checkout modal with shipping form
- Email field (optional)

## 📧 Email System (Resend)

### **Admin Notifications:**
- Automatic email when new order created
- Rich HTML template with order details
- Customer contact information

### **Customer Confirmations:**
- Order confirmation email (if email provided)
- Professional email template
- Order tracking information

## 🔧 Development Setup

### **Environment Variables:**
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
RESEND_API_KEY="your_resend_api_key"
ADMIN_EMAIL="admin@paperlisens.com"
```

### **Scripts:**
```bash
npm run dev          # Development server (port 3002)
npm run build        # Production build
npm run db:seed      # Seed database with products
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
```

### **Git Aliases:**
```bash
git add . && git commit -m "message"  # Manual add + commit
```

## 🚀 Deployment (Vercel)

### **Database:**
- Supabase PostgreSQL (free tier: 500MB storage)
- Auto-migration on deployment
- Connection pooling enabled

### **Hosting:**
- Vercel serverless functions for API routes
- Static site generation for pages
- Environment variables in Vercel dashboard

## 📊 Admin Dashboard Features

### **Order Management:**
- Real-time order listing with pagination
- Status filter (All, Pending, Confirmed, etc.)
- Search by order number, customer name, phone
- Order status updates with dropdown
- Detailed order modal view

### **Customer Communication:**
- Direct WhatsApp links for each order
- Customer contact information display
- Order summary with items and totals

## 🎨 UI/UX Design

### **Branding:**
- **Landing Page**: "Percetakan Dallas" (printing services)
- **E-commerce**: "Paperlisens" (cigarette box products)
- **Colors**: Orange (#f97316) primary, white/gray secondary
- **Icons**: Emojis for visual appeal (🛒, 📱, 🏦, etc.)

### **Responsive Design:**
- Mobile-first approach
- Grid layouts for product display
- Modal overlays for cart/checkout
- Touch-friendly buttons and forms

## 🔍 Key Functions & Logic

### **Product ID Mapping:**
Frontend uses simple IDs (1,2,3,4) mapped to database products by name.

### **Order Generation:**
- Unique order numbers: `PL{timestamp}{random}`
- Customer phone as unique identifier
- Automatic customer creation/update

### **Payment Integration:**
- Mock Midtrans integration for development
- Real payment gateway ready for production
- Order persistence before payment processing

### **Email Notifications:**
- Non-blocking async email sending
- Error handling that doesn't break order creation
- Rich HTML templates with order details

## 📝 Development Notes

### **TypeScript Setup:**
- Strict mode enabled
- Next.js 15 async params compatibility
- Proper type definitions for all models

### **Error Handling:**
- Database connection fallbacks
- Email notification error logging
- Payment processing error recovery

### **Performance:**
- Database query optimization
- Prisma connection pooling
- Serverless function optimization

## 🔄 Recent Updates

### **Latest Features Added:**
1. Complete database backend with Prisma + Supabase
2. Email notification system with Resend
3. Admin dashboard for order management
4. Product catalog with database integration
5. Customer data persistence
6. Order status tracking system

### **Current Status:**
- ✅ Frontend e-commerce complete
- ✅ Database schema implemented
- ✅ API endpoints functional
- ✅ Email notifications working
- ✅ Admin dashboard ready
- ✅ Vercel deployment configured
- ✅ Supabase database connected

## 🎯 Next Possible Enhancements

### **Future Features:**
1. User authentication for customers
2. Order history for logged-in users
3. Real payment gateway integration
4. Inventory management system
5. Advanced analytics dashboard
6. Customer loyalty program
7. Automated invoice generation
8. SMS notifications
9. Product image upload system
10. Multi-language support (Indonesian/English)

---

*Last Updated: January 2025*  
*Project Status: Production Ready* ✅