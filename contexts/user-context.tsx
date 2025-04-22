"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface UserInfo {
  avatar: string
  name: string
  gender: string
  phone: string
  email: string
  department: string
  position: string
  employeeId: string
  joinDate: string
  address: string
  bio: string
}

interface UserContextType {
  userInfo: UserInfo
  updateUserInfo: (info: Partial<UserInfo>) => void
  updateAvatar: (avatarUrl: string) => void
}

const defaultUserInfo: UserInfo = {
  avatar: "",
  name: "王静",
  gender: "女",
  phone: "13800138000",
  email: "wangjing@example.com",
  department: "销售部",
  position: "销售经理",
  employeeId: "EMP20250001",
  joinDate: "2025-01-15",
  address: "甘肃省兰州市城关区东岗东路",
  bio: "5年汽车销售经验，擅长客户关系管理和团队协作。",
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo")
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo))
      } catch (error) {
        console.error("Failed to parse stored user info")
      }
    }
  }, [])

  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo((prev) => {
      const newInfo = { ...prev, ...info }
      localStorage.setItem("userInfo", JSON.stringify(newInfo))
      return newInfo
    })
  }

  const updateAvatar = (avatarUrl: string) => {
    updateUserInfo({ avatar: avatarUrl })
  }

  return <UserContext.Provider value={{ userInfo, updateUserInfo, updateAvatar }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
