import { EllipsisVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InventoryStatusBadge } from "./StatusBadges"

import type { InventoryItem } from "@/components/StockAdjustmentDialog"

interface InventoryTableProps {
  items: InventoryItem[]
  firstColumnLabel: string
}

export function InventoryTable({
  items,
  firstColumnLabel,
}: InventoryTableProps) {
  return (
    <Table className="min-w-245">
      <TableHeader>
        <TableRow className="border-slate-200 hover:bg-transparent">
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            {firstColumnLabel}
            <br />
            Name
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Category
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Current
            <br />
            Stock
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Min
            <br />
            Threshold
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Unit
            <br />
            Type
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Supplier
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Status
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name} className="border-slate-100">
            <TableCell className="px-6 py-4 text-[13px] font-medium whitespace-normal text-slate-700">
              {item.name}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] whitespace-normal text-slate-500">
              {item.category}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-700">
              {item.currentStock}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              {item.minThreshold}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              {item.unitType}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] whitespace-normal text-slate-500">
              {item.supplier}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px]">
              <InventoryStatusBadge status={item.status} />
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Open actions for ${item.name}`}
              >
                <EllipsisVertical className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
