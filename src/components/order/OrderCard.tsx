import { useSortable } from "@dnd-kit/sortable"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import type { OrderItem, OrderStatus } from "./orderTypes"
import { statusColorMap, fulfillmentColorMap } from "./orderConstants"
import { buildDragTransformStyle } from "./orderUtils"

interface OrderCardProps {
  order: OrderItem
  status: OrderStatus
  isOverlay?: boolean
}

export function OrderCard({
  order,
  status,
  isOverlay = false,
}: OrderCardProps) {
  const statusStyles = statusColorMap[status]
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: order.id,
    disabled: isOverlay,
  })

  return (
    <Card
      ref={isOverlay ? undefined : setNodeRef}
      style={
        isOverlay
          ? undefined
          : {
              transform: buildDragTransformStyle(transform),
              transition,
              opacity: isDragging ? 0.5 : 1,
            }
      }
      className={cn(
        "gap-0 rounded-xl border bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
        statusStyles.orderBorder,
        !isOverlay && "cursor-grab active:cursor-grabbing"
      )}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
    >
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-slate-700">{order.id}</p>
          <button
            type="button"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
            aria-label={`More actions for ${order.id}`}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <span className="text-slate-500">{order.age}</span>
          <span className="text-slate-300">•</span>
          <span className={fulfillmentColorMap[order.fulfillmentType]}>
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
          <p className="text-xl font-semibold tracking-tight text-slate-900">
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
  )
}
