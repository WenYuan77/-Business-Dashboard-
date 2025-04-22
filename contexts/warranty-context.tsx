"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// 定义延保数据接口
export interface WarrantyData {
  id: string
  company: string
  phone: string
  responsible: string
  store: string
  storeCode: string
  payment: string
  status: string
  createdAt: string
  count: number
  vehicleType?: string
  idNumber?: string
  frameNumber?: string
  vehicleModel?: string
  customerAddress?: string
  vehicleLicenseNumber?: string
  gender?: string
  licensePlate?: string
  engineNumber?: string
  vehicleColor?: string
  purchasePrice?: string
  purchaseDate?: string
  vehicleUsage?: string
  displacement?: string
  vehicleRemark?: string
  insuranceCompany?: string
  compulsoryPolicyNumber?: string
  commercialPolicyNumber?: string
  insuranceStartDate?: string
  insuranceEndDate?: string
  isRenewal?: string
  handlingTime?: string
  insuranceRemark?: string
}

// 定义新增延保表单数据接口
export interface WarrantyFormData {
  vehicleType: string
  customerName: string
  customerPhone: string
  idType: string
  idNumber: string
  customerAddress?: string
  vehicleFrameNumber: string
  vehicleLicenseNumber: string
  gender?: string
  vehicleModel: string
  licensePlate?: string
  engineNumber?: string
  vehicleColor?: string
  vehicleCategory?: string
  purchasePrice?: string
  purchaseDate?: string
  vehicleUsage?: string
  displacement?: string
  vehicleRemark?: string
  insuranceCompany?: string
  compulsoryPolicyNumber?: string
  commercialPolicyNumber?: string
  insuranceStartDate?: string
  insuranceEndDate?: string
  isRenewal?: string
  responsible: string
  store: string
  storeCode: string
  handlingTime?: string
  payment: string
  insuranceRemark?: string
}

interface WarrantyContextType {
  warranties: WarrantyData[]
  addWarranty: (formData: WarrantyFormData) => void
  updateWarranty: (id: string, formData: WarrantyFormData) => void
  getWarrantyById: (id: string) => WarrantyData | undefined
  loading: boolean
}

// 创建上下文
const WarrantyContext = createContext<WarrantyContextType | undefined>(undefined)

// 初始数据 - 只保留三条
const initialWarranties: WarrantyData[] = [
  {
    id: "ZY10025627",
    company: "宋生鹏",
    phone: "18693582595",
    responsible: "乔亚嘉王静",
    store: "甘肃兰州神迈领克",
    storeCode: "10000267",
    payment: "特殊订单提前报备",
    status: "已下单",
    createdAt: "2025-04-19 23:26:17",
    count: 1,
    vehicleType: "个人",
    idNumber: "620102199001011234",
    frameNumber: "LSGPC52U6LF123456",
    vehicleModel: "领克03 2023款 2.0T",
  },
  {
    id: "ZY10025521",
    company: "罗浩鹏",
    phone: "15101868727",
    responsible: "乔亚嘉王静",
    store: "甘肃兰州神迈领克",
    storeCode: "10000267",
    payment: "6880",
    status: "已下单",
    createdAt: "2025-04-18 23:40:23",
    count: 1,
    vehicleType: "个人",
    idNumber: "620102199002021234",
    frameNumber: "LSGPC52U6LF234567",
    vehicleModel: "领克01 2023款 2.0T",
  },
  {
    id: "ZY10024833",
    company: "王慧",
    phone: "15095776983",
    responsible: "乔亚嘉",
    store: "甘肃兰州神迈领克",
    storeCode: "10000267",
    payment: "分期",
    status: "已下单",
    createdAt: "2025-04-12 20:22:24",
    count: 1,
    vehicleType: "个人",
    idNumber: "620102199003031234",
    frameNumber: "LSGPC52U6LF345678",
    vehicleModel: "领克02 2023款 2.0T",
  },
]

// 生成唯一ID
const generateId = (): string => {
  const randomNum = Math.floor(10000000 + Math.random() * 90000000)
  return `ZY${randomNum}`
}

// 提供者组件
export function WarrantyProvider({ children }: { children: React.ReactNode }) {
  const [warranties, setWarranties] = useState<WarrantyData[]>(initialWarranties)
  const [loading, setLoading] = useState(false)

  // 从本地存储加载数据
  useEffect(() => {
    const storedWarranties = localStorage.getItem("warranties")
    if (storedWarranties) {
      try {
        setWarranties(JSON.parse(storedWarranties))
      } catch (error) {
        console.error("Failed to parse stored warranties:", error)
      }
    }
  }, [])

  // 保存数据到本地存储
  useEffect(() => {
    localStorage.setItem("warranties", JSON.stringify(warranties))
  }, [warranties])

  // 添加新的延保
  const addWarranty = (formData: WarrantyFormData) => {
    setLoading(true)

    // 模拟API请求延迟
    setTimeout(() => {
      const newWarranty: WarrantyData = {
        id: generateId(),
        company: formData.customerName,
        phone: formData.customerPhone,
        responsible: formData.responsible || "系统管理员",
        store: formData.store || "甘肃兰州神迈领克",
        storeCode: formData.storeCode || "10000267",
        payment: formData.payment || "0",
        status: "已下单",
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
        count: 1,
        vehicleType: formData.vehicleType,
        idNumber: formData.idNumber,
        frameNumber: formData.vehicleFrameNumber,
        vehicleModel: formData.vehicleModel,
        customerAddress: formData.customerAddress,
        vehicleLicenseNumber: formData.vehicleLicenseNumber,
        gender: formData.gender,
        licensePlate: formData.licensePlate,
        engineNumber: formData.engineNumber,
        vehicleColor: formData.vehicleColor,
        purchasePrice: formData.purchasePrice,
        purchaseDate: formData.purchaseDate,
        vehicleUsage: formData.vehicleUsage,
        displacement: formData.displacement,
        vehicleRemark: formData.vehicleRemark,
        insuranceCompany: formData.insuranceCompany,
        compulsoryPolicyNumber: formData.compulsoryPolicyNumber,
        commercialPolicyNumber: formData.commercialPolicyNumber,
        insuranceStartDate: formData.insuranceStartDate,
        insuranceEndDate: formData.insuranceEndDate,
        isRenewal: formData.isRenewal,
        handlingTime: formData.handlingTime,
        insuranceRemark: formData.insuranceRemark,
      }

      setWarranties((prev) => [newWarranty, ...prev])
      setLoading(false)
    }, 1000)
  }

  // 更新延保
  const updateWarranty = (id: string, formData: WarrantyFormData) => {
    setLoading(true)

    // 模拟API请求延迟
    setTimeout(() => {
      setWarranties((prev) =>
        prev.map((warranty) => {
          if (warranty.id === id) {
            return {
              ...warranty,
              company: formData.customerName,
              phone: formData.customerPhone,
              responsible: formData.responsible || warranty.responsible,
              store: formData.store || warranty.store,
              storeCode: formData.storeCode || warranty.storeCode,
              payment: formData.payment || warranty.payment,
              vehicleType: formData.vehicleType,
              idNumber: formData.idNumber,
              frameNumber: formData.vehicleFrameNumber,
              vehicleModel: formData.vehicleModel,
              customerAddress: formData.customerAddress,
              vehicleLicenseNumber: formData.vehicleLicenseNumber,
              gender: formData.gender,
              licensePlate: formData.licensePlate,
              engineNumber: formData.engineNumber,
              vehicleColor: formData.vehicleColor,
              purchasePrice: formData.purchasePrice,
              purchaseDate: formData.purchaseDate,
              vehicleUsage: formData.vehicleUsage,
              displacement: formData.displacement,
              vehicleRemark: formData.vehicleRemark,
              insuranceCompany: formData.insuranceCompany,
              compulsoryPolicyNumber: formData.compulsoryPolicyNumber,
              commercialPolicyNumber: formData.commercialPolicyNumber,
              insuranceStartDate: formData.insuranceStartDate,
              insuranceEndDate: formData.insuranceEndDate,
              isRenewal: formData.isRenewal,
              handlingTime: formData.handlingTime,
              insuranceRemark: formData.insuranceRemark,
            }
          }
          return warranty
        }),
      )
      setLoading(false)
    }, 1000)
  }

  // 根据ID获取延保
  const getWarrantyById = (id: string) => {
    return warranties.find((warranty) => warranty.id === id)
  }

  return (
    <WarrantyContext.Provider value={{ warranties, addWarranty, updateWarranty, getWarrantyById, loading }}>
      {children}
    </WarrantyContext.Provider>
  )
}

// 自定义钩子
export function useWarranty() {
  const context = useContext(WarrantyContext)
  if (context === undefined) {
    throw new Error("useWarranty must be used within a WarrantyProvider")
  }
  return context
}
