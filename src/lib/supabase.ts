'use server'

import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured. File uploads will not work.')
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function uploadProductImage(file: File): Promise<string | null> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error('Supabase not configured')
    return null
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `products/${fileName}`

    // Convert File to Blob for upload
    const arrayBuffer = await file.arrayBuffer()
    const blob = new Blob([arrayBuffer], { type: file.type })

    const { data, error } = await supabase.storage
      .from('naturo-images')
      .upload(filePath, blob, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('naturo-images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

export async function deleteProductImage(url: string): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (!supabase) return false

  try {
    // Extract path from URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const bucketIndex = pathParts.findIndex(part => part === 'naturo-images')
    
    if (bucketIndex === -1) return false
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/')
    
    const { error } = await supabase.storage
      .from('naturo-images')
      .remove([filePath])

    return !error
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}
