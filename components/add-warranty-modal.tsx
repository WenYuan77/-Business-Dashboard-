"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface AddWarrantyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddWarrantyModal({ isOpen, onClose }: AddWarrantyModalProps) {
  const router = useRouter()

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

  if (!isOpen) return null

  const handleRedirect = () => {
    router.push("/warranty/add")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[400px] max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">新增延保</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6">您即将创建一个新的延保记录。请确认是否继续？</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button onClick={handleRedirect} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            继续
          </button>
        </div>
      </div>
    </div>
  )
}
