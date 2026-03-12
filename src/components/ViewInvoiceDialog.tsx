"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ExpenseStatus, ExpenseRecord } from "@/types/expenses"

import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ViewInvoiceDialogProps {
  open: boolean
  onClose: () => void
  record?: ExpenseRecord | null
}

const statusColorMap: Record<ExpenseStatus, string> = {
  Paid: "border-emerald-200 bg-emerald-100 text-emerald-700 shadow-[0_4px_14px_rgba(16,185,129,0.18)]",
  Pending:
    "border-amber-200 bg-amber-100 text-amber-700 shadow-[0_4px_14px_rgba(245,158,11,0.16)]",
  Scheduled:
    "border-slate-200 bg-slate-100 text-slate-600 shadow-[0_4px_14px_rgba(100,116,139,0.12)]",
}

const restaurantDetails = {
  name: "HUBNEPA Restaurant",
  email: "contact@hubnepa.com",
  address: ["123 Culinary Ave", "Food City, FC 12345"],
}

export function ViewInvoiceDialog({
  open,
  onClose,
  record,
}: ViewInvoiceDialogProps) {
  if (!record) {
    return null
  }

  const { name, detail, month, amount, status } = record as ExpenseRecord
  const invoiceNumber = formatInvoiceNumber(record)
  const invoiceDate = formatInvoiceDate(month)
  const payToEmail = formatEmailAddress(name)
  const lineItemSubtitle = getLineItemSubtitle(record)
  const summaryRows = [
    { label: "Subtotal", value: formatCurrency(amount), accent: false },
    { label: "Tax (0%)", value: formatCurrency(0), accent: false },
    { label: "Total", value: formatCurrency(amount), accent: true },
  ]

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <h2
                id="invoice-dialog-title"
                className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl"
              >
                INVOICE
              </h2>
              <p className="mt-2 text-sm tracking-wide text-slate-500 uppercase">
                #{invoiceNumber}
              </p>
            </div>

            <div className="space-y-1 text-left sm:text-right">
              <p className="font-display text-lg font-semibold text-slate-900">
                {restaurantDetails.name}
              </p>
              {restaurantDetails.address.map((line) => (
                <p key={line} className="text-sm text-slate-500">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {[
              {
                label: "BILL TO",
                title: restaurantDetails.name,
                subtitle: restaurantDetails.email,
              },
              {
                label: "PAY TO (VENDOR)",
                title: name,
                subtitle: payToEmail,
              },
            ].map((party) => (
              <div key={party.label} className="space-y-3">
                <p className="text-sm font-semibold tracking-[0.08em] text-slate-400 uppercase">
                  {party.label}
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {party.title}
                </p>
                <p className="text-sm text-slate-500">{party.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 sm:p-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Invoice Date</p>
              <p className="text-lg font-semibold text-slate-900">
                {invoiceDate}
              </p>
            </div>

            <div className="space-y-2 sm:justify-self-start">
              <p className="text-sm text-slate-500">Status</p>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium",
                  statusColorMap[status]
                )}
              >
                {status}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-slate-200 pb-4 text-sm text-slate-500">
              <p>Description</p>
              <p className="text-right">Amount</p>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-slate-900">{detail}</p>
                <p className="text-sm text-slate-500">{lineItemSubtitle}</p>
              </div>
              <p className="text-right font-mono text-lg font-semibold text-slate-900">
                {formatCurrency(amount)}
              </p>
            </div>

            <div className="ml-auto w-full max-w-sm space-y-4">
              {summaryRows.map((row) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex items-center justify-between gap-4 text-sm",
                    row.accent &&
                      "border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900"
                  )}
                >
                  <p className={cn(!row.accent && "text-slate-500")}>
                    {row.label}
                  </p>
                  <p
                    className={cn(
                      "font-mono",
                      row.accent ? "text-primary" : "text-slate-900"
                    )}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function formatInvoiceNumber(record: ExpenseRecord) {
  const yearMatch = record.month.match(/\b(\d{4})\b/)
  const year = yearMatch?.[1] ?? new Date().getFullYear().toString()
  const sequence = record.id.match(/(\d+)/)?.[1].padStart(4, "0") ?? "0001"

  return `INV-${year}-${sequence}`
}

function formatInvoiceDate(month: string) {
  const parsedDate = new Date(`${month} 1`)

  if (Number.isNaN(parsedDate.getTime())) {
    return month
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsedDate)
}

function formatEmailAddress(name: string) {
  const domain = name.toLowerCase().replace(/[^a-z0-9]/g, "") || "vendor"

  return `accounts@${domain}.com`
}

function getLineItemSubtitle(record: ExpenseRecord) {
  return record.type === "maintenance"
    ? `Fixed Expense - ${record.subtitle}`
    : `Payroll - ${record.subtitle}`
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}
