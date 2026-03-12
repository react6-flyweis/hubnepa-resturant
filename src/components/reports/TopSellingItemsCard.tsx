import { Link } from "react-router"
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
import type { TopSellingItem } from "@/types/reports"

interface Props {
  items: TopSellingItem[]
}

export function TopSellingItemsCard({ items }: Props) {
  return (
    <Card className="py-0">
      <CardHeader className="px-5 py-5">
        <CardTitle className="text-base font-semibold text-slate-900">
          Top Selling Items
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ITEM NAME</TableHead>
              <TableHead className="text-right">ORDERS</TableHead>
              <TableHead className="text-right">REVENUE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium text-slate-700">
                  {item.name}
                </TableCell>
                <TableCell className="text-right text-slate-700">
                  {item.orders}
                </TableCell>
                <TableCell className="text-right text-slate-700">
                  {formatCurrency(item.revenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <Link
            to="/reports/top-items"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View All Items →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
