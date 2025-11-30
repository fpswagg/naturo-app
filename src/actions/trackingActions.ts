'use server'

import { prisma } from '@/lib/prisma'

export async function trackWhatsAppClick(productId?: string) {
  await prisma.whatsAppClick.create({
    data: { productId }
  })
}

export async function getWhatsAppClicksStats() {
  const total = await prisma.whatsAppClick.count()
  const last7Days = await prisma.whatsAppClick.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  })

  return { total, last7Days }
}

