'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function updateProductAverageRating(productId: string) {
  const reviews = await prisma.productReview.findMany({
    where: { productId },
    select: { rating: true }
  })

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  await prisma.product.update({
    where: { id: productId },
    data: { averageRating: Math.round(averageRating * 10) / 10 }
  })
}

export async function getReviewsByProductId(productId: string) {
  return prisma.productReview.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createReview(data: {
  productId: string
  client_name: string
  rating: number
  comment?: string
}) {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error('La note doit être entre 1 et 5')
  }

  const review = await prisma.productReview.create({
    data: {
      productId: data.productId,
      client_name: data.client_name,
      rating: data.rating,
      comment: data.comment || null
    }
  })

  await updateProductAverageRating(data.productId)

  revalidatePath(`/produits/${data.productId}`)
  revalidatePath('/produits')
  revalidatePath('/')

  return review
}

export async function deleteReview(id: string) {
  const review = await prisma.productReview.findUnique({ where: { id } })
  if (!review) throw new Error('Avis non trouvé')

  await prisma.productReview.delete({ where: { id } })
  await updateProductAverageRating(review.productId)

  revalidatePath(`/produits/${review.productId}`)
  revalidatePath('/produits')
  revalidatePath('/')
}

