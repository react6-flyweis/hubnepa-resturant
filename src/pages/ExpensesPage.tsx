import { useState } from "react"
import {
  Download,
  EllipsisVertical,
  Plus,
  Search,
  TrendingDown,
  type LucideIcon,
  Users,
  Wrench,
} from "lucide-react"

import { AddExpenseDialog } from "@/components/AddExpenseDialog"
import type { NewExpense } from "@/components/AddExpenseDialog"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ViewInvoiceDialog } from "@/components/ViewInvoiceDialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type ExpenseView = "all" | "payroll" | "maintenance"
export type ExpenseRecordType = Exclude<ExpenseView, "all">
export type ExpenseStatus = "Paid" | "Pending" | "Scheduled"
export type ExpenseStatKey = "total" | "payroll" | "maintenance"

interface ExpenseViewOption {
  key: ExpenseView
  label: string
}

export interface ExpenseRecord {
  id: string
  type: ExpenseRecordType
  name: string
  subtitle: string
  detail: string
  month: string
  amount: number
  status: ExpenseStatus
  actionLabel: string
}

interface ExpenseStat {
  key: ExpenseStatKey
  title: string
  value: string
  badgeLabel: string
}

interface TableCopy {
  title: string
  firstColumn: string
  secondColumn: string
  actionButtonLabel: string
}

const expenseViewOptions: ExpenseViewOption[] = [
  { key: "all", label: "All Transactions" },
  { key: "payroll", label: "Salaries & Payroll" },
  { key: "maintenance", label: "Maintenance Logs" },
]

// initial static data; will be used to initialize state so new records can be added
const initialExpenseRecords: ExpenseRecord[] = [
  {
    id: "pay-001",
    type: "payroll",
    name: "John Doe",
    subtitle: "Kitchen Team",
    detail: "Head Chef",
    month: "January 2026",
    amount: 3200,
    status: "Paid",
    actionLabel: "Payslip",
  },
  {
    id: "pay-002",
    type: "payroll",
    name: "Sarah Smith",
    subtitle: "Operations",
    detail: "Restaurant Manager",
    month: "January 2026",
    amount: 2800,
    status: "Paid",
    actionLabel: "Payslip",
  },
  {
    id: "pay-003",
    type: "payroll",
    name: "Mike Johnson",
    subtitle: "Kitchen Team",
    detail: "Sous Chef",
    month: "January 2026",
    amount: 2100,
    status: "Pending",
    actionLabel: "Payslip",
  },
  {
    id: "pay-004",
    type: "payroll",
    name: "Emily Chen",
    subtitle: "Service Team",
    detail: "Waitstaff",
    month: "January 2026",
    amount: 1500,
    status: "Paid",
    actionLabel: "Payslip",
  },
  {
    id: "mnt-001",
    type: "maintenance",
    name: "Everest Cooling",
    subtitle: "Equipment vendor",
    detail: "HVAC Service",
    month: "January 2026",
    amount: 620.5,
    status: "Paid",
    actionLabel: "Invoice",
  },
  {
    id: "mnt-002",
    type: "maintenance",
    name: "KitchenCare Pro",
    subtitle: "Facility partner",
    detail: "Oven Repair",
    month: "January 2026",
    amount: 570.5,
    status: "Pending",
    actionLabel: "Invoice",
  },
  {
    id: "mnt-003",
    type: "maintenance",
    name: "Bright Supplies",
    subtitle: "Operations vendor",
    detail: "Cleaning Materials",
    month: "January 2026",
    amount: 425,
    status: "Scheduled",
    actionLabel: "Invoice",
  },
  {
    id: "mnt-004",
    type: "maintenance",
    name: "Metro Electrical",
    subtitle: "Service partner",
    detail: "Lighting Maintenance",
    month: "January 2026",
    amount: 318.5,
    status: "Paid",
    actionLabel: "Invoice",
  },
]

const tableCopyMap: Record<ExpenseView, TableCopy> = {
  all: {
    title: "All Transactions",
    firstColumn: "Entry",
    secondColumn: "Category",
    actionButtonLabel: "Expense Summary",
  },
  payroll: {
    title: "Payroll Management",
    firstColumn: "Employee",
    secondColumn: "Role",
    actionButtonLabel: "Payroll Summary",
  },
  maintenance: {
    title: "Maintenance Logs",
    firstColumn: "Vendor",
    secondColumn: "Service",
    actionButtonLabel: "Maintenance Report",
  },
}

const statMetaMap: Record<
  ExpenseStatKey,
  {
    icon: LucideIcon
    iconClassName: string
    wrapperClassName: string
    badgeClassName: string
  }
> = {
  total: {
    icon: TrendingDown,
    iconClassName: "text-red-500",
    wrapperClassName: "bg-red-50",
    badgeClassName: "bg-red-50 text-red-500",
  },
  payroll: {
    icon: Users,
    iconClassName: "text-blue-600",
    wrapperClassName: "bg-blue-50",
    badgeClassName: "bg-blue-50 text-blue-600",
  },
  maintenance: {
    icon: Wrench,
    iconClassName: "text-orange-500",
    wrapperClassName: "bg-orange-50",
    badgeClassName: "bg-orange-50 text-orange-500",
  },
}

const statusColorMap: Record<ExpenseStatus, string> = {
  Paid: "border-transparent bg-emerald-50 text-emerald-700",
  Pending: "border-transparent bg-amber-50 text-amber-700",
  Scheduled: "border-transparent bg-slate-100 text-slate-600",
}

const avatarColorMap: Record<ExpenseRecordType, string> = {
  payroll: "bg-slate-100 text-slate-700",
  maintenance: "bg-orange-50 text-orange-600",
}

export default function ExpensesPage() {
  const [activeView, setActiveView] = useState<ExpenseView>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<ExpenseRecord | null>(
    null
  )
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // stateful records so new expenses can be added
  const [records, setRecords] = useState<ExpenseRecord[]>(initialExpenseRecords)

  const payrollTotal = records
    .filter((record) => record.type === "payroll")
    .reduce((sum, record) => sum + record.amount, 0)
  const maintenanceTotal = records
    .filter((record) => record.type === "maintenance")
    .reduce((sum, record) => sum + record.amount, 0)

  const stats: ExpenseStat[] = [
    {
      key: "total",
      title: "Total Expenses (Jan)",
      value: formatCurrency(payrollTotal + maintenanceTotal),
      badgeLabel: "+4.5%",
    },
    {
      key: "payroll",
      title: "Staff Payroll",
      value: formatCurrency(payrollTotal),
      badgeLabel: "Fixed Cost",
    },
    {
      key: "maintenance",
      title: "Maintenance & Misc",
      value: formatCurrency(maintenanceTotal),
      badgeLabel: "Variable",
    },
  ]

  const visibleRecords = records.filter((record) => {
    const matchesView = activeView === "all" || record.type === activeView
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [record.name, record.subtitle, record.detail, record.month, record.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)

    return matchesView && matchesQuery
  })

  const activeTableCopy = tableCopyMap[activeView]

  function handleAddExpense(values: NewExpense) {
    const formattedMonth = new Date(values.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })

    const newRecord: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      type: values.type,
      name: values.title,
      subtitle: values.category,
      detail: values.notes ?? "",
      month: formattedMonth,
      amount: values.amount,
      status: values.status,
      actionLabel: values.type === "payroll" ? "Payslip" : "Invoice",
    }

    setRecords((prev) => [...prev, newRecord])
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-900">
            Expenses & Finance
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your spending, salaries, and operational costs.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="h-10 rounded-lg border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-50"
          >
            <Download className="size-4" />
            Export Report
          </Button>
          <Button
            size="lg"
            className="h-10 rounded-lg bg-[#059669] px-4 text-white hover:bg-[#047857]"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <ExpenseStatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          {expenseViewOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeView === option.key
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
              onClick={() => setActiveView(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Filter records..."
            className="h-10 rounded-xl border-slate-200 bg-white pl-9 text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-slate-900">
          {activeTableCopy.title}
        </h2>

        <Button
          variant="outline"
          size="lg"
          className="h-10 rounded-lg border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-50"
        >
          <Download className="size-4" />
          {activeTableCopy.actionButtonLabel}
        </Button>
      </div>

      <Card className="mt-4 rounded-2xl border-0 bg-white py-0 shadow-[0_0_0_1px_#E5E7EB]">
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50/70 hover:bg-slate-50/70">
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  {activeTableCopy.firstColumn}
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  {activeTableCopy.secondColumn}
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Month
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Amount
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRecords.map((record) => (
                <TableRow key={record.id} className="border-slate-100">
                  <TableCell className="px-6 py-4 align-top whitespace-normal">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10" size="lg">
                        <AvatarFallback
                          className={cn(
                            "text-sm font-semibold",
                            avatarColorMap[record.type]
                          )}
                        >
                          {getInitials(record.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-base font-semibold text-slate-900">
                          {record.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {record.subtitle}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-[15px] whitespace-normal text-slate-600">
                    {record.detail}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-[15px] whitespace-normal text-slate-600">
                    {record.month}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-lg font-semibold text-slate-900">
                    {formatCurrency(record.amount)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <ExpenseStatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-emerald-600">
                        {record.actionLabel}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="size-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                            aria-label={`Open actions for ${record.name}`}
                          >
                            <EllipsisVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRecord(record)
                              setInvoiceDialogOpen(true)
                            }}
                          >
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("download", record.id)}
                          >
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {visibleRecords.length === 0 ? (
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No expense records match the current filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* add new expense dialog */}
      <AddExpenseDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={handleAddExpense}
      />

      {/* invoice dialog */}
      <ViewInvoiceDialog
        open={invoiceDialogOpen}
        onClose={() => setInvoiceDialogOpen(false)}
        record={selectedRecord}
      />
    </div>
  )
}

function ExpenseStatCard({ stat }: { stat: ExpenseStat }) {
  const meta = statMetaMap[stat.key]
  const Icon = meta.icon

  return (
    <Card className="rounded-2xl border-0 bg-white py-6 shadow-[0_0_0_1px_#E5E7EB]">
      <CardContent className="flex items-start justify-between gap-4 px-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              meta.wrapperClassName
            )}
          >
            <Icon className={cn("size-5", meta.iconClassName)} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <p className="mt-4 font-display text-[2rem] leading-none font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        </div>

        <Badge
          className={cn(
            "rounded-full px-2.5 py-1 font-medium",
            meta.badgeClassName
          )}
        >
          {stat.badgeLabel}
        </Badge>
      </CardContent>
    </Card>
  )
}

function ExpenseStatusBadge({ status }: { status: ExpenseStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium",
        statusColorMap[status]
      )}
    >
      {status}
    </Badge>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
