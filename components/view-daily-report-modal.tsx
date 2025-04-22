"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DailyReportData } from "@/types/daily-report"

interface ViewDailyReportModalProps {
  isOpen: boolean
  onClose: () => void
  report: DailyReportData | null
}

export function ViewDailyReportModal({ isOpen, onClose, report }: ViewDailyReportModalProps) {
  // 当模态窗口打开时，阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen || !report) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto pt-10 pb-10">
      <div className="bg-white rounded-lg w-[90%] max-w-[1200px] max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">查看日报 - {report.date}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {/* 基本信息 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">基本信息</div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm mb-1 font-medium">日期</div>
                <div className="p-2 border rounded-md">{report.date}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">门店</div>
                <div className="p-2 border rounded-md">{report.store}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">姓名</div>
                <div className="p-2 border rounded-md">{report.name}</div>
              </div>
            </div>
          </div>

          {/* 上午工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">上午工作</div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-1 font-medium">工作</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.morningWork || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">成果</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.morningResult || "无内容"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1 font-medium">问题</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.morningIssue || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">解决</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.morningSolution || "无内容"}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm mb-1 font-medium">备注及其他情况</div>
              <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                {report.morningRemark1 || "无内容"}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm mb-1 font-medium">备注及其他情况</div>
              <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                {report.morningRemark2 || "无内容"}
              </div>
            </div>
          </div>

          {/* 下午工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">下午工作</div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm mb-1 font-medium">今日总结</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.daySummary || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">今日保单数量</div>
                <div className="p-2 border rounded-md">{report.policyCount || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">今日保费（元）</div>
                <div className="p-2 border rounded-md">{report.policyAmount || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">今日接待客户数量（组）</div>
                <div className="p-2 border rounded-md">{report.customerCount || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">今日电话回访客户数量（组）</div>
                <div className="p-2 border rounded-md">{report.callbackCount || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">今日新增客户数量</div>
                <div className="p-2 border rounded-md">{report.newCustomerCount || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">保单转化率（%）</div>
                <div className="p-2 border rounded-md">{report.conversionRate || "0"}</div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">明日工作计划</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.tomorrowPlan || "无内容"}
                </div>
              </div>
            </div>
          </div>

          {/* 本周工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">本周工作</div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-1 font-medium">周一</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.monday || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">周二</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.tuesday || "无内容"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1 font-medium">周三</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.wednesday || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">周四</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.thursday || "无内容"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1 font-medium">周五</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.friday || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">周六</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.saturday || "无内容"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1 font-medium">周日</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.sunday || "无内容"}
                </div>
              </div>
            </div>
          </div>

          {/* 本月工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">本月工作</div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm mb-1 font-medium">本月总结</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.monthSummary || "无内容"}
                </div>
              </div>
              <div>
                <div className="text-sm mb-1 font-medium">下月计划</div>
                <div className="p-2 border rounded-md min-h-[100px] whitespace-pre-wrap">
                  {report.nextMonthPlan || "无内容"}
                </div>
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex justify-end space-x-4 mt-8 sticky bottom-0 bg-white py-4">
            <Button onClick={onClose} className="bg-blue-500 hover:bg-blue-600">
              关闭
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
