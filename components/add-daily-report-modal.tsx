"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddDailyReportModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: any) => void
}

export function AddDailyReportModal({ isOpen, onClose, onAdd }: AddDailyReportModalProps) {
  // 基本信息
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [store, setStore] = useState<string>("甘肃兰州神迈领克")
  const [name, setName] = useState<string>("王静")

  // 重置表单
  const resetForm = () => {
    setDate(new Date().toISOString().split("T")[0])
    setStore("甘肃兰州神迈领克")
    setName("王静")
  }

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

  // 处理提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 创建新的日报数据
    const newReport = {
      id: Math.floor(Math.random() * 10000 + 63000).toString(),
      name,
      store,
      date,
      status: "正常",
      createdAt: new Date()
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
      updatedAt: new Date()
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

    // 添加新日报
    onAdd(newReport)

    // 重置表单
    resetForm()

    // 关闭模态窗口
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto pt-10 pb-10">
      <div className="bg-white rounded-lg w-[90%] max-w-[1200px] max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">新增日报</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* 基本信息 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">基本信息</div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm mb-1">日期</div>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-9" required />
              </div>
              <div>
                <div className="text-sm mb-1">门店</div>
                <Select value={store} onValueChange={setStore}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择门店" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="甘肃兰州神迈领克">甘肃兰州神迈领克</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm mb-1">姓名</div>
                <Select value={name} onValueChange={setName}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="请选择姓名" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="王静">王静</SelectItem>
                    <SelectItem value="乔亚嘉">乔亚嘉</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 上午工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">上午工作</div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-1">工作</div>
                <Textarea placeholder="请输入上午工作内容" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">成果</div>
                <Textarea placeholder="请输入上午工作成果" className="resize-none h-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1">问题</div>
                <Textarea placeholder="请输入上午工作问题" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">解决</div>
                <Textarea placeholder="请输入上午问题解决方案" className="resize-none h-24" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm mb-1">备注及其他情况</div>
              <Textarea placeholder="请输入备注及其他情况" className="resize-none h-24" />
            </div>
            <div className="mt-4">
              <div className="text-sm mb-1">备注及其他情况</div>
              <Textarea placeholder="请输入备注及其他情况" className="resize-none h-24" />
            </div>
          </div>

          {/* 下午工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">下午工作</div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm mb-1">今日总结</div>
                <Textarea placeholder="请输入今日总结" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">今日保单数量</div>
                <Input placeholder="请输入今日保单数量" className="h-9" />
              </div>
              <div>
                <div className="text-sm mb-1">今日保费（元）</div>
                <div className="flex items-center">
                  <Input placeholder="请输入今日保费" className="h-9" />
                  <Button type="button" className="ml-2 bg-blue-500 hover:bg-blue-600 h-9 px-2">
                    计算
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm mb-1">今日接待客户数量（组）</div>
                <Input placeholder="请输入今日接待客户数量" className="h-9" />
              </div>
              <div>
                <div className="text-sm mb-1">今日电话回访客户数量（组）</div>
                <Input placeholder="请输入今日电话回访客户数量" className="h-9" />
              </div>
              <div>
                <div className="text-sm mb-1">今日新增客户数量</div>
                <Input placeholder="请输入今日新增客户数量" className="h-9" />
              </div>
              <div>
                <div className="text-sm mb-1">保单转化率（%）</div>
                <Input placeholder="请输入保单转化率" className="h-9" />
              </div>
              <div>
                <div className="text-sm mb-1">明日工作计划</div>
                <Textarea placeholder="请输入明日工作计划" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">今日照片</div>
                <div className="flex items-center">
                  <Input placeholder="请上传今日照片" className="h-9" readOnly />
                  <Button type="button" className="ml-2 bg-blue-500 hover:bg-blue-600 h-9 px-2">
                    上传
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 本周工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">本周工作</div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-1">周一</div>
                <Textarea placeholder="请输入周一工作内容" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">周二</div>
                <Textarea placeholder="请输入周二工作内容" className="resize-none h-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1">周三</div>
                <Textarea placeholder="请输入周三工作内容" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">周四</div>
                <Textarea placeholder="请输入周四工作内容" className="resize-none h-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1">周五</div>
                <Textarea placeholder="请输入周五工作内容" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">周六</div>
                <Textarea placeholder="请输入周六工作内容" className="resize-none h-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="text-sm mb-1">周日</div>
                <Textarea placeholder="请输入周日工作内容" className="resize-none h-24" />
              </div>
            </div>
          </div>

          {/* 本月工作 */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-medium mb-4">本月工作</div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm mb-1">本月总结</div>
                <Textarea placeholder="请输入本月总结" className="resize-none h-24" />
              </div>
              <div>
                <div className="text-sm mb-1">下月计划</div>
                <Textarea placeholder="请输入下月计划" className="resize-none h-24" />
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-4 mt-8 sticky bottom-0 bg-white py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              确定
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
