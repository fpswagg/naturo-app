'use server'

import { uploadProductImage } from '@/lib/supabase'

export async function uploadImage(formData: FormData): Promise<{ url: string | null; error?: string }> {
  const file = formData.get('file') as File | null
  
  if (!file) {
    return { url: null, error: 'Aucun fichier fourni' }
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'Le fichier doit être une image' }
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { url: null, error: 'Le fichier est trop volumineux (max 5MB)' }
  }

  try {
    const url = await uploadProductImage(file)
    if (!url) {
      return { url: null, error: 'Échec du téléchargement' }
    }
    return { url }
  } catch (error) {
    console.error('Upload error:', error)
    return { url: null, error: error instanceof Error ? error.message : 'Erreur inconnue' }
  }
}

