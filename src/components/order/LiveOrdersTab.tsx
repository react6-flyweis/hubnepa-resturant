import { useMemo, useState } from "react"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import type { OrderColumnsState, OrderItem } from "./orderTypes"
import {
  isOrderStatus,
  findContainerByOrderId,
  findOrderById,
} from "./orderUtils"
import { orderColumns, orderStatuses, actionLabelMap } from "./orderConstants"
import { OrderColumnSection } from "./OrderColumnSection"
import { OrderCard } from "./OrderCard"

interface LiveOrdersTabProps {
  columns: OrderColumnsState
  setColumns: React.Dispatch<React.SetStateAction<OrderColumnsState>>
}

export function LiveOrdersTab({ columns, setColumns }: LiveOrdersTabProps) {
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const activeOrder = useMemo(() => {
    if (!activeOrderId) {
      return null
    }

    return findOrderById(columns, activeOrderId)
  }, [activeOrderId, columns])

  function handleDragStart(event: DragStartEvent) {
    setActiveOrderId(String(event.active.id))
  }

  function handleDragOver(event: DragOverEvent) {
    if (!event.over) {
      return
    }

    const activeId = String(event.active.id)
    const overId = String(event.over.id)

    setColumns((previousColumns) => {
      const activeContainer = findContainerByOrderId(previousColumns, activeId)
      const overContainer = isOrderStatus(overId)
        ? overId
        : findContainerByOrderId(previousColumns, overId)

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return previousColumns
      }

      const activeItems = previousColumns[activeContainer]
      const overItems = previousColumns[overContainer]
      const activeIndex = activeItems.findIndex(
        (order) => order.id === activeId
      )

      if (activeIndex < 0) {
        return previousColumns
      }

      const movingOrder = activeItems[activeIndex]
      const updatedOrder: OrderItem = {
        ...movingOrder,
        actionLabel: actionLabelMap[overContainer],
      }

      const overIndex = isOrderStatus(overId)
        ? overItems.length
        : overItems.findIndex((order) => order.id === overId)
      const insertAt = overIndex >= 0 ? overIndex : overItems.length

      const nextActiveItems = activeItems.filter(
        (order) => order.id !== activeId
      )
      const nextOverItems = [...overItems]
      nextOverItems.splice(insertAt, 0, updatedOrder)

      return {
        ...previousColumns,
        [activeContainer]: nextActiveItems,
        [overContainer]: nextOverItems,
      }
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveOrderId(null)

    if (!event.over) {
      return
    }

    const activeId = String(event.active.id)
    const overId = String(event.over.id)

    setColumns((previousColumns) => {
      const activeContainer = findContainerByOrderId(previousColumns, activeId)
      const overContainer = isOrderStatus(overId)
        ? overId
        : findContainerByOrderId(previousColumns, overId)

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer !== overContainer
      ) {
        return previousColumns
      }

      const items = previousColumns[activeContainer]
      const activeIndex = items.findIndex((order) => order.id === activeId)
      const overIndex = isOrderStatus(overId)
        ? items.length - 1
        : items.findIndex((order) => order.id === overId)

      if (
        activeIndex < 0 ||
        overIndex < 0 ||
        activeIndex === overIndex ||
        overIndex >= items.length
      ) {
        return previousColumns
      }

      return {
        ...previousColumns,
        [activeContainer]: arrayMove(items, activeIndex, overIndex),
      }
    })
  }

  function handleDragCancel() {
    setActiveOrderId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {orderColumns.map((column) => (
          <OrderColumnSection
            key={column.key}
            column={column}
            orders={columns[column.key]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeOrderId && activeOrder ? (
          <OrderCard
            order={activeOrder}
            status={
              findContainerByOrderId(columns, activeOrderId) ?? orderStatuses[0]
            }
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
