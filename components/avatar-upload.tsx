"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Camera, ZoomIn, ZoomOut, RotateCw, Check } from "lucide-react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"

interface AvatarUploadProps {
  onAvatarChange?: (avatarUrl: string) => void
  currentAvatar?: string
}

export function AvatarUpload({ onAvatarChange, currentAvatar }: AvatarUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const { updateAvatar } = useUser()

  const imgRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
        setIsOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const getCroppedImg = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!imgRef.current || !crop.width || !crop.height) {
        resolve(null)
        return
      }

      const image = imgRef.current
      const canvas = document.createElement("canvas")
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(null)
        return
      }

      canvas.width = crop.width * scaleX
      canvas.height = crop.height * scaleY

      if (rotation > 0) {
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)
      }

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      )

      if (rotation > 0) {
        ctx.restore()
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null)
            return
          }
          const url = URL.createObjectURL(blob)
          setCroppedImageUrl(url)
          resolve(url)
        },
        "image/jpeg",
        0.95,
      )
    })
  }, [crop, rotation])

  const handleSave = async () => {
    try {
      setIsUploading(true)

      const imageUrl = await getCroppedImg()

      if (imageUrl) {
        updateAvatar(imageUrl)

        if (onAvatarChange) {
          onAvatarChange(imageUrl)
        }

        toast({
          title: "上传成功",
          description: "头像已成功更新",
          variant: "success",
        })
      } else {
        toast({
          title: "上传失败",
          description: "无法处理图片，请重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "上传失败",
        description: "发生错误，请重新尝试上传头像",
        variant: "destructive",
      })
      console.error("Avatar upload error:", error)
    } finally {
      setIsUploading(false)
      setIsOpen(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedFile(null)
    setPreviewUrl(null)
    setCroppedImageUrl(null)
    setRotation(0)
    setZoom(1)
  }

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      <button
        onClick={handleTriggerFileInput}
        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        <Camera className="h-4 w-4" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>裁剪头像</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="relative w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
              {previewUrl && (
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)} circularCrop aspect={1}>
                  <img
                    ref={imgRef}
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    style={{
                      transform: `rotate(${rotation}deg) scale(${zoom})`,
                      maxHeight: "100%",
                      maxWidth: "100%",
                      transition: "transform 0.3s",
                    }}
                    crossOrigin="anonymous"
                  />
                </ReactCrop>
              )}
            </div>

            <div className="flex items-center gap-4">
              <ZoomOut className="h-4 w-4 text-gray-500" />
              <Slider value={[zoom]} min={0.5} max={3} step={0.1} onValueChange={handleZoomChange} className="flex-1" />
              <ZoomIn className="h-4 w-4 text-gray-500" />

              <Button variant="outline" size="icon" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleSave} disabled={isUploading} className="bg-blue-500 hover:bg-blue-600">
                {isUploading ? "上传中..." : "确定"}
                {!isUploading && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
