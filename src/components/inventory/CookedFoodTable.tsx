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
import { CookedStatusBadge } from "./StatusBadges"
import type { CookedFood } from "@/types/inventory"

interface CookedFoodTableProps {
  foods: CookedFood[]
}

export function CookedFoodTable({ foods }: CookedFoodTableProps) {
  return (
    <Table className="min-w-245">
      <TableHeader>
        <TableRow className="border-slate-200 hover:bg-transparent">
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Dish Name
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Prepared By
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Prepared Date & Time
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Expiry Time
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Remaining Time
          </TableHead>
          <TableHead className="h-auto px-6 py-4 text-xs font-medium whitespace-normal text-slate-500">
            Quantity
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
        {foods.map((item) => (
          <TableRow key={item.dishName} className="border-slate-100">
            <TableCell className="px-6 py-4 text-[13px] font-medium whitespace-normal text-slate-700">
              {item.dishName}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] whitespace-normal text-slate-500">
              {item.preparedBy}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-700">
              {item.preparedDate}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              {item.expiryDate}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              {item.remainingTime}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              {item.quantity}
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px]">
              <CookedStatusBadge status={item.status} />
            </TableCell>
            <TableCell className="px-6 py-4 text-[13px] text-slate-500">
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Open actions for ${item.dishName}`}
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
