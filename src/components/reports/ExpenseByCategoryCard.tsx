import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/report-utils"
import type { ExpenseCategory } from "@/types/reports"

interface Props {
  data: ExpenseCategory[]
}

export function ExpenseByCategoryCard({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.total, 0)
  return (
    <Card className="py-0">
      <CardHeader className="px-5 py-5">
        <CardTitle className="text-base font-semibold text-slate-900">
          Expense by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>CATEGORY</TableHead>
              <TableHead className="text-right">TOTAL EXPENSE</TableHead>
              <TableHead className="text-right">% OF TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.category}>
                <TableCell className="font-medium text-slate-700">
                  {row.category}
                </TableCell>
                <TableCell className="text-right text-slate-700">
                  {formatCurrency(row.total)}
                </TableCell>
                <TableCell className="text-right text-slate-700">
                  {row.percentage.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(total)}
              </TableCell>
              <TableCell className="text-right font-semibold">100.0%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
