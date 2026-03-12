import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { formatCurrency, formatPercentageDelta } from "@/lib/report-utils"

interface Props {
  amount: number
  change: number
}

export function ExpenseHighlightCard({ amount, change }: Props) {
  return (
    <Card className="mt-4 border border-red-300 bg-linear-to-r from-red-50/70 via-white to-white py-0 shadow-red-100/40">
      <CardContent className="px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Wallet className="size-4" />
          </span>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Monthly Expense
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {formatCurrency(amount)}
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-600">
              {formatPercentageDelta(change)} vs last period
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
