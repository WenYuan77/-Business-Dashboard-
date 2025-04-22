"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, RotateCcw, Download, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TopNav } from "@/components/top-nav"
import { useToast } from "@/hooks/use-toast"

// 定义门店数据接口
interface StoreData {
  id: string
  code: string
  name: string
  product: string
  brand: string
  vehicleType: string
  salesPerson: string
  storePerson: string
  recorder: string
  status: string
  createdAt: string
}

// 初始门店数据
const initialStoreData: StoreData[] = [
  {
    id: "1",
    code: "10000267",
    name: "甘肃兰州神迈领克",
    product: "延保",
    brand: "领克",
    vehicleType: "新能源",
    salesPerson: "甘肃兰州神迈领克",
    storePerson: "甘肃兰州神迈领克",
    recorder: "-",
    status: "正常",
    createdAt: "2025-03-25 18:43:57",
  },
  {
    id: "2",
    code: "10000268",
    name: "甘肃兰州神迈沃尔沃",
    product: "保险",
    brand: "沃尔沃",
    vehicleType: "燃油车",
    salesPerson: "甘肃兰州神迈沃尔沃",
    storePerson: "甘肃兰州神迈沃尔沃",
    recorder: "张三",
    status: "正常",
    createdAt: "2025-03-24 14:22:31",
  },
  {
    id: "3",
    code: "10000269",
    name: "甘肃兰州神迈吉利",
    product: "延保",
    brand: "吉利",
    vehicleType: "混合动力",
    salesPerson: "甘肃兰州神迈吉利",
    storePerson: "甘肃兰州神迈吉利",
    recorder: "李四",
    status: "停用",
    createdAt: "2025-03-23 09:15:42",
  },
]

export default function StoreManagementPage() {
  const { toast } = useToast()

  // 门店数据
  const [storeData, setStoreData] = useState<StoreData[]>(initialStoreData)

  // 过滤后的数据
  const [filteredData, setFilteredData] = useState<StoreData[]>(initialStoreData)

  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    storeName: "",
    product: "",
    brand: "",
    salesType: "",
    status: "",
  })

  // 选中行状态
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInputValue, setPageInputValue] = useState("1")
  const [itemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // 计算总页数和当前页数据
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredData.length / itemsPerPage)))
    if (currentPage > Math.ceil(filteredData.length / itemsPerPage) && filteredData.length > 0) {
      setCurrentPage(1)
      setPageInputValue("1")
    }
  }, [filteredData, itemsPerPage, currentPage])

  // 获取当前页数据
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  // 当前页数据
  const currentPageData = getCurrentPageData()

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
      setSelectedRows(currentPageData.map((row) => row.id))
    } else {
      setSelectedRows([])
    }
  }

  // 处理搜索条件变更
  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理搜索 - 实际过滤数据
  const handleSearch = () => {
    const filtered = storeData.filter((item) => {
      // 门店名称筛选
      if (searchParams.storeName && !item.name.toLowerCase().includes(searchParams.storeName.toLowerCase())) {
        return false
      }

      // 产品筛选
      if (searchParams.product && searchParams.product !== "all" && item.product !== searchParams.product) {
        return false
      }

      // 品牌名称筛选
      if (searchParams.brand && searchParams.brand !== "all" && item.brand !== searchParams.brand) {
        return false
      }

      // 状态筛选
      if (searchParams.status && searchParams.status !== "all" && item.status !== searchParams.status) {
        return false
      }

      return true
    })

    setFilteredData(filtered)
    setCurrentPage(1)
    setPageInputValue("1")

    toast({
      title: "搜索完成",
      description: `找到 ${filtered.length} 条记录`,
    })
  }

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      storeName: "",
      product: "",
      brand: "",
      salesType: "",
      status: "",
    })
    setFilteredData(storeData)
    setCurrentPage(1)
    setPageInputValue("1")
  }

  // 处理导出 - 实际导出CSV文件
  const handleExport = () => {
    // 如果没有选中行，提示用户
    if (selectedRows.length === 0) {
      toast({
        title: "导出失败",
        description: "请至少选择一条记录进行导出",
        variant: "destructive",
      })
      return
    }

    // 获取选中的数据
    const selectedData = storeData.filter((item) => selectedRows.includes(item.id))

    // 定义CSV表头
    const headers = [
      "编码",
      "门店名称",
      "产品",
      "品牌名称",
      "汽车类型",
      "销售员",
      "驻店员",
      "录单人",
      "状态",
      "创建时间",
    ]

    // 定义CSV字段
    const fields = [
      "code",
      "name",
      "product",
      "brand",
      "vehicleType",
      "salesPerson",
      "storePerson",
      "recorder",
      "status",
      "createdAt",
    ]

    // 生成CSV内容
    let csv = headers.join(",") + "\n"

    selectedData.forEach((item) => {
      const row = fields.map((field) => {
        const value = item[field as keyof StoreData]
        // 处理包含逗号的值
        if (value && value.toString().includes(",")) {
          return `"${value}"`
        }
        return value
      })
      csv += row.join(",") + "\n"
    })

    // 创建Blob对象
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })

    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `门店数据_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)

    // 触发下载
    link.click()

    // 清理
    document.body.removeChild(link)

    toast({
      title: "导出成功",
      description: `已成功导出 ${selectedData.length} 条记录`,
      variant: "success",
    })
  }

  // 处理页码输入变化
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value)
  }

  // 处理页码跳转
  const handlePageJump = () => {
    const pageNumber = Number.parseInt(pageInputValue)
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    } else {
      // 如果输入无效，重置为当前页码
      setPageInputValue(currentPage.toString())
    }
  }

  // 处理页码变更
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      setPageInputValue(page.toString())
    }
  }

  return (
    <div className="flex-1 bg-gray-100">
      {/* 顶部导航 */}
      <TopNav breadcrumbs={["首页", "保单管理", "门店管理"]} paths={["/dashboard", "/warranty", "/store-management"]} />

      {/* 页面标签 */}
      <div className="bg-white border-b">
        <div className="flex">
          <a href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            首页
          </a>
          <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
            门店管理
            <button className="ml-1 text-gray-400">×</button>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-sm mb-1">门店名称</div>
            <Input
              placeholder="请输入门店名称"
              className="h-9"
              value={searchParams.storeName}
              onChange={(e) => handleSearchChange("storeName", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1">产品</div>
            <Select value={searchParams.product} onValueChange={(value) => handleSearchChange("product", value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="延保">延保</SelectItem>
                <SelectItem value="保险">保险</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-1">品牌名称</div>
            <Select value={searchParams.brand} onValueChange={(value) => handleSearchChange("brand", value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="领克">领克</SelectItem>
                <SelectItem value="沃尔沃">沃尔沃</SelectItem>
                <SelectItem value="吉利">吉利</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-1">自营/代售</div>
            <Select value={searchParams.salesType} onValueChange={(value) => handleSearchChange("salesType", value)}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="请选择自营/代售" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="自营">自营</SelectItem>
                <SelectItem value="代售">代售</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="mr-4">
            <div className="text-sm mb-1">状态</div>
            <Select value={searchParams.status} onValueChange={(value) => handleSearchChange("status", value)}>
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue placeholder="门店列表状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="正常">正常</SelectItem>
                <SelectItem value="停用">停用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end space-x-2">
            <Button className="bg-blue-500 hover:bg-blue-600 h-9" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-1" /> 搜索
            </Button>
            <Button variant="outline" className="h-9" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1" /> 重置
            </Button>
          </div>
        </div>
      </div>

      {/* 操作按钮和表格 */}
      <div className="p-4">
        <div className="mb-4">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 h-8 text-sm px-3"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-1" /> 导出
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
                  编码 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">
                  门店名称 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">产品</TableHead>
                <TableHead className="font-medium">品牌名称</TableHead>
                <TableHead className="font-medium">汽车类型</TableHead>
                <TableHead className="font-medium">销售员</TableHead>
                <TableHead className="font-medium">驻店员</TableHead>
                <TableHead className="font-medium">录单人</TableHead>
                <TableHead className="font-medium">状态</TableHead>
                <TableHead className="font-medium">
                  创建时间 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.length > 0 ? (
                currentPageData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.vehicleType}</TableCell>
                    <TableCell>{row.salesPerson}</TableCell>
                    <TableCell>{row.storePerson}</TableCell>
                    <TableCell>{row.recorder}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 text-blue-500">
                        <button className="text-xs">编辑</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
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
              <span className="mr-2 text-sm">10条/页</span>
              <div className="flex items-center">
                <button
                  className="px-2 py-1 border rounded-l-md text-gray-500 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1 border-t border-b bg-blue-500 text-white">{currentPage}</button>
                <button
                  className="px-2 py-1 border rounded-r-md text-gray-500 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center ml-4">
                <span className="text-sm mr-2">前往</span>
                <Input
                  className="w-12 h-8"
                  value={pageInputValue}
                  onChange={handlePageInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePageJump()
                    }
                  }}
                />
                <span className="text-sm ml-2">页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
