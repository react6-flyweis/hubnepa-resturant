import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { CartesianGrid, BarChart, Bar, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { PeakHourPoint } from "@/types/reports"

interface Props {
  data: PeakHourPoint[]
}

export function PeakHoursCard({ data }: Props) {
  return (
    <Card className="py-0">
      <CardHeader className="px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900">
            Peak Hours
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500">
            Order volume by time period for the selected range.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-5">
        <ChartContainer
          config={{ orders: { label: "Orders", color: "#4A7BE8" } }}
          className="aspect-auto h-75 w-full max-w-none"
        >
          <BarChart
            data={data}
            margin={{ top: 12, right: 10, left: 4, bottom: 0 }}
          >
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <YAxis
              width={42}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Bar
              dataKey="orders"
              fill="#4A7BE8"
              radius={[4, 4, 0, 0]}
              barSize={26}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
