import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create products from the Paperlisens page
  const products = [
    {
      name: 'Kotak Rokok Custom - Malboro',
      description: 'Kotak rokok custom dengan desain Malboro',
      price: 15000,
      category: 'rokok',
      image: '/images/malboro.jpg'
    },
    {
      name: 'Kotak Rokok Custom - Gudang Garam',
      description: 'Kotak rokok custom dengan desain Gudang Garam',
      price: 15000,
      category: 'rokok', 
      image: '/images/gudanggaram.jpg'
    },
    {
      name: 'Kotak Rokok Custom - Djarum',
      description: 'Kotak rokok custom dengan desain Djarum',
      price: 15000,
      category: 'rokok',
      image: '/images/djarum.jpg'
    },
    {
      name: 'Kotak Rokok Custom - LA',
      description: 'Kotak rokok custom dengan desain LA',
      price: 15000,
      category: 'rokok',
      image: '/images/la.jpg'
    }
  ]

  console.log('Seeding products...')
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name }
    })

    if (!existingProduct) {
      await prisma.product.create({
        data: product
      })
      console.log(`✅ Created product: ${product.name}`)
    } else {
      console.log(`⚠️  Product already exists: ${product.name}`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })