import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Link } from "react-router"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { RevenuePoint } from "@/types/reports"

interface Props {
  data: RevenuePoint[]
  description: string
  ticks: number[]
}

export function RevenueTrendCard({ data, description, ticks }: Props) {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900">
            Revenue Trends
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500">
            {description}
          </CardDescription>
        </div>

        <Link
          to="/dashboard/expenses"
          className="pt-0.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View Details
        </Link>
      </CardHeader>

      <CardContent className="px-3 pb-4 sm:px-5">
        <ChartContainer
          config={{ revenue: { label: "Revenue", color: "#19B67A" } }}
          className="aspect-auto h-[300px] w-full max-w-none"
        >
          <LineChart
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
              ticks={ticks}
              domain={[ticks[0], ticks[ticks.length - 1]]}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#19B67A"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#19B67A", stroke: "#FFFFFF", strokeWidth: 2 }}
              activeDot={{
                r: 5,
                fill: "#19B67A",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
