// 定义日报数据接口
export interface DailyReportData {
  id: string
  name: string
  store: string
  date: string
  status: string
  createdAt: string
  updatedAt: string

  // 上午工作
  morningWork?: string
  morningResult?: string
  morningIssue?: string
  morningSolution?: string
  morningRemark1?: string
  morningRemark2?: string

  // 下午工作
  daySummary?: string
  policyCount?: string
  policyAmount?: string
  customerCount?: string
  callbackCount?: string
  newCustomerCount?: string
  conversionRate?: string
  tomorrowPlan?: string

  // 本周工作
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string

  // 本月工作
  monthSummary?: string
  nextMonthPlan?: string
}
