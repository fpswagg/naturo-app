'use server'

import { revalidatePath } from 'next/cache'
import { getAuthorData, updateAuthor as updateAuthorFile } from '@/lib/auth'
import type { Author } from '@/types'

export async function getAuthor(): Promise<Author> {
  return getAuthorData()
}

export async function updateAuthor(data: {
  name?: string
  bio?: string
  picture?: string
  links?: {
    instagram?: string
    whatsapp?: string
    site?: string
  }
  password?: string
}): Promise<boolean> {
  const currentAuthor = await getAuthorData()
  
  const updatedData: Partial<Author> = {}
  
  if (data.name) updatedData.name = data.name
  if (data.bio) updatedData.bio = data.bio
  if (data.picture) updatedData.picture = data.picture
  if (data.password) updatedData.password = data.password
  
  if (data.links) {
    updatedData.links = {
      instagram: data.links.instagram ?? currentAuthor.links.instagram,
      whatsapp: data.links.whatsapp ?? currentAuthor.links.whatsapp,
      site: data.links.site ?? currentAuthor.links.site
    }
  }

  const success = await updateAuthorFile(updatedData)
  
  if (success) {
    revalidatePath('/dashboard/author')
    revalidatePath('/')
  }

  return success
}

