import { useState } from "react"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export type HistoryOrder = {
  id: string
  date: string
  time: string
  customer: string
  fulfillmentType: string
  items: string
  total: string
  status: string
}

const sampleOrders: HistoryOrder[] = [
  {
    id: "#ORD-8821",
    date: "Today",
    time: "10:30 AM",
    customer: "John Doe",
    fulfillmentType: "Delivery",
    items: "2x Chicken Burger, 1x Coke",
    total: "$24.50",
    status: "Completed",
  },
  {
    id: "#ORD-8820",
    date: "Yesterday",
    time: "8:15 PM",
    customer: "Alice Johnson",
    fulfillmentType: "Dine-in",
    items: "1x Caesar Salad, 1x Water",
    total: "$14.00",
    status: "Completed",
  },
  {
    id: "#ORD-8819",
    date: "Yesterday",
    time: "7:45 PM",
    customer: "Robert Smith",
    fulfillmentType: "Dine-in",
    items: "2x Steak, 1x Red Wine",
    total: "$85.00",
    status: "Completed",
  },
  {
    id: "#ORD-8818",
    date: "Yesterday",
    time: "6:30 PM",
    customer: "Emily Davis",
    fulfillmentType: "Pickup",
    items: "1x Veggie Pizza",
    total: "$16.00",
    status: "Cancelled",
  },
  {
    id: "#ORD-8817",
    date: "Yesterday",
    time: "1:00 PM",
    customer: "Michael Wilson",
    fulfillmentType: "Delivery",
    items: "3x Tacos, 2x Soda",
    total: "$22.50",
    status: "Completed",
  },
  {
    id: "#ORD-8816",
    date: "Feb 10",
    time: "12:30 PM",
    customer: "Sarah Brown",
    fulfillmentType: "Dine-in",
    items: "1x Pasta Alfredo",
    total: "$18.50",
    status: "Completed",
  },
  {
    id: "#ORD-8815",
    date: "Feb 10",
    time: "11:45 AM",
    customer: "David Miller",
    fulfillmentType: "Delivery",
    items: "1x Burger Meal",
    total: "$15.00",
    status: "Refunded",
  },
  {
    id: "#ORD-8814",
    date: "Feb 09",
    time: "8:15 PM",
    customer: "Jennifer Wu",
    fulfillmentType: "Delivery",
    items: "1x Sushi Platter, 2x Miso Soup",
    total: "$42.00",
    status: "Completed",
  },
  {
    id: "#ORD-8813",
    date: "Feb 09",
    time: "7:30 PM",
    customer: "Tom Harris",
    fulfillmentType: "Pickup",
    items: "1x Pepperoni Pizza, 1x Coke",
    total: "$21.00",
    status: "Completed",
  },
  {
    id: "#ORD-8812",
    date: "Feb 09",
    time: "1:15 PM",
    customer: "Emma Wilson",
    fulfillmentType: "Delivery",
    items: "2x Vegan Wrap, 1x Smoothie",
    total: "$28.50",
    status: "Completed",
  },
]

const statusClassMap: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Refunded: "bg-orange-100 text-orange-700",
}

export function OrderHistoryTab() {
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [dateFilter, setDateFilter] = useState("Date Range")

  // simple pagination state (page 1 always)
  const itemsPerPage = 7
  const [page, setPage] = useState(1)
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const filtered = sampleOrders.filter((o) => {
    if (
      searchText &&
      !o.id.includes(searchText) &&
      !o.customer.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false
    }
    if (statusFilter !== "All Status" && o.status !== statusFilter) {
      return false
    }
    // date filter not implemented
    return true
  })
  const pageOrders = filtered.slice(start, end)

  return (
    <Card className="mt-6 border border-slate-200 bg-white">
      <CardContent className="space-y-4">
        {/* filters row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <InputGroup className="max-w-xs">
            <InputGroupAddon className="pr-2">
              <Search className="h-4 w-4 text-slate-400" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by Order ID or Customer..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-8"
            />
          </InputGroup>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>Refunded</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              <option>Date Range</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="py-2 pr-4 text-left font-medium">ORDER ID</th>
                <th className="py-2 pr-4 text-left font-medium">
                  DATE &amp; TIME
                </th>
                <th className="py-2 pr-4 text-left font-medium">CUSTOMER</th>
                <th className="py-2 pr-4 text-left font-medium">TYPE</th>
                <th className="py-2 pr-4 text-left font-medium">ITEMS</th>
                <th className="py-2 pr-4 text-left font-medium">TOTAL</th>
                <th className="py-2 pr-4 text-left font-medium">STATUS</th>
                <th className="py-2 text-left font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-2 pr-4 font-medium text-slate-700">
                    {o.id}
                  </td>
                  <td className="py-2 pr-4 text-slate-500">
                    <div>{o.date}</div>
                    <div className="text-xs">{o.time}</div>
                  </td>
                  <td className="flex items-center gap-2 py-2 pr-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-700">
                      {o.customer.charAt(0)}
                    </div>
                    <span>{o.customer}</span>
                  </td>
                  <td className="py-2 pr-4 text-slate-500">
                    {o.fulfillmentType}
                  </td>
                  <td className="max-w-xs truncate py-2 pr-4 text-slate-500">
                    {o.items}
                  </td>
                  <td className="py-2 pr-4 font-semibold text-slate-700">
                    {o.total}
                  </td>
                  <td className="py-2 pr-4">
                    <Badge
                      variant="secondary"
                      className={cn(statusClassMap[o.status] ?? "")}
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="cursor-pointer py-2 text-blue-600 hover:underline">
                    View Receipt
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div>
            Showing {start + 1}-{Math.min(end, filtered.length)} of{" "}
            {filtered.length} orders
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={end >= filtered.length}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
