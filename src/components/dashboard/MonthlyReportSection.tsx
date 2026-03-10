import { ChevronDown, Download } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  
  Line,
  LineChart,
  
  
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export type MonthlyReportCard = {
  title: string
  total: string
  key: string
  totalClassName: string
  type: "bar" | "line"
  yAxisWidth: number
  data: { month: string; value: number }[]
  yTicks: number[]
}

interface MonthlyReportSectionProps {
  cards: MonthlyReportCard[]
  reportColorMap: Record<string, string>
  monthLabel?: string
  branchLabel?: string
}

export function MonthlyReportSection({
  cards,
  reportColorMap,
  monthLabel = "June",
  branchLabel = "All Branches",
}: MonthlyReportSectionProps) {
  return (
    <section className="mt-10">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <h2 className="text-2xl font-semibold">Monthly Restaurant Report</h2>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 min-w-22">
            {monthLabel}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button variant="outline" size="sm" className="h-8 min-w-28">
            {branchLabel}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button size="sm" className="h-8">
            <Download className="h-4 w-4" />
            Download Report (PDF)
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {cards.map((reportCard) => {
          const chartConfig = {
            value: {
              label: reportCard.title,
              color: reportColorMap[reportCard.key],
            },
          } satisfies ChartConfig

          return (
            <Card key={reportCard.title} className="py-0">
              <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
                <CardTitle className="text-base font-medium">
                  {reportCard.title}
                </CardTitle>
                <span
                  className={`text-sm font-medium ${reportCard.totalClassName}`}
                >
                  Total: {reportCard.total}
                </span>
              </CardHeader>

              <CardContent className="px-2 pb-3">
                <ChartContainer
                  config={chartConfig}
                  className="h-48 w-full max-w-none"
                >
                  {reportCard.type === "bar" ? (
                    <BarChart
                      data={reportCard.data}
                      margin={{ top: 8, right: 14, left: 6, bottom: 6 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="2 2"
                        stroke="#E5E7EB"
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <YAxis
                        width={reportCard.yAxisWidth}
                        tickLine={false}
                        axisLine={false}
                        ticks={reportCard.yTicks}
                        tick={{ fontSize: 12, fill: "#9CA3AF" }}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Bar
                        dataKey="value"
                        fill={reportColorMap[reportCard.key]}
                        radius={[4, 4, 0, 0]}
                        barSize={26}
                      />
                    </BarChart>
                  ) : (
                    <LineChart
                      data={reportCard.data}
                      margin={{ top: 8, right: 14, left: 6, bottom: 6 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="2 2"
                        stroke="#E5E7EB"
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <YAxis
                        width={reportCard.yAxisWidth}
                        tickLine={false}
                        axisLine={false}
                        ticks={reportCard.yTicks}
                        tick={{ fontSize: 12, fill: "#9CA3AF" }}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={reportColorMap[reportCard.key]}
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: reportColorMap[reportCard.key] }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  )}
                </ChartContainer>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
