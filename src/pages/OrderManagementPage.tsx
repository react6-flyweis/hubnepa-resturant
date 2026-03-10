import { useState } from "react"
import { Clock3, Filter, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type OrderStatus = "new" | "cooking" | "ready"
type FulfillmentType = "Delivery" | "Pickup" | "Dine-in"

interface OrderItem {
  id: string
  age: string
  fulfillmentType: FulfillmentType
  customerName: string
  items: string[]
  amount: string
  actionLabel: string
}

interface OrderColumn {
  key: OrderStatus
  title: string
  count: number
  orders: OrderItem[]
}

const statusColorMap = {
  new: {
    column: "border-[#dce5f4] bg-[#eef3fb]",
    heading: "text-[#1e4db7]",
    statusDot: "bg-[#3b82f6]",
    orderBorder: "border-[#c6d9f3]",
    orderItemDot: "text-[#3b82f6]",
    actionButton: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
  },
  cooking: {
    column: "border-[#f0dfcb] bg-[#f9f0e6]",
    heading: "text-[#b45309]",
    statusDot: "bg-[#f97316]",
    orderBorder: "border-[#f4ceb0]",
    orderItemDot: "text-[#f59e0b]",
    actionButton: "bg-[#f97316] text-white hover:bg-[#ea580c]",
  },
  ready: {
    column: "border-[#d2ece1] bg-[#ebf7f1]",
    heading: "text-[#047857]",
    statusDot: "bg-[#10b981]",
    orderBorder: "border-[#b9e4d3]",
    orderItemDot: "text-[#10b981]",
    actionButton: "bg-[#059669] text-white hover:bg-[#047857]",
  },
} as const

const fulfillmentColorMap: Record<FulfillmentType, string> = {
  Delivery: "text-slate-500",
  Pickup: "text-slate-500",
  "Dine-in": "text-slate-500",
}

const orderColumns: OrderColumn[] = [
  {
    key: "new",
    title: "New Orders",
    count: 2,
    orders: [
      {
        id: "#ORD-8825",
        age: "Just now",
        fulfillmentType: "Delivery",
        customerName: "Michael Brown",
        items: ["2x Beef Burger", "1x French Fries", "2x Coke"],
        amount: "$32.50",
        actionLabel: "Accept Order",
      },
      {
        id: "#ORD-8824",
        age: "5 min ago",
        fulfillmentType: "Pickup",
        customerName: "Sarah Connor",
        items: ["1x Margherita Pizza", "1x Garlic Bread"],
        amount: "$18.00",
        actionLabel: "Accept Order",
      },
    ],
  },
  {
    key: "cooking",
    title: "Cooking",
    count: 1,
    orders: [
      {
        id: "#ORD-8823",
        age: "15 min ago",
        fulfillmentType: "Dine-in",
        customerName: "James Wilson",
        items: ["3x Chicken Wings", "2x Beer"],
        amount: "$45.00",
        actionLabel: "Mark Ready",
      },
    ],
  },
  {
    key: "ready",
    title: "Ready for Pickup",
    count: 1,
    orders: [
      {
        id: "#ORD-8822",
        age: "25 min ago",
        fulfillmentType: "Delivery",
        customerName: "Emily Clark",
        items: ["1x Pasta Carbonara"],
        amount: "$16.50",
        actionLabel: "Complete",
      },
    ],
  },
]

export default function OrderManagementPage() {
  const [activeTab, setActiveTab] = useState<"live" | "history">("live")

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-900">
            Order Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage your restaurant orders in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-10 border-slate-200 bg-white text-slate-600"
          >
            <Filter className="size-4" />
            Filter
          </Button>
          <Button
            size="lg"
            className="h-10 rounded-md bg-[#059669] text-white hover:bg-[#047857]"
          >
            Accept All New
          </Button>
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-lg bg-slate-100 p-1">
        <button
          type="button"
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            activeTab === "live"
              ? "bg-white text-slate-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
          onClick={() => setActiveTab("live")}
        >
          Live Orders
        </button>
        <button
          type="button"
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            activeTab === "history"
              ? "bg-white text-slate-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
          onClick={() => setActiveTab("history")}
        >
          Order History
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {orderColumns.map((column) => {
          const statusStyles = statusColorMap[column.key]

          return (
            <div
              key={column.key}
              className={cn("rounded-xl border p-3", statusStyles.column)}
            >
              <div
                className={cn(
                  "mb-3 flex items-center gap-2 font-medium",
                  statusStyles.heading
                )}
              >
                <span
                  className={cn("size-2 rounded-full", statusStyles.statusDot)}
                />
                <span>
                  {column.title} ({column.count})
                </span>
              </div>

              <div className="space-y-3">
                {column.orders.map((order) => (
                  <Card
                    key={order.id}
                    className={cn(
                      "gap-0 rounded-xl border bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
                      statusStyles.orderBorder
                    )}
                  >
                    <CardContent className="p-3.5">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-slate-700">
                          {order.id}
                        </p>
                        <button
                          type="button"
                          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                          aria-label={`More actions for ${order.id}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs">
                        <Clock3 className="size-3.5 text-slate-500" />
                        <span className="text-slate-500">{order.age}</span>
                        <span className="text-slate-300">•</span>
                        <span
                          className={fulfillmentColorMap[order.fulfillmentType]}
                        >
                          {order.fulfillmentType}
                        </span>
                      </div>

                      <p className="mt-3 text-base font-medium text-slate-800">
                        {order.customerName}
                      </p>

                      <ul className="mt-3 space-y-1.5">
                        {order.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs text-slate-500"
                          >
                            <span
                              className={cn(
                                "text-lg leading-none",
                                statusStyles.orderItemDot
                              )}
                            >
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <p className="text-3xl font-semibold tracking-tight text-slate-900">
                          {order.amount}
                        </p>
                        <Button
                          size="lg"
                          className={cn(
                            "h-8 rounded-md px-4 text-sm",
                            statusStyles.actionButton
                          )}
                        >
                          {order.actionLabel}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
