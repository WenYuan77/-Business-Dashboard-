import type { WarrantyData } from "@/contexts/warranty-context"

// 将对象数组转换为CSV字符串
export function convertToCSV(objArray: any[], headers: string[], fields: string[]): string {
  // 添加表头
  let csv = headers.join(",") + "\n"

  // 添加数据行
  objArray.forEach((item) => {
    const row = fields.map((field) => {
      // 处理字段值，确保CSV格式正确
      const value = item[field] !== undefined && item[field] !== null ? item[field].toString() : ""
      // 如果值包含逗号、双引号或换行符，需要用双引号包裹并处理内部的双引号
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    })
    csv += row.join(",") + "\n"
  })

  return csv
}

// 导出CSV文件
export function exportCSV(csv: string, filename: string): void {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 导出延保数据
export function exportWarrantyData(warranties: WarrantyData[]): void {
  // 定义要导出的字段和表头
  const headers = [
    "保单号",
    "车主/公司",
    "联系电话",
    "经办人",
    "门店",
    "门店编码",
    "支付备注",
    "订单状态",
    "创建时间",
    "车主类型",
    "证件号码",
    "车架号",
    "厂牌型号",
    "车牌号",
    "发动机号",
    "车身颜色",
    "初登日期",
  ]

  const fields = [
    "id",
    "company",
    "phone",
    "responsible",
    "store",
    "storeCode",
    "payment",
    "status",
    "createdAt",
    "vehicleType",
    "idNumber",
    "frameNumber",
    "vehicleModel",
    "licensePlate",
    "engineNumber",
    "vehicleColor",
    "purchaseDate",
  ]

  // 转换为CSV
  const csv = convertToCSV(warranties, headers, fields)

  // 生成文件名（包含当前日期时间）
  const now = new Date()
  const dateStr = now.toISOString().replace(/[:.]/g, "-").slice(0, 19)
  const filename = `延保数据_${dateStr}.csv`

  // 导出CSV
  exportCSV(csv, filename)
}
