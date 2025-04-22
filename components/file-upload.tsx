"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FileUploadProps {
  label?: string
  buttonText?: string
  onChange?: (file: File | null) => void
}

export function FileUpload({ label, buttonText = "上传文件", onChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setFileName(selectedFile?.name || "")
    if (onChange) {
      onChange(selectedFile)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onChange) {
      onChange(null)
    }
  }

  return (
    <div className="flex flex-col">
      {label && <div className="text-sm mb-1">{label}</div>}
      <div className="flex items-center">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <Button type="button" onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 h-8 text-sm px-3">
          {buttonText}
        </Button>
        {fileName && (
          <div className="ml-2 flex items-center">
            <span className="text-sm text-gray-600">{fileName}</span>
            <button type="button" onClick={handleRemoveFile} className="ml-1 text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
