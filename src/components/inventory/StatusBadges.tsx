import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { InventoryStatus, CookedStatus } from "@/types/inventory"

const statusColorMap: Record<InventoryStatus, string> = {
  "In Stock": "border-transparent bg-emerald-50 text-emerald-700",
  Low: "border-transparent bg-amber-50 text-amber-700",
  "Out of Stock": "border-transparent bg-red-50 text-red-600",
}

const cookedStatusColorMap: Record<CookedStatus, string> = {
  Fresh: "border-transparent bg-emerald-50 text-emerald-700",
  "Expiring Soon": "border-transparent bg-amber-50 text-amber-700",
  Expired: "border-transparent bg-red-50 text-red-600",
}

interface InventoryStatusBadgeProps {
  status: InventoryStatus
}

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium",
        statusColorMap[status]
      )}
    >
      {status}
    </Badge>
  )
}

interface CookedStatusBadgeProps {
  status: CookedStatus
}

export function CookedStatusBadge({ status }: CookedStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium",
        cookedStatusColorMap[status]
      )}
    >
      {status}
    </Badge>
  )
}
