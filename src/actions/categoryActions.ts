'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  })
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: { category: true }
      }
    }
  })
}

export async function createCategory(name: string) {
  const existing = await prisma.category.findUnique({ where: { name } })
  if (existing) {
    throw new Error('Une catégorie avec ce nom existe déjà')
  }

  const category = await prisma.category.create({
    data: { name }
  })

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/products')
  revalidatePath('/produits')

  return category
}

export async function updateCategory(id: string, name: string) {
  const existing = await prisma.category.findFirst({
    where: { name, NOT: { id } }
  })
  if (existing) {
    throw new Error('Une catégorie avec ce nom existe déjà')
  }

  const category = await prisma.category.update({
    where: { id },
    data: { name }
  })

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/products')
  revalidatePath('/produits')

  return category
}

export async function deleteCategory(id: string) {
  const productsCount = await prisma.product.count({ where: { categoryId: id } })
  if (productsCount > 0) {
    throw new Error('Impossible de supprimer une catégorie contenant des produits')
  }

  await prisma.category.delete({ where: { id } })

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/products')
}

