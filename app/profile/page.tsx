"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  // 自动重定向到个人信息页面
  useEffect(() => {
    router.push("/profile/info")
  }, [router])

  return null
}
