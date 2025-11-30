'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts(options?: {
  inStockOnly?: boolean
  categoryId?: string
  search?: string
  sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'rating'
  limit?: number
}) {
  const { inStockOnly = false, categoryId, search, sort = 'newest', limit } = options || {}

  const where: {
    inStock?: boolean
    categoryId?: string
    title?: { contains: string; mode: 'insensitive' }
  } = {}

  if (inStockOnly) where.inStock = true
  if (categoryId) where.categoryId = categoryId
  if (search) where.title = { contains: search, mode: 'insensitive' }

  const orderBy: Record<string, 'asc' | 'desc'>[] = []
  switch (sort) {
    case 'oldest':
      orderBy.push({ createdAt: 'asc' })
      break
    case 'price-asc':
      orderBy.push({ price: 'asc' })
      break
    case 'price-desc':
      orderBy.push({ price: 'desc' })
      break
    case 'rating':
      orderBy.push({ averageRating: 'desc' }, { inStock: 'desc' })
      break
    default:
      orderBy.push({ createdAt: 'desc' })
  }

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
    take: limit
  })
}

export async function getFeaturedProducts(limit = 6) {
  return prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: [
      { averageRating: 'desc' },
      { createdAt: 'desc' }
    ],
    take: limit
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { 
      category: true,
      reviews: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

export async function createProduct(data: {
  title: string
  price: number
  categoryId: string
  images: string[]
}) {
  const product = await prisma.product.create({
    data: {
      title: data.title,
      price: data.price,
      categoryId: data.categoryId,
      images: data.images,
      inStock: true
    },
    include: { category: true }
  })

  revalidatePath('/dashboard/products')
  revalidatePath('/produits')
  revalidatePath('/')

  return product
}

export async function updateProduct(id: string, data: {
  title?: string
  description?: string
  price?: number
  categoryId?: string
  images?: string[]
}) {
  const product = await prisma.product.update({
    where: { id },
    data,
    include: { category: true }
  })

  revalidatePath('/dashboard/products')
  revalidatePath('/produits')
  revalidatePath(`/produits/${id}`)
  revalidatePath('/')

  return product
}

export async function toggleProductStock(id: string) {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new Error('Product not found')

  const updated = await prisma.product.update({
    where: { id },
    data: { inStock: !product.inStock }
  })

  revalidatePath('/dashboard/products')
  revalidatePath('/produits')
  revalidatePath('/')

  return updated
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })

  revalidatePath('/dashboard/products')
  revalidatePath('/produits')
  revalidatePath('/')
}

