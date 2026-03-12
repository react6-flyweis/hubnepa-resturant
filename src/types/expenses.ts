export type ExpenseView = "all" | "payroll" | "maintenance"
export type ExpenseRecordType = Exclude<ExpenseView, "all">
export type ExpenseStatus = "Paid" | "Pending" | "Scheduled" | "Due Soon"
export type ExpenseStatKey = "total" | "payroll" | "maintenance"

export interface ExpenseRecord {
  id: string
  type: ExpenseRecordType
  name: string
  subtitle: string
  detail: string
  /** full ISO date used for display in tables */
  date?: string
  /** summarized month/year for stats and month view */
  month: string
  amount: number
  status: ExpenseStatus
  actionLabel: string
}
