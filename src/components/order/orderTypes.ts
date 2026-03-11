export type OrderStatus = "new" | "cooking" | "ready"
export type FulfillmentType = "Delivery" | "Pickup" | "Dine-in"

export interface OrderItem {
  id: string
  age: string
  fulfillmentType: FulfillmentType
  customerName: string
  items: string[]
  amount: string
  actionLabel: string
}

export interface OrderColumn {
  key: OrderStatus
  title: string
  orders: OrderItem[]
}

export type OrderColumnsState = Record<OrderStatus, OrderItem[]>
