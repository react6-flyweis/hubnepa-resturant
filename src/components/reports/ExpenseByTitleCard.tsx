import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/report-utils"
import type { ExpenseTitle } from "@/types/reports"

interface Props {
  data: ExpenseTitle[]
}

export function ExpenseByTitleCard({ data }: Props) {
  return (
    <Card className="py-0">
      <CardHeader className="px-5 py-5">
        <CardTitle className="text-base font-semibold text-slate-900">
          Expense by Title
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>EXPENSE TITLE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead className="text-right">ENTRIES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium text-slate-700">
                  {row.title}
                </TableCell>
                <TableCell className="text-slate-600">{row.category}</TableCell>
                <TableCell className="text-right text-slate-700">
                  {formatCurrency(row.amount)}
                </TableCell>
                <TableCell className="text-right text-slate-700">
                  {row.entries}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
