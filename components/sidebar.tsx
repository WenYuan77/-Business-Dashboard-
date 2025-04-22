"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart, FileText, User, Settings, Home, ChevronDown, ChevronRight, Menu } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  // 添加状态来跟踪每个菜单项的展开/收缩状态
  const [expandedMenus, setExpandedMenus] = useState({
    保单管理: true,
    保单工具: true,
    文件导出: true,
    个人中心: true,
  })

  // 添加状态来跟踪整个侧边栏的收缩状态
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  // 切换菜单展开/收缩状态的函数
  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  return (
    <div
      className={`${sidebarCollapsed ? "w-[60px]" : "w-[200px]"} bg-[#0d1b36] text-white flex flex-col flex-shrink-0 transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!sidebarCollapsed && (
          <>
            <div className="w-10 h-10 overflow-hidden rounded">
              <img src="/images/china-flag.png" alt="中国国旗" className="w-full h-full object-cover" />
            </div>
            <span className="ml-2 font-bold">公司名字</span>
          </>
        )}
        {sidebarCollapsed && (
          <div className="w-10 h-10 overflow-hidden rounded mx-auto">
            <img src="/images/china-flag.png" alt="中国国旗" className="w-full h-full object-cover" />
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`${sidebarCollapsed ? "mx-auto mt-2" : ""} text-white hover:text-blue-400`}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="py-4 flex-1">
        <Link
          href="/dashboard"
          className={`px-4 py-3 flex items-center ${isActive("/dashboard") ? "text-blue-400" : "text-white hover:bg-[#1a2942]"}`}
        >
          <Home className="w-5 h-5 mr-2" />
          {!sidebarCollapsed && <span>首页</span>}
        </Link>

        <div className="relative">
          <div
            className={`px-4 py-3 flex items-center justify-between ${
              isActive("/warranty") || isActive("/store-management")
                ? "text-blue-400 bg-[#1a2942]"
                : "text-white hover:bg-[#1a2942]"
            }`}
          >
            <div className="flex items-center">
              {sidebarCollapsed ? (
                <Link href="/warranty" className="flex items-center">
                  <BarChart className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <BarChart className="w-5 h-5 mr-2" />
                  <span>保单管理</span>
                </>
              )}
            </div>
            {!sidebarCollapsed && (
              <button onClick={() => toggleMenu("保单管理")} className="focus:outline-none">
                {expandedMenus["保单管理"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
          {expandedMenus["保单管理"] && !sidebarCollapsed && (
            <div className="bg-[#0a1628]">
              <Link
                href="/warranty"
                className={`py-2 px-10 block ${isActive("/warranty") ? "text-blue-400" : "text-white hover:text-blue-400"}`}
              >
                延保
              </Link>
              <Link
                href="/store-management"
                className={`py-2 px-10 block ${isActive("/store-management") ? "text-blue-400" : "text-white hover:text-blue-400"}`}
              >
                门店管理
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={`px-4 py-3 flex items-center justify-between ${
              isActive("/tools") || isActive("/daily-report")
                ? "text-blue-400 bg-[#1a2942]"
                : "text-white hover:bg-[#1a2942]"
            }`}
          >
            <div className="flex items-center">
              {sidebarCollapsed ? (
                <Link href="/daily-report" className="flex items-center">
                  <Settings className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Settings className="w-5 h-5 mr-2" />
                  <span>保单工具</span>
                </>
              )}
            </div>
            {!sidebarCollapsed && (
              <button onClick={() => toggleMenu("保单工具")} className="focus:outline-none">
                {expandedMenus["保单工具"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
          {expandedMenus["保单工具"] && !sidebarCollapsed && (
            <div className="bg-[#0a1628]">
              <Link
                href="/daily-report"
                className={`py-2 px-10 block ${isActive("/daily-report") ? "text-blue-400" : "text-white hover:text-blue-400"}`}
              >
                日报
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={`px-4 py-3 flex items-center justify-between ${
              isActive("/export") ? "text-blue-400 bg-[#1a2942]" : "text-white hover:bg-[#1a2942]"
            }`}
          >
            <div className="flex items-center">
              {sidebarCollapsed ? (
                <Link href="/export/list" className="flex items-center">
                  <FileText className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  <span>文件导出</span>
                </>
              )}
            </div>
            {!sidebarCollapsed && (
              <button onClick={() => toggleMenu("文件导出")} className="focus:outline-none">
                {expandedMenus["文件导出"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
          {expandedMenus["文件导出"] && !sidebarCollapsed && (
            <div className="bg-[#0a1628]">
              <Link
                href="/export/list"
                className={`py-2 px-10 block ${isActive("/export/list") ? "text-blue-400" : "text-white hover:text-blue-400"}`}
              >
                导出列表
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={`px-4 py-3 flex items-center justify-between ${
              isActive("/profile") ? "text-blue-400 bg-[#1a2942]" : "text-white hover:bg-[#1a2942]"
            }`}
          >
            <div className="flex items-center">
              {sidebarCollapsed ? (
                <Link href="/profile/info" className="flex items-center">
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <User className="w-5 h-5 mr-2" />
                  <span>个人中心</span>
                </>
              )}
            </div>
            {!sidebarCollapsed && (
              <button onClick={() => toggleMenu("个人中心")} className="focus:outline-none">
                {expandedMenus["个人中心"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
          {expandedMenus["个人中心"] && !sidebarCollapsed && (
            <div className="bg-[#0a1628]">
              <Link
                href="/profile/info"
                className={`py-2 px-10 block ${isActive("/profile/info") ? "text-blue-400" : "text-white hover:text-blue-400"}`}
              >
                个人信息
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
