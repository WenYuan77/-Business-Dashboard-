"use client"

import { useState } from "react"
import { Search, RotateCcw, ChevronDown, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TopNav } from "@/components/top-nav"
import { useToast } from "@/hooks/use-toast"

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
]

export default function ExportListPage() {
  const router = useRouter()
  const { toast } = useToast()

  // 文件详情对话框状态
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)

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

  // 在状态部分添加选中行状态
  const [selectedRows, setSelectedRows] = useState<string[]>([])

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

  // 替换handleSelectRow函数（如果已存在）或添加它
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // 替换handleSelectAll函数（如果已存在）或添加它
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setFilteredData.map((item) => item.id)
      setSelectedRows(filteredData.map((item) => item.id))
    } else {
      setSelectedRows([])
    }
  }

  // 修改handleDownload函数
  const handleDownload = () => {
    // 检查是否有选中的行
    if (selectedRows.length === 0) {
      toast({
        title: "操作提示",
        description: "请至少选择一条记录进行下载",
        variant: "destructive",
      })
      return
    }

    // 获取选中的数据
    const selectedData = filteredData.filter((item) => selectedRows.includes(item.id))

    // 创建CSV内容 - 只包含选中的记录
    const headers =
      "ID,车主/公司,联系电话,经办人,门店,门店编码,支付备注,订单状态,创建时间,车主类型,证件号码,车架号,厂牌型号"

    // 模拟每个文件对应的数据行
    const dataRows = [
      "ZY10025627,宋生鹏,18693582595,乔亚嘉王静,甘肃兰州神迈领克,10000267,特殊订单提前报备,已下单,2025-04-19 23:26:17,个人,620102199001011234,LSGPC52U6LF123456,领克03 2023款 2.0T",
      "ZY10025521,罗浩鹏,15101868727,乔亚嘉王静,甘肃兰州神迈领克,10000267,6880,已下单,2025-04-18 23:40:23,个人,620102199002021234,LSGPC52U6LF234567,领克01 2023款 2.0T",
      "ZY10024833,王慧,15095776983,乔亚嘉,甘肃兰州神迈领克,10000267,分期,已下单,2025-04-12 20:22:24,个人,620102199003031234,LSGPC52U6LF345678,领克02 2023款 2.0T",
      "ZY10024832,张明,13812345678,乔亚嘉,甘肃兰州神迈领克,10000267,全款,已下单,2025-04-12 18:15:32,个人,620102199004041234,LSGPC52U6LF456789,领克01 2023款 1.5T",
      "ZY10024831,李强,13912345678,王静,甘肃兰州神迈领克,10000267,分期,已下单,2025-04-12 16:42:18,个人,620102199005051234,LSGPC52U6LF567890,领克02 2023款 1.5T",
    ]

    // 根据选中的文件数量选择对应的数据行
    const csvContent = headers + "\n" + dataRows.slice(0, selectedData.length).join("\n")

    // 创建Blob对象
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })

    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `导出数据_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)

    // 触发下载
    link.click()
    document.body.removeChild(link)

    toast({
      title: "下载成功",
      description: `已成功下载 ${selectedData.length} 条记录`,
      variant: "success",
    })
  }

  // 修改handleViewDetails函数
  const handleViewDetails = () => {
    // 检查是否只选中了一条记录
    if (selectedRows.length !== 1) {
      toast({
        title: "操作提示",
        description: "请选择一条记录查看详情",
        variant: "destructive",
      })
      return
    }

    // 获取选中的记录
    const selectedFile = filteredData.find((item) => item.id === selectedRows[0])
    if (selectedFile) {
      setSelectedFile(selectedFile)
      setIsDetailsOpen(true)
    }
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
      <TopNav breadcrumbs={["首页", "文件导出", "导出列表"]} paths={["/dashboard", "/export", "/export/list"]} />

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
            {/* 在表格头部的Checkbox中添加全选功能 */}
            {/* 替换TableHeader部分的Checkbox */}
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length > 0 && selectedRows.length === filteredData.length}
                onCheckedChange={handleSelectAll}
              />
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
          </TableHeader>
          <TableBody>
            {currentPageData.length > 0 ? (
              currentPageData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  {/* 在表格行的Checkbox中添加选择功能 */}
                  {/* 替换TableBody中的Checkbox */}
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={() => handleSelectRow(item.id)}
                    />
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
                  {/* 修改操作列的按钮 */}
                  {/* 替换操作列的内容 */}
                  <TableCell>
                    <div className="flex space-x-2 text-blue-500">
                      <button className="text-xs" onClick={handleDownload} disabled={selectedRows.length === 0}>
                        下载
                      </button>
                      <button className="text-xs" onClick={handleViewDetails} disabled={selectedRows.length !== 1}>
                        详情
                      </button>
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
      {/* 文件详情对话框 */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* 对话框标题栏 */}
            <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <DialogTitle className="text-lg font-medium m-0">文件详情</DialogTitle>
              <button onClick={() => setIsDetailsOpen(false)} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedFile && (
              <div className="p-6 overflow-auto">
                {/* 文件基本信息卡片 */}
                <div className="bg-gray-50 border rounded-md p-4 mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">基本信息</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <div className="text-sm text-gray-500">ID</div>
                      <div className="text-sm font-medium">{selectedFile.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">批次ID</div>
                      <div className="text-sm font-medium">{selectedFile.batchId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">所属业务</div>
                      <div className="text-sm font-medium">{selectedFile.businessType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">文件名</div>
                      <div className="text-sm font-medium">{selectedFile.fileName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">文件大小</div>
                      <div className="text-sm font-medium">{selectedFile.fileSize}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">状态</div>
                      <div className="text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedFile.status === "完成"
                              ? "bg-green-100 text-green-800"
                              : selectedFile.status === "处理中"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedFile.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">创建者</div>
                      <div className="text-sm font-medium">{selectedFile.creator}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">创建时间</div>
                      <div className="text-sm font-medium">{selectedFile.createdAt}</div>
                    </div>
                  </div>
                </div>

                {/* 文件预览卡片 */}
                <div className="bg-gray-50 border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="text-md font-medium text-gray-700">文件预览</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">显示前 10 行数据</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-gray-300"
                        onClick={() => handleDownload(selectedFile.fileName)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> 下载完整文件
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-md bg-white max-h-[300px] overflow-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">ID</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">车主/公司</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">联系电话</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">经办人</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">门店</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">门店编码</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">支付备注</th>
                          <th className="px-2 py-2 text-left font-medium text-gray-600 border-b">订单状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="px-2 py-2 border-b">ZY10025627</td>
                          <td className="px-2 py-2 border-b">宋生鹏</td>
                          <td className="px-2 py-2 border-b">18693582595</td>
                          <td className="px-2 py-2 border-b">乔亚嘉王静</td>
                          <td className="px-2 py-2 border-b">甘肃兰州神迈领克</td>
                          <td className="px-2 py-2 border-b">10000267</td>
                          <td className="px-2 py-2 border-b">特殊订单提前报备</td>
                          <td className="px-2 py-2 border-b">已下单</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-2 py-2 border-b">ZY10025521</td>
                          <td className="px-2 py-2 border-b">罗浩鹏</td>
                          <td className="px-2 py-2 border-b">15101868727</td>
                          <td className="px-2 py-2 border-b">乔亚嘉王静</td>
                          <td className="px-2 py-2 border-b">甘肃兰州神迈领克</td>
                          <td className="px-2 py-2 border-b">10000267</td>
                          <td className="px-2 py-2 border-b">6880</td>
                          <td className="px-2 py-2 border-b">已下单</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-2 py-2 border-b">ZY10024833</td>
                          <td className="px-2 py-2 border-b">王慧</td>
                          <td className="px-2 py-2 border-b">15095776983</td>
                          <td className="px-2 py-2 border-b">乔亚嘉</td>
                          <td className="px-2 py-2 border-b">甘肃兰州神迈领克</td>
                          <td className="px-2 py-2 border-b">10000267</td>
                          <td className="px-2 py-2 border-b">分期</td>
                          <td className="px-2 py-2 border-b">已下单</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 底部操作按钮 */}
            <div className="border-t p-4 flex justify-end space-x-2 bg-gray-50">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                关闭
              </Button>
              <Button
                onClick={() => handleDownload(selectedFile?.fileName || "")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Download className="h-4 w-4 mr-1" /> 下载文件
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
