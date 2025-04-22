"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  RotateCcw,
  Plus,
  Edit,
  Trash,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Copy,
  FileEdit,
  FileX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TopNav } from "@/components/top-nav"
import { useToast } from "@/hooks/use-toast"
import { AddDailyReportModal } from "@/components/add-daily-report-modal"
import { ViewDailyReportModal } from "@/components/view-daily-report-modal"
import { EditDailyReportModal } from "@/components/edit-daily-report-modal"
import type { DailyReportData } from "@/types/daily-report"

// 初始日报数据 - 包含真实内容的示例数据
const initialReportData: DailyReportData[] = [
  {
    id: "63518",
    name: "王静",
    store: "甘肃兰州神迈领克",
    date: "2025-04-21",
    status: "正常",
    createdAt: "2025-04-21 01:59:51",
    updatedAt: "2025-04-21 02:09:23",
    morningWork: "1. 整理客户资料，更新客户跟进记录\n2. 联系3位潜在客户，介绍新车型及保险方案\n3. 准备下午客户演示材料",
    morningResult: "1. 完成15位客户资料更新\n2. 成功预约2位客户下周到店看车\n3. 完成演示PPT制作",
    morningIssue: "客户对新车型保险方案有疑问，需要更详细的解释",
    morningSolution: "准备了详细的保险方案对比表，包含不同档次的保障内容和价格",
    morningRemark1: "今日上午客流量较少，主要以电话沟通为主",
    morningRemark2: "需要更新产品手册，部分资料已过时",
    daySummary: "今日完成了客户资料整理和潜在客户沟通工作，为两位客户提供了详细的保险方案，并成功签约一位客户。",
    policyCount: "1",
    policyAmount: "6800",
    customerCount: "3",
    callbackCount: "5",
    newCustomerCount: "1",
    conversionRate: "33",
    tomorrowPlan: "1. 跟进今日预约的客户\n2. 完成产品手册更新\n3. 参加早会培训",
    monday: "客户回访，资料整理",
    tuesday: "新客户接待，保单签约",
    wednesday: "产品培训，客户预约",
    thursday: "外出拜访客户，保单跟进",
    friday: "团队会议，周报准备",
    saturday: "周末值班，新客户接待",
    sunday: "休息",
    monthSummary: "本月共完成保单15份，总保费金额98,600元，较上月增长12%。新增客户8位，客户满意度调查结果良好。",
    nextMonthPlan: "1. 提高保单转化率，目标达到40%\n2. 加强团队协作，提高客户服务质量\n3. 学习新产品知识，提升专业能力",
  },
  {
    id: "63315",
    name: "王静",
    store: "甘肃兰州神迈领克",
    date: "2025-04-20",
    status: "正常",
    createdAt: "2025-04-20 02:08:30",
    updatedAt: "2025-04-20 02:08:30",
    morningWork: "1. 参加早会\n2. 整理客户资料\n3. 接待预约客户",
    morningResult: "1. 完成10位客户资料更新\n2. 接待2位预约客户，介绍车型及保险方案",
    morningIssue: "一位客户对保险条款有异议",
    morningSolution: "详细解释保险条款，并提供了案例说明",
    morningRemark1: "客户对我们的服务态度表示满意",
    morningRemark2: "需要更新一些宣传材料",
    daySummary: "今日接待了两位预约客户，成功签约一位。另外完成了客户资料的整理和更新工作。",
    policyCount: "1",
    policyAmount: "7200",
    customerCount: "2",
    callbackCount: "3",
    newCustomerCount: "0",
    conversionRate: "50",
    tomorrowPlan: "1. 继续跟进未成交客户\n2. 准备月度总结报告\n3. 更新宣传材料",
    monday: "客户回访，资料整理",
    tuesday: "新客户接待，保单签约",
    wednesday: "产品培训，客户预约",
    thursday: "外出拜访客户，保单跟进",
    friday: "团队会议，周报准备",
    saturday: "今日工作",
    sunday: "休息",
    monthSummary: "本月工作进展顺利，达成销售目标85%",
    nextMonthPlan: "加强客户回访，提高转化率",
  },
  {
    id: "63131",
    name: "乔亚嘉",
    store: "甘肃兰州神迈领克",
    date: "2025-04-19",
    status: "正常",
    createdAt: "2025-04-19 02:21:22",
    updatedAt: "2025-04-19 19:13:27",
    morningWork: "1. 电话回访老客户\n2. 整理保单资料\n3. 学习新产品知识",
    morningResult: "1. 完成8位客户回访\n2. 整理归档15份保单\n3. 完成新产品培训测试",
    morningIssue: "部分客户联系方式已变更",
    morningSolution: "通过其他渠道更新了客户联系方式",
    morningRemark1: "客户对我们的售后服务评价良好",
    morningRemark2: "需要加强新产品知识培训",
    daySummary: "今日主要进行了客户回访和资料整理工作，同时完成了新产品知识的学习和测试。",
    policyCount: "0",
    policyAmount: "0",
    customerCount: "0",
    callbackCount: "8",
    newCustomerCount: "0",
    conversionRate: "0",
    tomorrowPlan: "1. 接待预约客户\n2. 准备团队会议材料\n3. 继续学习新产品知识",
    monday: "客户回访，资料整理",
    tuesday: "新客户接待，保单签约",
    wednesday: "产品培训，客户预约",
    thursday: "外出拜访客户，保单跟进",
    friday: "今日工作",
    saturday: "周末值班",
    sunday: "休息",
    monthSummary: "本月客户满意度调查结果良好，需要加强新客户开发",
    nextMonthPlan: "增加外出拜访客户频次，拓展新客户来源",
  },
]

export default function DailyReportPage() {
  const { toast } = useToast()

  // 日报数据
  const [reportData, setReportData] = useState<DailyReportData[]>(initialReportData)

  // 过滤后的数据
  const [filteredData, setFilteredData] = useState<DailyReportData[]>(initialReportData)

  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    store: "",
    startDate: "",
    endDate: "",
  })

  // 选中行状态
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInputValue, setPageInputValue] = useState("1")
  const [itemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // 模态窗口状态
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentReport, setCurrentReport] = useState<DailyReportData | null>(null)

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
    const filtered = reportData.filter((item) => {
      // 门店筛选
      if (searchParams.store && searchParams.store !== "all" && item.store !== searchParams.store) {
        return false
      }

      // 日期范围筛选 - 开始日期
      if (searchParams.startDate) {
        const startDate = new Date(searchParams.startDate)
        const itemDate = new Date(item.date)
        if (itemDate < startDate) {
          return false
        }
      }

      // 日期范围筛选 - 结束日期
      if (searchParams.endDate) {
        const endDate = new Date(searchParams.endDate)
        endDate.setHours(23, 59, 59, 999) // 设置为当天结束时间
        const itemDate = new Date(item.date)
        if (itemDate > endDate) {
          return false
        }
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
      store: "",
      startDate: "",
      endDate: "",
    })
    setFilteredData(reportData)
    setCurrentPage(1)
    setPageInputValue("1")
  }

  // 处理新增
  const handleAdd = () => {
    setIsAddModalOpen(true)
  }

  // 处理添加新日报
  const handleAddReport = (newReport: DailyReportData) => {
    // 添加新日报到数据列表
    const updatedReports = [newReport, ...reportData]
    setReportData(updatedReports)
    setFilteredData(updatedReports)

    // 显示成功提示
    toast({
      title: "添加成功",
      description: "新日报已成功添加",
      variant: "success",
    })
  }

  // 处理查看
  const handleView = (id: string) => {
    const report = reportData.find((r) => r.id === id)
    if (report) {
      setCurrentReport(report)
      setIsViewModalOpen(true)
    }
  }

  // 处理修改
  const handleEdit = (id?: string) => {
    // 如果提供了ID，使用该ID；否则使用选中的行
    const reportId = id || (selectedRows.length === 1 ? selectedRows[0] : null)

    if (!reportId) {
      toast({
        title: "操作提示",
        description: "请选择一条记录进行修改",
        variant: "destructive",
      })
      return
    }

    const report = reportData.find((r) => r.id === reportId)
    if (report) {
      setCurrentReport(report)
      setIsEditModalOpen(true)
    }
  }

  // 处理保存修改
  const handleSaveEdit = (updatedReport: DailyReportData) => {
    // 更新日报数据
    const updatedReports = reportData.map((report) => (report.id === updatedReport.id ? updatedReport : report))

    setReportData(updatedReports)
    setFilteredData(updatedReports)

    // 显示成功提示
    toast({
      title: "修改成功",
      description: "日报已成功更新",
      variant: "success",
    })
  }

  // 处理删除
  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast({
        title: "操作提示",
        description: "请至少选择一条记录进行删除",
        variant: "destructive",
      })
      return
    }

    // 实际删除选中的记录
    const updatedReports = reportData.filter((report) => !selectedRows.includes(report.id))
    setReportData(updatedReports)
    setFilteredData(updatedReports)
    setSelectedRows([])

    toast({
      title: "删除成功",
      description: `已成功删除 ${selectedRows.length} 条记录`,
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
      <TopNav breadcrumbs={["首页", "保单工具", "日报"]} paths={["/dashboard", "/tools", "/daily-report"]} />

      {/* 页面标签 */}
      <div className="bg-white border-b">
        <div className="flex">
          <a href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
            首页
          </a>
          <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
            日报
            <button className="ml-1 text-gray-400">×</button>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="p-4 bg-white">
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <div className="text-sm mb-1">门店</div>
            <Select value={searchParams.store} onValueChange={(value) => handleSearchChange("store", value)}>
              <SelectTrigger className="h-9 w-[200px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="甘肃兰州神迈领克">甘肃兰州神迈领克</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-sm mb-1">日期范围</div>
            <div className="flex items-center">
              <Input
                type="date"
                className="h-9 w-[150px]"
                value={searchParams.startDate}
                onChange={(e) => handleSearchChange("startDate", e.target.value)}
              />
              <span className="mx-2">至</span>
              <Input
                type="date"
                className="h-9 w-[150px]"
                value={searchParams.endDate}
                onChange={(e) => handleSearchChange("endDate", e.target.value)}
              />
            </div>
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
        <div className="mb-4 flex space-x-2">
          <Button className="bg-blue-500 hover:bg-blue-600 h-8 text-sm px-3" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1" /> 新增
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white h-8 text-sm px-3"
            onClick={() => handleEdit()}
            disabled={selectedRows.length !== 1}
          >
            <Edit className="h-4 w-4 mr-1" /> 修改
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white h-8 text-sm px-3"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
          >
            <Trash className="h-4 w-4 mr-1" /> 删除
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
                  编号 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">姓名</TableHead>
                <TableHead className="font-medium">门店</TableHead>
                <TableHead className="font-medium">日期</TableHead>
                <TableHead className="font-medium">状态</TableHead>
                <TableHead className="font-medium">
                  创建时间 <ChevronDown className="inline h-4 w-4" />
                </TableHead>
                <TableHead className="font-medium">
                  更新时间 <ChevronDown className="inline h-4 w-4" />
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
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.store}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 text-blue-500">
                        <button className="flex items-center text-xs">
                          <Copy className="h-3 w-3 mr-1" />
                          复制
                        </button>
                        <button className="flex items-center text-xs" onClick={() => handleView(row.id)}>
                          <Info className="h-3 w-3 mr-1" />
                          查看
                        </button>
                        <button className="flex items-center text-xs" onClick={() => handleEdit(row.id)}>
                          <FileEdit className="h-3 w-3 mr-1" />
                          修改
                        </button>
                        <button className="flex items-center text-xs">
                          <FileX className="h-3 w-3 mr-1" />
                          删除
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
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
                {totalPages > 1 && (
                  <button
                    className="px-3 py-1 border-t border-b text-gray-500 hover:bg-gray-100"
                    onClick={() => handlePageChange(2)}
                  >
                    2
                  </button>
                )}
                {totalPages > 2 && (
                  <button
                    className="px-3 py-1 border-t border-b text-gray-500 hover:bg-gray-100"
                    onClick={() => handlePageChange(3)}
                  >
                    3
                  </button>
                )}
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

      {/* 新增日报模态窗口 */}
      <AddDailyReportModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddReport} />

      {/* 查看日报模态窗口 */}
      <ViewDailyReportModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} report={currentReport} />

      {/* 编辑日报模态窗口 */}
      <EditDailyReportModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        report={currentReport}
        onSave={handleSaveEdit}
      />
    </div>
  )
}
