'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMessages() {
  return prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getUnreadMessagesCount() {
  return prisma.message.count({
    where: { isRead: false }
  })
}

export async function createMessage(data: {
  name: string
  message: string
  contact: string
}) {
  if (!data.contact.trim()) {
    throw new Error('Veuillez fournir un email ou un numéro de téléphone')
  }

  const message = await prisma.message.create({
    data: {
      name: data.name,
      message: data.message,
      contact: data.contact
    }
  })

  revalidatePath('/dashboard/messages')

  return message
}

export async function markMessageAsRead(id: string) {
  await prisma.message.update({
    where: { id },
    data: { isRead: true }
  })

  revalidatePath('/dashboard/messages')
}

export async function markAllMessagesAsRead() {
  await prisma.message.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  })

  revalidatePath('/dashboard/messages')
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({ where: { id } })

  revalidatePath('/dashboard/messages')
}

