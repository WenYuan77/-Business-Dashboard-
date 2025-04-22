"use client"

import { useState } from "react"
import { Search, RotateCcw, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// 模拟导出记录数据
const initialExportData = [
  {
    id: "EXP20250421001",
    batchId: "B20250421001",
    businessType: "延保",
    fileName: "延保数据_2025-04-21.csv",
    fileSize: "1.2MB",
    status: "完成",
    creator: "王静",
    createdAt: "2025-04-21 10:30:45",
  },
  {
    id: "EXP20250420002",
    batchId: "B20250420002",
    businessType: "保险",
    fileName: "保险数据_2025-04-20.csv",
    fileSize: "2.5MB",
    status: "完成",
    creator: "乔亚嘉",
    createdAt: "2025-04-20 15:22:18",
  },

]

export default function ExportListPage() {
  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    batchId: "",
    businessType: "",
    fileName: "",
    status: "",
    startDate: "",
    endDate: "",
  })

  // 导出数据状态
  const [exportData, setExportData] = useState(initialExportData)
  // 过滤后的数据
  const [filteredData, setFilteredData] = useState(initialExportData)

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialExportData.length / itemsPerPage))

  // 处理搜索条件变更
  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理搜索
  const handleSearch = () => {
    const filtered = exportData.filter((item) => {
      // 批次ID筛选
      if (searchParams.batchId && !item.batchId.toLowerCase().includes(searchParams.batchId.toLowerCase())) {
        return false
      }

      // 业务类型筛选
      if (
        searchParams.businessType &&
        searchParams.businessType !== "all" &&
        item.businessType !== searchParams.businessType
      ) {
        return false
      }

      // 文件名筛选
      if (searchParams.fileName && !item.fileName.toLowerCase().includes(searchParams.fileName.toLowerCase())) {
        return false
      }

      // 状态筛选
      if (searchParams.status && searchParams.status !== "all" && item.status !== searchParams.status) {
        return false
      }

      // 创建时间范围筛选 - 开始日期
      if (searchParams.startDate) {
        const startDate = new Date(searchParams.startDate)
        const itemDate = new Date(item.createdAt)
        if (itemDate < startDate) {
          return false
        }
      }

      // 创建时间范围筛选 - 结束日期
      if (searchParams.endDate) {
        const endDate = new Date(searchParams.endDate)
        endDate.setHours(23, 59, 59, 999) // 设置为当天结束时间
        const itemDate = new Date(item.createdAt)
        if (itemDate > endDate) {
          return false
        }
      }

      return true
    })

    setFilteredData(filtered)
    setCurrentPage(1)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
  }

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      batchId: "",
      businessType: "",
      fileName: "",
      status: "",
      startDate: "",
      endDate: "",
    })
    setFilteredData(exportData)
    setCurrentPage(1)
    setTotalPages(Math.ceil(exportData.length / itemsPerPage))
  }

  // 获取当前页数据
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  // 当前页数据
  const currentPageData = getCurrentPageData()

  return (
    <div className="flex-1 bg-white">
      {/* 顶部导航 */}
      <div className="border-b">
        <div className="flex items-center p-4">
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
          <div className="flex items-center text-gray-500 text-sm">
            <Link href="/dashboard" className="hover:text-blue-500">
              首页
            </Link>
            <span className="mx-1">/</span>
            <Link href="/export" className="hover:text-blue-500">
              文件导出
            </Link>
            <span className="mx-1">/</span>
            <span>导出列表</span>
          </div>
          <div className="ml-auto flex items-center">
            <button className="mr-2">
              <Search className="text-gray-500 h-5 w-5" />
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
                className="text-gray-500 h-5 w-5"
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
        <div className="flex border-b">
          <Link href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            首页
          </Link>
          <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
            导出列表
            <X className="ml-1 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 搜索表单 */}
      <div className="p-4 bg-white border rounded-md mx-4 mt-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm mb-1 text-gray-500">批次ID</div>
            <Input
              placeholder="批次ID"
              className="h-9 border-gray-300"
              value={searchParams.batchId}
              onChange={(e) => handleSearchChange("batchId", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1 text-gray-500">所属业务</div>
            <Select
              value={searchParams.businessType}
              onValueChange={(value) => handleSearchChange("businessType", value)}
            >
              <SelectTrigger className="h-9 border-gray-300">
                <SelectValue placeholder="专业所属业务" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="延保">延保</SelectItem>
                <SelectItem value="保险">保险</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-1 text-gray-500">文件名</div>
            <Input
              placeholder="请输入文件名"
              className="h-9 border-gray-300"
              value={searchParams.fileName}
              onChange={(e) => handleSearchChange("fileName", e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm mb-1 text-gray-500">状态</div>
            <Select value={searchParams.status} onValueChange={(value) => handleSearchChange("status", value)}>
              <SelectTrigger className="h-9 border-gray-300">
                <SelectValue placeholder="文件状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="完成">完成</SelectItem>
                <SelectItem value="处理中">处理中</SelectItem>
                <SelectItem value="失败">失败</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="text-sm mr-2 text-gray-500">创建时间</div>
          <div className="relative mr-2">
            <Input
              type="date"
              className="h-9 border-gray-300 w-40"
              value={searchParams.startDate}
              onChange={(e) => handleSearchChange("startDate", e.target.value)}
            />
          </div>
          <span className="mx-2 text-gray-500">至</span>
          <div className="relative mr-4">
            <Input
              type="date"
              className="h-9 border-gray-300 w-40"
              value={searchParams.endDate}
              onChange={(e) => handleSearchChange("endDate", e.target.value)}
            />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 h-9 mr-2" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-1" /> 搜索
          </Button>
          <Button variant="outline" className="h-9 border-gray-300" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" /> 重置
          </Button>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="mx-4 mt-4 bg-white rounded-md overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="font-medium text-gray-500">
                ID <ChevronDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead className="font-medium text-gray-500">所属业务</TableHead>
              <TableHead className="font-medium text-gray-500">文件名</TableHead>
              <TableHead className="font-medium text-gray-500">文件大小</TableHead>
              <TableHead className="font-medium text-gray-500">创建者</TableHead>
              <TableHead className="font-medium text-gray-500">状态</TableHead>
              <TableHead className="font-medium text-gray-500">
                创建时间 <ChevronDown className="inline h-4 w-4" />
              </TableHead>
              <TableHead className="font-medium text-gray-500">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.length > 0 ? (
              currentPageData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.businessType}</TableCell>
                  <TableCell>{item.fileName}</TableCell>
                  <TableCell>{item.fileSize}</TableCell>
                  <TableCell>{item.creator}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "完成"
                          ? "bg-green-100 text-green-800"
                          : item.status === "处理中"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 text-blue-500">
                      <button className="text-xs">下载</button>
                      <button className="text-xs">详情</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-16 text-gray-400">
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 分页 */}
        {filteredData.length > 0 && (
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-gray-500">共 {filteredData.length} 条</div>
            <div className="flex items-center">
              <button
                className="px-3 py-1 border rounded-l-md text-gray-500 hover:bg-gray-100"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                上一页
              </button>
              <button className="px-3 py-1 border-t border-b bg-blue-500 text-white">{currentPage}</button>
              <button
                className="px-3 py-1 border rounded-r-md text-gray-500 hover:bg-gray-100"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
