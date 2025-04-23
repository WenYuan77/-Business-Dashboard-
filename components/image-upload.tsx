"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onUpload: (file: File) => void
  label?: string
  accept?: string
}

export function ImageUpload({ onUpload, label = "上传图片", accept = "image/*" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // 创建预览URL
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    setTimeout(() => {
      onUpload(file)
      setIsUploading(false)
    }, 1000)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleClearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={accept} className="hidden" />

      {preview ? (
        <div className="relative border rounded-md overflow-hidden">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-40 object-cover" />
          <button
            onClick={handleClearPreview}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-40 flex flex-col items-center justify-center border-dashed"
          onClick={handleButtonClick}
          disabled={isUploading}
        >
          <Upload className="h-8 w-8 mb-2 text-gray-400" />
          <span className="text-sm text-gray-500">{isUploading ? "上传中..." : label}</span>
        </Button>
      )}
    </div>
  )
}
