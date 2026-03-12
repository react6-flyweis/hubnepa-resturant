import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  ClipboardList,
  Wallet,
  Users,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MetricCardData, TrendTone, MetricKey } from "@/types/reports"

const metricMetaMap: Record<
  MetricKey,
  {
    icon: LucideIcon
    iconClassName: string
    iconWrapperClassName: string
  }
> = {
  revenue: {
    icon: DollarSign,
    iconClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50",
  },
  orders: {
    icon: ClipboardList,
    iconClassName: "text-blue-600",
    iconWrapperClassName: "bg-blue-50",
  },
  averageOrderValue: {
    icon: Wallet,
    iconClassName: "text-amber-500",
    iconWrapperClassName: "bg-amber-50",
  },
  customers: {
    icon: Users,
    iconClassName: "text-violet-600",
    iconWrapperClassName: "bg-violet-50",
  },
}

const trendToneMap: Record<TrendTone, string> = {
  positive: "text-emerald-600",
  negative: "text-red-500",
}

export function ReportMetricCard({ metric }: { metric: MetricCardData }) {
  const meta = metricMetaMap[metric.key]
  const tone: TrendTone = metric.change >= 0 ? "positive" : "negative"
  const TrendIcon = tone === "positive" ? TrendingUp : TrendingDown
  const Icon = meta.icon

  return (
    <Card className="py-0">
      <CardContent className="px-5 py-5">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span
            className={cn(
              "inline-flex size-5 items-center justify-center rounded-full",
              meta.iconWrapperClassName
            )}
          >
            <Icon className={cn("size-3.5", meta.iconClassName)} />
          </span>
          <span>{metric.title}</span>
        </div>

        <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {metric.value}
        </div>

        <div
          className={cn(
            "mt-3 flex items-center gap-1 text-sm font-medium",
            trendToneMap[tone]
          )}
        >
          <TrendIcon className="size-4" />
          <span>{metric.change.toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
