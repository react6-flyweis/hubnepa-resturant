import type { OrderStatus, FulfillmentType, OrderColumn } from "./orderTypes"

export const orderStatuses: OrderStatus[] = ["new", "cooking", "ready"]

export const actionLabelMap: Record<OrderStatus, string> = {
  new: "Accept Order",
  cooking: "Mark Ready",
  ready: "Complete",
}

export const statusColorMap = {
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

export const fulfillmentColorMap: Record<FulfillmentType, string> = {
  Delivery: "text-slate-500",
  Pickup: "text-slate-500",
  "Dine-in": "text-slate-500",
}

export const orderColumns: OrderColumn[] = [
  {
    key: "new",
    title: "New Orders",
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
