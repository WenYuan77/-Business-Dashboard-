"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { X, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWarranty } from "@/contexts/warranty-context"
import { TopNav } from "@/components/top-nav"
import Link from "next/link"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/hooks/use-toast"

// 定义图片类型
const IMAGE_TYPES = [
  { id: "id_front", name: "身份证正面" },
  { id: "id_back", name: "身份证反面" },
  { id: "vehicle_license_front", name: "行驶证正本" },
  { id: "vehicle_license_back", name: "行驶证副本" },
  { id: "vehicle_photo", name: "车辆照片" },
  { id: "invoice", name: "购车发票" },
  { id: "insurance", name: "保险单" },
  { id: "other", name: "其他资料" },
]

export default function WarrantyImageUploadPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { getWarrantyById } = useWarranty()
  const warrantyId = params.id as string

  const [warranty, setWarranty] = useState<any>(null)

  // 模拟图片数据
  const [images, setImages] = useState([
    {
      id: 1,
      type: "id_front",
      typeName: "身份证正面",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2s53b1mFPIGtNlS7L3ERVghMyHFzrs.png",
      uploadedAt: "2025-04-20 10:30:45",
    },
    {
      id: 2,
      type: "id_back",
      typeName: "身份证反面",
      url: "/generic-id-card-back.png",
      uploadedAt: "2025-04-20 10:31:22",
    },
  ])

  useEffect(() => {
    if (warrantyId) {
      const data = getWarrantyById(warrantyId)
      if (data) {
        setWarranty(data)
      } else {
        router.push("/warranty")
      }
    }
  }, [warrantyId, getWarrantyById, router])

  if (!warranty) return null

  const handleUpload = (type: string, typeName: string, file: File) => {
    // 在实际应用中，这里会上传图片到服务器
    // 这里我们模拟上传成功
    const newImage = {
      id: Date.now(),
      type,
      typeName,
      url: URL.createObjectURL(file),
      uploadedAt: new Date()
        .toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/\//g, "-"),
    }

    setImages([...images, newImage])

    toast({
      title: "上传成功",
      description: `${typeName}图片已成功上传`,
      variant: "success",
    })
  }

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这张图片吗？")) {
      setImages(images.filter((img) => img.id !== id))

      toast({
        title: "删除成功",
        description: "图片已成功删除",
        variant: "success",
      })
    }
  }

  return (
    <div className="flex-1 bg-white">
      {/* 顶部导航 */}
      <TopNav
        breadcrumbs={["首页", "保单管理", "延保", "延保详情", "上传图片"]}
        paths={["/dashboard", "/warranty", "/warranty", `/warranty/detail/${warrantyId}`, ""]}
      />

      {/* 页面标签 */}
      <div className="flex border-b">
        <Link href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
          首页
        </Link>
        <Link href="/warranty" className="py-3 px-4 text-gray-500 hover:text-gray-700">
          延保
        </Link>
        <Link href={`/warranty/detail/${warrantyId}`} className="py-3 px-4 text-gray-500 hover:text-gray-700">
          延保详情({warrantyId})
        </Link>
        <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
          上传图片 <X className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* 上传内容 */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">上传图片</h2>
          <p className="text-sm text-gray-500 mb-6">请上传清晰的图片文件，支持JPG、PNG格式，单个文件大小不超过5MB。</p>

          <div className="grid grid-cols-4 gap-6">
            {IMAGE_TYPES.map((type) => (
              <div key={type.id} className="space-y-2">
                <div className="text-sm font-medium">{type.name}</div>
                <ImageUpload label={`上传${type.name}`} onUpload={(file) => handleUpload(type.id, type.name, file)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">已上传图片</h2>

          {images.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border rounded-md overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.typeName}
                      className="max-w-full max-h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium mb-1">{image.typeName}</div>
                    <div className="text-xs text-gray-500 mb-2">上传时间: {image.uploadedAt}</div>
                    <div className="flex justify-between">
                      <Button size="sm" variant="outline" onClick={() => window.open(image.url, "_blank")}>
                        查看
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> 删除
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">暂无已上传图片</p>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="mt-8 flex justify-between border-t pt-4">
          <Button variant="outline" onClick={() => router.push(`/warranty/detail/${warrantyId}`)}>
            返回详情
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => router.push(`/warranty/detail/${warrantyId}`)}
          >
            完成
          </Button>
        </div>
      </div>
    </div>
  )
}
