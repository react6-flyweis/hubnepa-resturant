import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"

export type OrderRow = {
  orderId: string
  customer: string
  customerAgo: string
  items: string
  amount: string
  status: string
}

interface RecentOrdersSectionProps {
  rows: OrderRow[]
  statusClasses?: Record<string, string>
}

export function RecentOrdersSection({
  rows,
  statusClasses = {},
}: RecentOrdersSectionProps) {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
        <CardTitle className="text-xl font-medium">Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" asChild className="h-7 text-primary">
          <Link to="/dashboard">View All</Link>
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto px-4 pb-4">
        <table className="w-full min-w-140 border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pr-2 pb-1 font-medium">ORDER ID</th>
              <th className="pr-2 pb-1 font-medium">CUSTOMER</th>
              <th className="pr-2 pb-1 font-medium">ITEMS</th>
              <th className="pr-2 pb-1 font-medium">AMOUNT</th>
              <th className="pb-1 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr key={order.orderId} className="align-top">
                <td className="py-1 pr-2 font-medium">{order.orderId}</td>
                <td className="py-1 pr-2">
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.customerAgo}
                  </div>
                </td>
                <td className="py-1 pr-2 text-muted-foreground">
                  {order.items}
                </td>
                <td className="py-1 pr-2 font-semibold">{order.amount}</td>
                <td className="py-1">
                  <Badge
                    variant="secondary"
                    className={statusClasses[order.status]}
                  >
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
