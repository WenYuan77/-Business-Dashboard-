"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useWarranty } from "@/contexts/warranty-context"

interface WarrantyDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  warrantyId: string | null
}

export function WarrantyDetailDialog({ isOpen, onClose, warrantyId }: WarrantyDetailDialogProps) {
  const { getWarrantyById } = useWarranty()
  const [warranty, setWarranty] = useState<any>(null)

  useEffect(() => {
    if (warrantyId) {
      const data = getWarrantyById(warrantyId)
      setWarranty(data)
    }
  }, [warrantyId, getWarrantyById])

  if (!warranty) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* 对话框标题栏 */}
          <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium m-0">延保详情（{warrantyId}）</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 overflow-auto max-h-[80vh]">
            {/* 基本信息 */}
            <div className="mb-8">
              <div className="text-lg font-medium text-blue-600 mb-4 pb-2 border-b">基本信息</div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">车主类型</div>
                  <div className="p-2 bg-green-50 text-green-700 rounded-md inline-block text-sm">
                    {warranty.vehicleType || "个人"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车主姓名</div>
                  <div className="font-medium">{warranty.company}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车主性别</div>
                  <div className="font-medium">{warranty.gender || "男"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">联系电话</div>
                  <div className="font-medium">{warranty.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">联系地址</div>
                  <div className="font-medium">
                    {warranty.customerAddress || "甘肃省民乐县西大街46号号楼一单元401室"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">证件类型</div>
                  <div className="font-medium">身份证</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">证件号码</div>
                  <div className="font-medium">{warranty.idNumber || "622223198404110011"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">备用联系人</div>
                  <div className="font-medium">-</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">备用联系人姓名</div>
                  <div className="font-medium">-</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">备用联系人电话</div>
                  <div className="font-medium">-</div>
                </div>
              </div>
            </div>

            {/* 车辆信息 */}
            <div className="mb-8">
              <div className="text-lg font-medium text-blue-600 mb-4 pb-2 border-b">车辆信息</div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">车架号</div>
                  <div className="font-medium text-red-500">{warranty.frameNumber || "L6T79XCZ7RE077800"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车牌号</div>
                  <div className="font-medium">{warranty.licensePlate || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">发动机号</div>
                  <div className="font-medium text-red-500">{warranty.engineNumber || "RCUA0024641"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">厂牌型号</div>
                  <div className="font-medium">{warranty.vehicleModel || "领克MR6482DCHEV01"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">品牌</div>
                  <div className="font-medium">领克</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">表显里程</div>
                  <div className="font-medium">20</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">开票金额</div>
                  <div className="font-medium">16.78(万)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车系名称</div>
                  <div className="font-medium">领克08新能源</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车辆属性</div>
                  <div className="font-medium">国产</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">新车/在用车</div>
                  <div className="font-medium">新车</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车辆类型</div>
                  <div className="font-medium">插电式混合动力多用途乘用车</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">能源类型</div>
                  <div className="font-medium text-red-500">插电式混合动力</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">排量</div>
                  <div className="font-medium">1.5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">保障范围</div>
                  <div className="p-2 bg-green-50 text-green-700 rounded-md inline-block text-sm">
                    全车保障（三电除外）
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">发票日期</div>
                  <div className="font-medium">{warranty.purchaseDate || "2025-04-20"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">出单日期</div>
                  <div className="font-medium">{warranty.createdAt?.split(" ")[0] || "2025-04-20"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车辆使用性质</div>
                  <div className="font-medium">家庭自用车辆</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车型编码</div>
                  <div className="font-medium">-</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">车型名称</div>
                  <div className="font-medium">领克 领克08新能源 2023款 120km 长续航Pro</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">变速箱类型</div>
                  <div className="font-medium text-red-500">3档DHT</div>
                </div>
              </div>
            </div>

            {/* 保险信息 */}
            <div className="mb-8">
              <div className="text-lg font-medium text-blue-600 mb-4 pb-2 border-b">保险信息</div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">基准价</div>
                  <div className="font-medium">16.78(万)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">应收费用</div>
                  <div className="font-medium">6500(元)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">实收费用</div>
                  <div className="font-medium">6500(元)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">支付方式</div>
                  <div className="font-medium">扫码收款</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">支付备注</div>
                  <div className="font-medium">{warranty.payment}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">原厂保修年限</div>
                  <div className="font-medium">5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">原厂保修公里数</div>
                  <div className="font-medium">10</div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="border-t p-4 flex justify-end space-x-2 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
