import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { InventoryStat, InventoryStatKey } from "@/types/inventory"

interface InventoryStatCardProps {
  stat: InventoryStat
}

export function InventoryStatCard({ stat }: InventoryStatCardProps) {
  const iconConfig = statIconMap[stat.key]
  const Icon = iconConfig.icon

  return (
    <Card className="rounded-2xl border-0 bg-white py-6 shadow-[0_0_0_1px_#E5E7EB]">
      <CardContent className="flex items-center gap-4 px-5">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconConfig.wrapperClassName
          )}
        >
          <Icon className={cn("size-5", iconConfig.iconClassName)} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          <p className="font-display text-[2rem] leading-none font-semibold text-slate-900">
            {stat.value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// map data is currently only used in this file, but kept here to avoid
// importing from the page module. the icons can be swapped out easily
import { ScrollText, Scale, AlertTriangle } from "lucide-react"

const statIconMap: Record<
  InventoryStatKey,
  {
    icon: typeof ScrollText
    iconClassName: string
    wrapperClassName: string
  }
> = {
  recipes: {
    icon: ScrollText,
    iconClassName: "text-blue-600",
    wrapperClassName: "bg-blue-50",
  },
  value: {
    icon: Scale,
    iconClassName: "text-emerald-600",
    wrapperClassName: "bg-emerald-50",
  },
  alerts: {
    icon: AlertTriangle,
    iconClassName: "text-red-500",
    wrapperClassName: "bg-red-50",
  },
}

// need to re-export the key type as it is used by callers constructing
// the stats array
export type { InventoryStatKey }
