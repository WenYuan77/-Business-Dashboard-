"use client"

import Link from "next/link"
import { LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"

interface TopNavProps {
  breadcrumbs: string[]
  paths: string[]
}

export function TopNav({ breadcrumbs, paths }: TopNavProps) {
  const router = useRouter()
  const { userInfo } = useUser()

  const handleLogout = () => {
    alert("退出登录成功")
  }

  return (
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
        <div className="text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && " / "}
              {paths[index] ? (
                <Link href={paths[index]} className="hover:text-gray-700">
                  {crumb}
                </Link>
              ) : (
                crumb
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer overflow-hidden">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/profile/info")} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>个人信息</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
