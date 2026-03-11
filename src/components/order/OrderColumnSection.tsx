import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"

import type { OrderColumn, OrderItem } from "./orderTypes"
import { statusColorMap } from "./orderConstants"
import { OrderCard } from "./OrderCard"

interface OrderColumnSectionProps {
  column: OrderColumn
  orders: OrderItem[]
}

export function OrderColumnSection({
  column,
  orders,
}: OrderColumnSectionProps) {
  const statusStyles = statusColorMap[column.key]
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
  })

  return (
    <div className={cn("rounded-xl border p-3", statusStyles.column)}>
      <div
        className={cn(
          "mb-3 flex items-center gap-2 font-medium",
          statusStyles.heading
        )}
      >
        <span className={cn("size-2 rounded-full", statusStyles.statusDot)} />
        <span>
          {column.title} ({orders.length})
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "min-h-16 space-y-3 rounded-lg border border-dashed border-transparent p-1 transition-colors",
          isOver && "border-slate-300 bg-white/70"
        )}
      >
        <SortableContext
          items={orders.map((order) => order.id)}
          strategy={verticalListSortingStrategy}
        >
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} status={column.key} />
          ))}
        </SortableContext>

        {orders.length === 0 ? (
          <p className="rounded-md border border-dashed border-slate-300 bg-white/60 px-3 py-4 text-center text-xs text-slate-500">
            Drop orders here
          </p>
        ) : null}
      </div>
    </div>
  )
}
