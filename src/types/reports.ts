export type TimeRange = "7d" | "30d" | "month" | "quarter"
export type MetricKey = "revenue" | "orders" | "averageOrderValue" | "customers"
export type SalesMixKey = "starters" | "mains" | "drinks" | "desserts"
export type TrendTone = "positive" | "negative"

export interface ExpenseCategory {
  category: string
  total: number
  percentage: number
}

export interface ExpenseTitle {
  title: string
  category: string
  amount: number
  entries: number
}

export interface MetricCardData {
  key: MetricKey
  title: string
  value: string
  change: number
}

export interface RevenuePoint {
  label: string
  revenue: number
}

export interface SalesMixItem {
  key: SalesMixKey
  label: string
  share: number
}

export interface TopSellingItem {
  name: string
  orders: number
  revenue: number
}

export interface PeakHourPoint {
  label: string
  orders: number
}

export interface ReportSnapshot {
  metrics: MetricCardData[]
  totalMonthlyExpense: number
  expenseChange: number
  revenueTrend: RevenuePoint[]
  revenueTicks: number[]
  revenueDescription: string
  salesMix: SalesMixItem[]
  expenseByCategory: ExpenseCategory[]
  expenseByTitle: ExpenseTitle[]
  topSellingItems: TopSellingItem[]
  peakHours: PeakHourPoint[]
}
