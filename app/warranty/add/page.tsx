"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUpload } from "@/components/file-upload"
import { Calendar, Search } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useWarranty, type WarrantyFormData } from "@/contexts/warranty-context"

export default function AddWarrantyPage() {
  const router = useRouter()
  const { addWarranty, loading } = useWarranty()

  // 初始化表单数据
  const [formData, setFormData] = useState<WarrantyFormData>({
    vehicleType: "个人",
    customerName: "",
    customerPhone: "",
    idType: "身份证",
    idNumber: "",
    vehicleFrameNumber: "",
    vehicleLicenseNumber: "",
    vehicleModel: "",
    engineNumber: "",
    licensePlate: "",
    purchaseDate: "",
    vehicleColor: "",
    insuranceCompany: "",
    policyNumber: "",
    responsible: "系统管理员",
    store: "甘肃兰州神迈领克",
    storeCode: "10000267",
    payment: "0",
  })

  // 处理输入变更
  const handleInputChange = (field: keyof WarrantyFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 添加新的延保
    addWarranty(formData)

    // 显示成功消息
    alert("延保信息添加成功！")

    // 返回列表页
    router.push("/warranty")
  }

  // 处理取消
  const handleCancel = () => {
    if (confirm("确定要取消吗？所有已填写的信息将丢失。")) {
      router.push("/warranty")
    }
  }

  return (
    <div className="flex-1 bg-gray-100">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <button className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span className="text-gray-500">首页 / 保单管理 / 延保 / 新增延保</span>
        </div>
        <div className="flex items-center">
          <button className="mr-2">
            <Search className="text-gray-500" />
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* 页面标签 */}
      <div className="bg-white border-b">
        <div className="flex">
          <a href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            首页
          </a>
          <a href="/warranty" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            延保
          </a>
          <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium">新增延保</div>
        </div>
      </div>

      {/* 表单内容 */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-md p-6">
          {/* 基本信息 */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-blue-500 mb-4">基本信息</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">车主类型</div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="personal"
                      className="mr-2"
                      checked={formData.vehicleType === "个人"}
                      onCheckedChange={() => handleInputChange("vehicleType", "个人")}
                    />
                    <label htmlFor="personal">个人</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="company"
                      className="mr-2"
                      checked={formData.vehicleType === "公司"}
                      onCheckedChange={() => handleInputChange("vehicleType", "公司")}
                    />
                    <label htmlFor="company">公司</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">证件号码</div>
                <Input
                  placeholder="请输入证件号码"
                  className="h-9"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">联系电话</div>
                <Input
                  placeholder="请输入联系电话"
                  className="h-9"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">车主姓名</div>
                <Input
                  placeholder="请输入车主姓名"
                  className="h-9"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">车主证件类型</div>
                <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择证件类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="身份证">身份证</SelectItem>
                    <SelectItem value="护照">护照</SelectItem>
                    <SelectItem value="营业执照">营业执照</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm mb-1">车主联系地址</div>
                <Input placeholder="请输入联系地址" className="h-9" />
              </div>

              <div>
                <div className="text-sm mb-1">车架号</div>
                <Input
                  placeholder="请输入车架号"
                  className="h-9"
                  value={formData.vehicleFrameNumber}
                  onChange={(e) => handleInputChange("vehicleFrameNumber", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">行驶证号</div>
                <Input
                  placeholder="请输入行驶证号"
                  className="h-9"
                  value={formData.vehicleLicenseNumber}
                  onChange={(e) => handleInputChange("vehicleLicenseNumber", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">性别</div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Checkbox id="male" className="mr-2" />
                    <label htmlFor="male">男</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="female" className="mr-2" />
                    <label htmlFor="female">女</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="other" className="mr-2" />
                    <label htmlFor="other">其他</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 车辆信息 */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-blue-500 mb-4">车辆信息</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">厂牌型号</div>
                <div className="flex">
                  <Input
                    placeholder="请输入厂牌型号"
                    className="h-9"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                  />
                  <Button className="ml-2 bg-blue-500 hover:bg-blue-600 h-9">选择</Button>
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">车牌号</div>
                <Input
                  placeholder="请输入车牌号"
                  className="h-9"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">发动机号</div>
                <Input
                  placeholder="请输入发动机号"
                  className="h-9"
                  value={formData.engineNumber}
                  onChange={(e) => handleInputChange("engineNumber", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">车身颜色</div>
                <Input
                  placeholder="请输入车身颜色"
                  className="h-9"
                  value={formData.vehicleColor}
                  onChange={(e) => handleInputChange("vehicleColor", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">车辆类型</div>
                <Input placeholder="请输入车辆类型" className="h-9" />
              </div>

              <div>
                <div className="text-sm mb-1">新车购置价</div>
                <Input placeholder="请输入新车购置价" className="h-9" />
              </div>

              <div>
                <div className="text-sm mb-1">初登日期</div>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-9 pl-9"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                  />
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">车辆用途</div>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择车辆用途" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="家用">家用</SelectItem>
                    <SelectItem value="商用">商用</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm mb-1">排量/功率</div>
                <Input placeholder="请输入排量/功率" className="h-9" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆备注</div>
                <Textarea placeholder="请输入车辆备注信息" className="resize-none" />
              </div>
            </div>
          </div>

          {/* 保险信息 */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-blue-500 mb-4">保险信息</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">保险公司</div>
                <Select
                  value={formData.insuranceCompany}
                  onValueChange={(value) => handleInputChange("insuranceCompany", value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择保险公司" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="中国人保">中国人保</SelectItem>
                    <SelectItem value="中国平安">中国平安</SelectItem>
                    <SelectItem value="中国太平">中国太平</SelectItem>
                    <SelectItem value="中国人寿">中国人寿</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm mb-1">交强险保单号</div>
                <Input
                  placeholder="请输入交强险保单号"
                  className="h-9"
                  value={formData.policyNumber}
                  onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">商业险保单号</div>
                <Input placeholder="请输入商业险保单号" className="h-9" />
              </div>

              <div>
                <div className="text-sm mb-1">保险起期</div>
                <div className="relative">
                  <Input type="date" className="h-9 pl-9" />
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">保险止期</div>
                <div className="relative">
                  <Input type="date" className="h-9 pl-9" />
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">是否续保</div>
                <Select>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择是否续保" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm mb-1">门店</div>
                <Input
                  placeholder="请输入门店"
                  className="h-9"
                  value={formData.store}
                  onChange={(e) => handleInputChange("store", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">门店编码</div>
                <Input
                  placeholder="请输入门店编码"
                  className="h-9"
                  value={formData.storeCode}
                  onChange={(e) => handleInputChange("storeCode", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">经办人</div>
                <Input
                  placeholder="请输入经办人"
                  className="h-9"
                  value={formData.responsible}
                  onChange={(e) => handleInputChange("responsible", e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm mb-1">经办时间</div>
                <div className="relative">
                  <Input type="date" className="h-9 pl-9" />
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">保险备注</div>
                <Textarea placeholder="请输入保险备注信息" className="resize-none" />
              </div>
            </div>
          </div>

          {/* 上传资料 */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-blue-500 mb-4">上传资料</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">车主身份证正面照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车主身份证反面照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆行驶证正本照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆行驶证副本照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">购车发票照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">保险单照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">其他资料</div>
                <FileUpload buttonText="上传文件" />
              </div>
            </div>
          </div>

          {/* 上传资料 - 第二部分 */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">车主身份证正面照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车主身份证反面照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆行驶证正本照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">车辆行驶证副本照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">购车发票照片</div>
                <FileUpload buttonText="上传文件" />
              </div>

              <div>
                <div className="text-sm mb-1">保险单照片</div>
                <FileUpload buttonText="上传文件" />
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
              取消
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? "提交中..." : "提交"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
