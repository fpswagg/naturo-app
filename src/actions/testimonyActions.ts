'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimonies() {
  return prisma.testimony.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTestimonyById(id: string) {
  return prisma.testimony.findUnique({
    where: { id }
  })
}

export async function createTestimony(data: {
  client_name: string
  message: string
}) {
  const testimony = await prisma.testimony.create({
    data: {
      client_name: data.client_name,
      message: data.message
    }
  })

  revalidatePath('/dashboard/testimonies')
  revalidatePath('/')

  return testimony
}

export async function updateTestimony(id: string, data: {
  client_name?: string
  message?: string
}) {
  const testimony = await prisma.testimony.update({
    where: { id },
    data
  })

  revalidatePath('/dashboard/testimonies')
  revalidatePath('/')

  return testimony
}

export async function deleteTestimony(id: string) {
  await prisma.testimony.delete({ where: { id } })

  revalidatePath('/dashboard/testimonies')
  revalidatePath('/')
}
