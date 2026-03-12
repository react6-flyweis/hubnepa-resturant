import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { PieChart, Pie, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { SalesMixItem, SalesMixKey } from "@/types/reports"

const salesMixColorMap: Record<SalesMixKey, string> = {
  starters: "#19B67A",
  mains: "#4A7BE8",
  drinks: "#F59E0B",
  desserts: "#EF4444",
}

interface Props {
  items: SalesMixItem[]
}

export function SalesMixCard({ items }: Props) {
  return (
    <Card className="py-0">
      <CardHeader className="px-5 py-5">
        <CardTitle className="text-base font-semibold text-slate-900">
          Sales Mix
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-slate-500">
          Menu category contribution for the selected period.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <ChartContainer
          config={{
            starters: { label: "Starters", color: salesMixColorMap.starters },
            mains: { label: "Mains", color: salesMixColorMap.mains },
            drinks: { label: "Drinks", color: salesMixColorMap.drinks },
            desserts: { label: "Desserts", color: salesMixColorMap.desserts },
          }}
          className="mx-auto aspect-auto h-[220px] w-full max-w-[220px]"
        >
          <PieChart>
            <Pie
              data={items}
              dataKey="share"
              nameKey="label"
              innerRadius={58}
              outerRadius={84}
              paddingAngle={2}
              strokeWidth={0}
            >
              {items.map((item) => (
                <Cell
                  key={item.key}
                  fill={salesMixColorMap[item.key]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>

        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span
                  className="inline-flex size-2.5 rounded-full"
                  style={{ backgroundColor: salesMixColorMap[item.key] }}
                />
                <span>{item.label}</span>
              </div>

              <span className="text-sm font-medium text-slate-700">
                {item.share}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
