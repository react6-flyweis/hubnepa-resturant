import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// reuse types from expenses page so we stay in sync
import type { ExpenseRecordType, ExpenseStatus } from "@/types/expenses"

// shape used by the dialog; callers can map this into whatever project model makes
// sense (e.g. ExpenseRecord used on the page)
export type NewExpense = {
  title: string
  amount: number
  category: string
  date: string
  status: ExpenseStatus
  type: ExpenseRecordType
  notes?: string
}

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0, "Must be a positive number"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Paid", "Pending", "Scheduled"]),
  type: z.enum(["payroll", "maintenance"]),
  notes: z.string().max(300).optional(),
})

type ExpenseValues = z.infer<typeof expenseSchema>

interface AddExpenseDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: ExpenseValues) => void
}

// some arbitrary sample categories, callers can replace with dynamic data if needed
const categories = [
  "Salaries & Wages",
  "Utilities",
  "Supplies",
  "Equipment",
  "Marketing",
  "Other",
]

export function AddExpenseDialog({
  open,
  onClose,
  onSubmit,
}: AddExpenseDialogProps) {
  const form = useForm<ExpenseValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      date: "",
      status: "Pending",
      type: "maintenance",
      notes: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: "",
        amount: 0,
        category: "",
        date: "",
        status: "Pending",
        type: "maintenance",
        notes: "",
      })
    }
  }, [open, form])

  function handleSubmit(values: ExpenseValues) {
    if (onSubmit) {
      onSubmit(values)
    }
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record New Expense</DialogTitle>
          <DialogDescription>
            Add details for a new spending entry.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div>
            <Label htmlFor="title">Expense Title</Label>
            <Input
              id="title"
              placeholder="Enter expense title"
              className="mt-1"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min={0}
                className="mt-1 pl-7"
                {...form.register("amount", { valueAsNumber: true })}
              />
            </div>
            {form.formState.errors.amount && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("category")}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {form.formState.errors.category && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              className="mt-1"
              {...form.register("date")}
            />
            {form.formState.errors.date && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("status")}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Due Soon">Due Soon</option>
            </select>
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("type")}
            >
              <option value="payroll">Payroll</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add additional details about this expense..."
              className="mt-1"
              {...form.register("notes")}
              maxLength={300}
            />
            <div className="mt-1 text-right text-xs text-slate-400">
              {(form.watch("notes") ?? "").length}/300
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              type="submit"
            >
              Record Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
