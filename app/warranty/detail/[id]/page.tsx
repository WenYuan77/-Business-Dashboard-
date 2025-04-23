"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { X, ChevronLeft, ChevronRight, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWarranty } from "@/contexts/warranty-context"
import { TopNav } from "@/components/top-nav"
import Link from "next/link"

export default function WarrantyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getWarrantyById } = useWarranty()
  const warrantyId = params.id as string

  const [warranty, setWarranty] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("基本信息")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 模拟的图片数据
  const [images, setImages] = useState([
    {
      id: 1,
      type: "身份证正面",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2s53b1mFPIGtNlS7L3ERVghMyHFzrs.png",
    },
    {
      id: 2,
      type: "身份证反面",
      url: "/generic-id-card-back.png",
    },
    {
      id: 3,
      type: "行驶证",
      url: "/modern-license-plate.png",
    },
    {
      id: 4,
      type: "车辆照片",
      url: "/classic-red-convertible.png",
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleUploadImage = (type: string) => {
    alert(`上传${type}图片功能将在实际应用中实现`)
  }

  return (
    <div className="flex-1 bg-white">
      {/* 顶部导航 */}
      <TopNav
        breadcrumbs={["首页", "保单管理", "延保", "延保详情"]}
        paths={["/dashboard", "/warranty", "/warranty", ""]}
      />

      {/* 页面标签 */}
      <div className="flex border-b">
        <Link href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
          首页
        </Link>
        <Link href="/warranty" className="py-3 px-4 text-gray-500 hover:text-gray-700">
          延保
        </Link>
        <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
          延保详情({warrantyId}) <X className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* 详情内容 */}
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="text-sm text-gray-500">
            ID: {warrantyId} | 状态: {warranty.status}
          </div>
        </div>

        <div className="flex">
          {/* 左侧信息区域 */}
          <div className="w-1/2 pr-4">
            <div className="space-y-4">
              {/* 基本信息 */}
              <div>
                <div className="text-sm font-medium mb-2">车主类型:</div>
                <div className="bg-green-50 text-green-700 rounded-md inline-block text-sm px-2 py-1">
                  {warranty.vehicleType || "个人"}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车主姓名:</div>
                <div className="text-sm">{warranty.company || "宋生鹏"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车主性别:</div>
                <div className="text-sm">{warranty.gender || "男"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">联系电话:</div>
                <div className="text-sm">{warranty.phone || "18693582595"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">联系地址:</div>
                <div className="text-sm">{warranty.customerAddress || "甘肃省民乐县西大街46号号楼一单元401室"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">证件类型:</div>
                <div className="text-sm">身份证</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2 text-red-500">证件号码:</div>
                <div className="text-sm">{warranty.idNumber || "622223198404110011"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">备用联系人:</div>
                <div className="text-sm">-</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">备用联系人姓名:</div>
                <div className="text-sm">-</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">备用联系人电话:</div>
                <div className="text-sm">-</div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="text-sm font-medium mb-2 text-red-500">车架号:</div>
                <div className="text-sm">{warranty.frameNumber || "L6T79XCZ7RE077800"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车牌号:</div>
                <div className="text-sm">{warranty.licensePlate || "-"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2 text-red-500">发动机号:</div>
                <div className="text-sm">{warranty.engineNumber || "RCUA0024641"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">厂牌型号:</div>
                <div className="text-sm">{warranty.vehicleModel || "领克MR6482DCHEV01"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">品牌:</div>
                <div className="text-sm">领克</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">表显里程:</div>
                <div className="text-sm">20</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">开票金额:</div>
                <div className="text-sm">16.78(万)</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车系名称:</div>
                <div className="text-sm">领克08新能源</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车辆属性:</div>
                <div className="text-sm">国产</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">新车/在用车:</div>
                <div className="text-sm">新车</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车辆类型:</div>
                <div className="text-sm">插电式混合动力多用途乘用车</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2 text-red-500">能源类型:</div>
                <div className="text-sm">插电式混合动力</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">排量:</div>
                <div className="text-sm">1.5</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">保障范围:</div>
                <div className="bg-green-50 text-green-700 rounded-md inline-block text-sm px-2 py-1">
                  全车保障（三电除外）
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">发票日期:</div>
                <div className="text-sm">{warranty.purchaseDate || "2025-04-20"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">出单日期:</div>
                <div className="text-sm">{warranty.createdAt?.split(" ")[0] || "2025-04-20"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车辆使用性质:</div>
                <div className="text-sm">家庭自用车辆</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车型编码:</div>
                <div className="text-sm">-</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">车型名称:</div>
                <div className="text-sm">领克 领克08新能源 2023款 120km 长续航Pro</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2 text-red-500">变速箱类型:</div>
                <div className="text-sm">3档DHT</div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="text-sm font-medium mb-2">基准价:</div>
                <div className="text-sm">16.78(万)</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">应收费用:</div>
                <div className="text-sm">6500(元)</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">实收费用:</div>
                <div className="text-sm">6500(元)</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">支付方式:</div>
                <div className="text-sm">扫码收款</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">支付备注:</div>
                <div className="text-sm">{warranty.payment || "特殊订单提前报备"}</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">原厂保修年限:</div>
                <div className="text-sm">5</div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">原厂保修公里数:</div>
                <div className="text-sm">10</div>
              </div>
            </div>
          </div>

          {/* 右侧图片区域 */}
          <div className="w-1/2 pl-4">
            <div className="border rounded-md overflow-hidden">
              <div className="relative h-[600px] bg-gray-100 flex items-center justify-center">
                <img
                  src={images[currentImageIndex].url || "/placeholder.svg"}
                  alt={images[currentImageIndex].type}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">
                    当前图片: {images[currentImageIndex].type} ({currentImageIndex + 1}/{images.length})
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUploadImage(images[currentImageIndex].type)}
                    >
                      <Upload className="h-4 w-4 mr-1" /> 上传图片
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`border rounded-md overflow-hidden cursor-pointer ${
                        index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <div className="h-16 bg-gray-100 flex items-center justify-center">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.type}
                          className="max-w-full max-h-full object-cover"
                        />
                      </div>
                      <div className="p-1 text-xs text-center truncate">{image.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="text-sm text-gray-500">全部图片 (共{images.length}张)</div>
              <div>
                <Button size="sm" variant="outline" onClick={() => handleUploadImage("新图片")}>
                  <Upload className="h-4 w-4 mr-1" /> 上传更多图片
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-8 flex justify-between border-t pt-4">
          <Button variant="outline" onClick={() => router.push("/warranty")}>
            返回列表
          </Button>
          <div className="space-x-2">
            <Button variant="outline">打印</Button>
            <Button variant="outline" onClick={() => router.push(`/warranty/detail/${warrantyId}/upload`)}>
              <Upload className="h-4 w-4 mr-1" /> 上传图片
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push(`/warranty/edit/${warrantyId}`)}
            >
              编辑
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
