import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadProductImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from('naturo-images')
    .upload(filePath, file)

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data } = supabase.storage
    .from('naturo-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export async function deleteProductImage(url: string): Promise<boolean> {
  const path = url.split('/naturo-images/')[1]
  if (!path) return false

  const { error } = await supabase.storage
    .from('naturo-images')
    .remove([path])

  return !error
}

