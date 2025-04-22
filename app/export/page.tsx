"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ExportPage() {
  const router = useRouter()

  // 自动重定向到导出列表页面
  useEffect(() => {
    router.push("/export/list")
  }, [router])

  return null
}
