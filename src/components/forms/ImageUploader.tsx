'use client'

import { useState, useTransition } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage } from '@/actions/uploadActions'

interface ImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUploader({ images, onImagesChange, maxImages = 10 }: ImageUploaderProps) {
  const [isUploading, startUploadTransition] = useTransition()
  const [uploadError, setUploadError] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images autorisées`)
      return
    }

    setUploadError('')
    const fileArray = Array.from(files)

    startUploadTransition(async () => {
      const uploadPromises = fileArray.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        
        const result = await uploadImage(formData)
        if (result.error || !result.url) {
          throw new Error(result.error || `Échec du téléchargement de ${file.name}`)
        }
        return result.url
      })

      try {
        const uploadedUrls = await Promise.all(uploadPromises)
        onImagesChange([...images, ...uploadedUrls])
        // Reset input
        e.target.value = ''
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Erreur lors du téléchargement')
      }
    })
  }

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-base-200 border-2 border-base-300 group"
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E'
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer l'image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Section */}
      <div className="space-y-2">
        {uploadError && (
          <div className="alert alert-error text-sm">
            <span>{uploadError}</span>
            <button onClick={() => setUploadError('')} className="btn btn-ghost btn-xs">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex gap-2">
          {/* File Upload */}
          <label className="flex-1 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading || images.length >= maxImages}
              className="hidden"
            />
            <div className={`btn btn-primary w-full gap-2 ${isUploading ? 'loading' : ''}`}>
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {images.length === 0 ? 'Télécharger des images' : `Ajouter ${maxImages - images.length} image${maxImages - images.length > 1 ? 's' : ''} supplémentaire${maxImages - images.length > 1 ? 's' : ''}`}
                </>
              )}
            </div>
          </label>
        </div>

        <p className="text-xs text-base-content/50">
          {images.length}/{maxImages} images • Formats: JPG, PNG, WebP • Max 5MB par image
        </p>
      </div>
    </div>
  )
}
