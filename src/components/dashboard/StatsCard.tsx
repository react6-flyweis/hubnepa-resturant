import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  changeType?: "positive" | "negative"
  icon: React.ReactNode
  footerText?: string
}

export type { StatsCardProps }

export function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  footerText,
}: StatsCardProps) {
  const changeColor =
    changeType === "positive" ? "text-green-600" : "text-red-600"

  // choose arrow icon visually
  const ArrowIcon = changeType === "positive" ? TrendingUp : TrendingDown

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex items-start justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-muted/50 p-2">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-semibold">{value}</div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            changeColor
          )}
        >
          <ArrowIcon className="size-4" />
          <span>{change}</span>
        </div>
      </CardContent>
      {footerText && (
        <CardFooter className="border-t-0 bg-transparent text-xs text-muted-foreground">
          {footerText}
        </CardFooter>
      )}
    </Card>
  )
}
