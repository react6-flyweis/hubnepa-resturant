import type { OrderStatus, OrderColumnsState, OrderItem } from "./orderTypes"
import { orderStatuses } from "./orderConstants"

export function isOrderStatus(value: string): value is OrderStatus {
  return orderStatuses.includes(value as OrderStatus)
}

export function createInitialColumnsState(): OrderColumnsState {
  return orderStatuses.reduce<OrderColumnsState>(
    (accumulator, status) => {
      accumulator[status] = []
      return accumulator
    },
    {
      new: [],
      cooking: [],
      ready: [],
    }
  )
}

export function findContainerByOrderId(
  columns: OrderColumnsState,
  orderId: string
): OrderStatus | null {
  for (const status of orderStatuses) {
    if (columns[status].some((order) => order.id === orderId)) {
      return status
    }
  }

  return null
}

export function findOrderById(
  columns: OrderColumnsState,
  orderId: string
): OrderItem | null {
  const status = findContainerByOrderId(columns, orderId)
  if (!status) {
    return null
  }

  return columns[status].find((order) => order.id === orderId) ?? null
}

export function buildDragTransformStyle(
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null
): string | undefined {
  if (!transform) {
    return undefined
  }

  return `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`
}
