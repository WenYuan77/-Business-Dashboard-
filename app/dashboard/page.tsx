"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { TopNav } from "@/components/top-nav"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("sales")

  // 模拟月度销售数据
  const monthlyData = [
    { month: "1月", value: 850 },
    { month: "2月", value: 400 },
    { month: "3月", value: 380 },
    { month: "4月", value: 500 },
    { month: "5月", value: 420 },
    { month: "6月", value: 950 },
    { month: "7月", value: 700 },
    { month: "8月", value: 650 },
    { month: "9月", value: 650 },
    { month: "10月", value: 900 },
    { month: "11月", value: 800 },
    { month: "12月", value: 900 },
  ]

  // 模拟门店销售排行数据
  const storeRankings = [
    { id: 1, name: "白鹭岛 1 号店", value: "1234.56" },
    { id: 2, name: "白鹭岛 2 号店", value: "1134.56" },
    { id: 3, name: "白鹭岛 3 号店", value: "1034.56" },
    { id: 4, name: "白鹭岛 4 号店", value: "934.56" },
    { id: 5, name: "白鹭岛 5 号店", value: "834.56" },
    { id: 6, name: "白鹭岛 6 号店", value: "734.56" },
    { id: 7, name: "白鹭岛 7 号店", value: "634.56" },
  ]

  // 计算最大值用于图表高度比例
  const maxValue = Math.max(...monthlyData.map((item) => item.value))

  return (
    <div className="flex-1 bg-gray-100">
      {/* 顶部导航 */}
      <TopNav breadcrumbs={["首页", "首页"]} paths={["/dashboard", ""]} />

      {/* 首页标签 */}
      <div className="bg-white border-b">
        <div className="px-4">
          <button className="py-3 text-blue-500 border-b-2 border-blue-500">首页</button>
        </div>
      </div>

      {/* 卡片指标区域 */}
      <div className="p-4 grid grid-cols-4 gap-4">
        {/* 当月销售额 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 mb-2">当月销售额</div>
                <div className="text-2xl font-bold">¥ 126,560</div>
              </div>
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </div>
            <div className="mt-4 text-xs">
              <span className="text-gray-500">周同比 12% </span>
              <span className="ml-2 text-gray-500">日同比 11% </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">日均销售额 ¥ 234.56</div>
          </CardContent>
        </Card>

        {/* 日销售额 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 mb-2">日销售额</div>
                <div className="text-2xl font-bold">8846</div>
              </div>
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </div>
            <div className="mt-4 h-[50px] flex items-end">
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 0,100 L 0,80 C 13.333333333333334,73.33333333333333 26.666666666666668,66.66666666666667 40,60 C 53.333333333333336,53.333333333333336 66.66666666666667,46.666666666666664 80,40 C 93.33333333333333,33.333333333333336 106.66666666666667,26.666666666666668 120,30 C 133.33333333333334,33.333333333333336 146.66666666666666,46.666666666666664 160,50 C 173.33333333333334,53.333333333333336 186.66666666666666,46.666666666666664 200,40 C 213.33333333333334,33.333333333333336 226.66666666666666,26.666666666666668 240,30 C 253.33333333333334,33.333333333333336 266.6666666666667,46.666666666666664 280,50 C 293.3333333333333,53.333333333333336 306.6666666666667,46.666666666666664 320,50 C 333.3333333333333,53.333333333333336 346.6666666666667,66.66666666666667 360,70 C 373.3333333333333,73.33333333333333 386.6666666666667,66.66666666666667 400,60 L 400,100 Z"
                  fill="#a4cafd"
                  fillOpacity="0.6"
                />
                <path
                  d="M 0,80 C 13.333333333333334,73.33333333333333 26.666666666666668,66.66666666666667 40,60 C 53.333333333333336,53.333333333333336 66.66666666666667,46.666666666666664 80,40 C 93.33333333333333,33.333333333333336 106.66666666666667,26.666666666666668 120,30 C 133.33333333333334,33.333333333333336 146.66666666666666,46.666666666666664 160,50 C 173.33333333333334,53.333333333333336 186.66666666666666,46.666666666666664 200,40 C 213.33333333333334,33.333333333333336 226.66666666666666,26.666666666666668 240,30 C 253.33333333333334,33.333333333333336 266.6666666666667,46.666666666666664 280,50 C 293.3333333333333,53.333333333333336 306.6666666666667,46.666666666666664 320,50 C 333.3333333333333,53.333333333333336 346.6666666666667,66.66666666666667 360,70 C 373.3333333333333,73.33333333333333 386.6666666666667,66.66666666666667 400,60"
                  fill="none"
                  stroke="#4d94ff"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="mt-2 text-xs text-gray-500">周同比 1234</div>
          </CardContent>
        </Card>

        {/* 订单数量 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 mb-2">订单数量</div>
                <div className="text-2xl font-bold">6560</div>
              </div>
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </div>
            <div className="mt-4 h-[50px] flex items-end justify-between">
              {[35, 60, 25, 50, 45, 55, 20].map((height, index) => (
                <div key={index} className="w-[8%] bg-blue-400" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">周同比 60%</div>
          </CardContent>
        </Card>

        {/* 开单比例 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 mb-2">开单比例</div>
                <div className="text-2xl font-bold">78%</div>
              </div>
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <Progress value={78} className="h-2 bg-gray-200" indicatorClassName="bg-teal-400" />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              周同比 12% <span className="text-red-500">↓</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 销售额/访问量 标签页 */}
      <div className="mx-4 mt-4 bg-white rounded-md overflow-hidden">
        <Tabs defaultValue="sales" className="w-full">
          <div className="px-4 pt-4 border-b">
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger
                value="sales"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent"
              >
                销售额
              </TabsTrigger>
              <TabsTrigger
                value="visits"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent"
              >
                访问量
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="sales" className="p-4">
            <div className="grid grid-cols-2 gap-8">
              {/* 销售额排行 */}
              <div>
                <h3 className="text-lg font-medium mb-6">销售额排行</h3>
                <div className="h-[400px] flex items-end">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-[70%] bg-blue-400 rounded-sm"
                        style={{ height: `${(item.value / maxValue) * 350}px` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 门店销售排行榜 */}
              <div>
                <h3 className="text-lg font-medium mb-6">门店销售排行榜</h3>
                <Table>
                  <TableBody>
                    {storeRankings.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="py-3">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                              {store.id}
                            </div>
                            <span>{store.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{store.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visits">
            <div className="p-4 h-[400px] flex items-center justify-center text-gray-500">
              访问量数据（此处为示例，实际应显示访问量相关数据）
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 页脚 */}
      <div className="mt-8 p-4 text-center text-gray-500 text-sm">
        Copyright © 2023 - 2025 成都定域科技有限公司. All Rights Reserved.
      </div>
    </div>
  )
}
