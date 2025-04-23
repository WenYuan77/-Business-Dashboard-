"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Calendar, ChevronDown, FileText, Edit, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useWarranty } from "@/contexts/warranty-context"
import { TopNav } from "@/components/top-nav"
import { exportWarrantyData } from "@/utils/export-utils"
import { useToast } from "@/hooks/use-toast"
import { WarrantyDetailDialog } from "@/components/warranty-detail-dialog"

// 定义搜索条件接口
interface SearchCriteria {
  policyNumber: string
  vehicleType: string
  ownerName: string
  ownerPhone: string
  idNumber: string
  frameNumber: string
  saleType: string
  store: string
  orderStatus: string
  startDate: string
  endDate: string
}

export default function WarrantyPage() {
  const router = useRouter()
  const { warranties } = useWarranty()

  const { toast } = useToast()

  // 详情对话框状态
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedWarrantyId, setSelectedWarrantyId] = useState<string | null>(null)

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    policyNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerPhone: "",
    idNumber: "",
    frameNumber: "",
    saleType: "",
    store: "",
    orderStatus: "",
    startDate: "",
    endDate: "",
  })

  // 筛选后的数据
  const [filteredData, setFilteredData] = useState(warranties)

  // 当warranties变化时更新filteredData
  useEffect(() => {
    setFilteredData(warranties)
  }, [warranties])

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [goToPage, setGoToPage] = useState("1")

  // 处理选择行
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map((row) => row.id))
    } else {
      setSelectedRows([])
    }
  }

  // 处理搜索条件变更
  const handleSearchChange = (field: keyof SearchCriteria, value: string) => {
    setSearchCriteria((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSearch = () => {
    const filtered = warranties.filter((item) => {
      if (searchCriteria.policyNumber && !item.id.toLowerCase().includes(searchCriteria.policyNumber.toLowerCase())) {
        return false
      }

      // 车主姓名筛选
      if (searchCriteria.ownerName && !item.company.includes(searchCriteria.ownerName)) {
        return false
      }

      if (searchCriteria.ownerPhone && !item.phone.includes(searchCriteria.ownerPhone)) {
        return false
      }

      // 车架号筛选
      if (searchCriteria.frameNumber && item.frameNumber && !item.frameNumber.includes(searchCriteria.frameNumber)) {
        return false
      }

      // 证件号码筛选
      if (searchCriteria.idNumber && item.idNumber && !item.idNumber.includes(searchCriteria.idNumber)) {
        return false
      }

      // 门店筛选
      if (searchCriteria.store && searchCriteria.store !== "all" && !item.store.includes(searchCriteria.store)) {
        return false
      }

      // 订单状态筛选
      if (
        searchCriteria.orderStatus &&
        searchCriteria.orderStatus !== "all" &&
        item.status !== searchCriteria.orderStatus
      ) {
        return false
      }

      // 创建时间范围筛选
      if (searchCriteria.startDate) {
        const startDate = new Date(searchCriteria.startDate)
        const itemDate = new Date(item.createdAt)
        if (itemDate < startDate) {
          return false
        }
      }

      if (searchCriteria.endDate) {
        const endDate = new Date(searchCriteria.endDate)
        endDate.setHours(23, 59, 59, 999) // 设置为当天结束时间
        const itemDate = new Date(item.createdAt)
        if (itemDate > endDate) {
          return false
        }
      }

      return true
    })

    setFilteredData(filtered)
    setCurrentPage(1) // 重置到第一页
    setGoToPage("1")
  }

  // 重置搜索条件
  const handleReset = () => {
    setSearchCriteria({
      policyNumber: "",
      vehicleType: "",
      ownerName: "",
      ownerPhone: "",
      idNumber: "",
      frameNumber: "",
      saleType: "",
      store: "",
      orderStatus: "",
      startDate: "",
      endDate: "",
    })
    setFilteredData(warranties)
    setCurrentPage(1)
    setGoToPage("1")
  }

  // 处理页码变更
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      setGoToPage(page.toString())
    }
  }

  // 处理跳转页码输入
  const handleGoToPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoToPage(e.target.value)
  }

  const handleGoToPageSubmit = () => {
    const page = Number.parseInt(goToPage)
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setCurrentPage(page)
    } else {
      setGoToPage(currentPage.toString())
    }
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  // 计算总页数
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredData.length / itemsPerPage)))
    if (currentPage > Math.ceil(filteredData.length / itemsPerPage) && filteredData.length > 0) {
      setCurrentPage(1)
      setGoToPage("1")
    }
  }, [filteredData, itemsPerPage, currentPage])

  // 当前页数据
  const currentPageData = getCurrentPageData()

  const handleAddClick = () => {
    router.push("/warranty/add")
  }

  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      router.push(`/warranty/edit/${selectedRows[0]}`)
    } else {
      alert("请选择一条记录进行修改")
    }
  }

  const handleRowEditClick = (id: string) => {
    router.push(`/warranty/edit/${id}`)
  }

  // 处理查看详情
  const handleViewDetail = (id: string) => {
    router.push(`/warranty/detail/${id}`)
  }

  // 处理导出按钮点击
  const handleExportClick = () => {
    if (selectedRows.length === 0) {
      alert("请至少选择一条记录进行导出")
      return
    }

    // 获取选中的数据
    const selectedData = warranties.filter((item) => selectedRows.includes(item.id))

    // 导出数据
    exportWarrantyData(selectedData)

    // 显示成功提示
    toast({
      variant: "success",
      title: "导出成功",
      description: `已成功导出 ${selectedData.length} 条记录`,
    })
  }

  return (
    <div className="flex-1 bg-gray-100">
      {/* 顶部导航 */}
      <TopNav breadcrumbs={["首页", "保单管理", "延保"]} paths={["/dashboard", "/warranty", ""]} />

      {/* 页面标签 */}
      <div className="bg-white border-b">
        <div className="flex">
          <a href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            首页
          </a>
          <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
            延保
            <X className="ml-1 h-4 w-4" />
          </div>
          <a href="/warranty/add" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            添加延保
          </a>
        </div>
      </div>

      {/* 搜索表单 */}
      <div className="bg-white p-4">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-sm mb-1">保单号</div>
            <Input
              placeholder="请输入保单号"
              className="h-9"
              value={searchCriteria.policyNumber}
              onChange={(e) => handleSearchChange("policyNumber", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1">车主类型</div>
            <div className="relative">
              <Select
                value={searchCriteria.vehicleType}
                onValueChange={(value) => handleSearchChange("vehicleType", value)}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="轿车">轿车</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div className="text-sm mb-1">车主姓名</div>
            <Input
              placeholder="请输入车主姓名"
              className="h-9"
              value={searchCriteria.ownerName}
              onChange={(e) => handleSearchChange("ownerName", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1">车主联系电话</div>
            <Input
              placeholder="请输入车主联系电话"
              className="h-9"
              value={searchCriteria.ownerPhone}
              onChange={(e) => handleSearchChange("ownerPhone", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1">证件号码</div>
            <Input
              placeholder="请输入证件号码"
              className="h-9"
              value={searchCriteria.idNumber}
              onChange={(e) => handleSearchChange("idNumber", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-sm mb-1">车架号</div>
            <Input
              placeholder="请输入车架号"
              className="h-9"
              value={searchCriteria.frameNumber}
              onChange={(e) => handleSearchChange("frameNumber", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1">自营/厂家代售</div>
            <div className="relative">
              <Select value={searchCriteria.saleType} onValueChange={(value) => handleSearchChange("saleType", value)}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="自营">自营</SelectItem>
                  <SelectItem value="厂家代售">厂家代售</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div className="text-sm mb-1">门店</div>
            <div className="relative">
              <Select value={searchCriteria.store} onValueChange={(value) => handleSearchChange("store", value)}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="甘肃兰州神迈领克">甘肃兰州神迈领克</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div className="text-sm mb-1">订单状态</div>
            <div className="relative">
              <Select
                value={searchCriteria.orderStatus}
                onValueChange={(value) => handleSearchChange("orderStatus", value)}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="已下单">已下单</SelectItem>
                  <SelectItem value="废弃">废弃</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="text-sm mr-2">创建时间</div>
          <div className="relative mr-2">
            <Input
              type="date"
              className="h-9 pl-9 w-40"
              value={searchCriteria.startDate}
              onChange={(e) => handleSearchChange("startDate", e.target.value)}
            />
            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <span className="mx-2">至</span>
          <div className="relative mr-4">
            <Input
              type="date"
              className="h-9 pl-9 w-40"
              value={searchCriteria.endDate}
              onChange={(e) => handleSearchChange("endDate", e.target.value)}
            />
            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 h-9 mr-2" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-1" /> 搜索
          </Button>
          <Button variant="outline" className="h-9" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>

      {/* 操作按钮和表格 */}
      <div className="p-4">
        <div className="mb-4 flex">
          <Button className="bg-blue-500 hover:bg-blue-600 mr-2 h-8 text-sm px-3" onClick={handleAddClick}>
            <span className="mr-1">+</span> 新增
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white border-green-500 mr-2 h-8 text-sm px-3"
            disabled={selectedRows.length !== 1}
            onClick={handleEditClick}
          >
            <FileText className="h-4 w-4 mr-1" /> 编辑
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 h-8 text-sm px-3"
            onClick={handleExportClick}
            disabled={selectedRows.length === 0}
          >
            <FileText className="h-4 w-4 mr-1" /> 导出
          </Button>
        </div>

        {/* 数据表格 */}
        <div className="bg-white rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length > 0 && selectedRows.length === currentPageData.length}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </TableHead>
                <TableHead className="font-medium">
                  ID <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">车主/公司</TableHead>
                <TableHead className="font-medium">车主联系电话</TableHead>
                <TableHead className="font-medium">经办员</TableHead>
                <TableHead className="font-medium">门店</TableHead>
                <TableHead className="font-medium">门店编码</TableHead>
                <TableHead className="font-medium">支付备注</TableHead>
                <TableHead className="font-medium">订单状态</TableHead>
                <TableHead className="font-medium">
                  创建时间 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">条数</TableHead>
                <TableHead className="font-medium">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox checked={selectedRows.includes(row.id)} onCheckedChange={() => handleSelectRow(row.id)} />
                  </TableCell>
                  <TableCell className="text-blue-500">{row.id}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.responsible}</TableCell>
                  <TableCell>{row.store}</TableCell>
                  <TableCell>{row.storeCode}</TableCell>
                  <TableCell>{row.payment}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 text-blue-500">
                      <button className="flex items-center text-xs" onClick={() => handleViewDetail(row.id)}>
                        <Info className="h-3 w-3 mr-1" />
                        详情
                      </button>
                      <button className="flex items-center text-xs" onClick={() => handleRowEditClick(row.id)}>
                        <Edit className="h-3 w-3 mr-1" />
                        修改
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentPageData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                    没有找到匹配的数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* 分页 */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-gray-500">共 {filteredData.length} 条</div>
            <div className="flex items-center">
              <span className="mr-2 text-sm">{itemsPerPage}条/页</span>
              <div className="flex items-center">
                <button
                  className="px-2 py-1 border rounded-l-md text-gray-500 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <button className="px-3 py-1 border-t border-b bg-blue-500 text-white">{currentPage}</button>
                <button
                  className="px-2 py-1 border rounded-r-md text-gray-500 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
              <div className="flex items-center ml-4">
                <span className="text-sm mr-2">前往</span>
                <Input
                  className="w-12 h-8"
                  value={goToPage}
                  onChange={handleGoToPageChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGoToPageSubmit()
                    }
                  }}
                />
                <span className="text-sm ml-2">页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 详情对话框 */}
      <WarrantyDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        warrantyId={selectedWarrantyId}
      />
    </div>
  )
}
