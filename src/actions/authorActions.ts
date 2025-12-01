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
    facebook?: string
    whatsapp?: string
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
      facebook: data.links.facebook ?? currentAuthor.links.facebook,
      whatsapp: data.links.whatsapp ?? currentAuthor.links.whatsapp
    }
  }

  const success = await updateAuthorFile(updatedData)
  
  if (success) {
    revalidatePath('/')
  }

  return success
}
