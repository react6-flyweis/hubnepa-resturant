import { EllipsisVertical } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type { ExpenseRecord, ExpenseStatus } from "@/types/expenses"

interface AllTransactionsTabProps {
  records: ExpenseRecord[]
  searchQuery?: string
  onViewInvoice: (record: ExpenseRecord) => void
}

const statusColorMap: Record<ExpenseStatus, string> = {
  Paid: "border-transparent bg-emerald-50 text-emerald-700",
  Pending: "border-transparent bg-amber-50 text-amber-700",
  Scheduled: "border-transparent bg-slate-100 text-slate-600",
  "Due Soon": "border-transparent bg-red-50 text-red-700",
}

export function AllTransactionsTab({
  records,
  searchQuery = "",
  onViewInvoice,
}: AllTransactionsTabProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const visibleRecords = records.filter((record) => {
    return (
      normalizedQuery.length === 0 ||
      [
        record.name,
        record.subtitle,
        record.detail,
        record.month,
        record.status,
        record.date,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    )
  })

  return (
    <>
      <Card className="p-0">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50/70 hover:bg-slate-50/70">
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Expense Title
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Category
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                  Date
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
                    <p className="text-base font-semibold text-slate-900">
                      {record.name}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-1 text-sm"
                    >
                      {record.subtitle}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-[15px] whitespace-normal text-slate-600">
                    {record.date
                      ? new Date(record.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : record.month}
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
                            onClick={() => onViewInvoice(record)}
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
    </>
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
