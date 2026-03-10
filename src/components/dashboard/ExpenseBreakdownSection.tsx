import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

export type ExpenseItem = {
  name: string
  value: number
  amount: number
  key: string
}

interface ExpenseBreakdownSectionProps {
  items: ExpenseItem[]
  colorMap: Record<string, string>
  totalAmount?: number
}

export function ExpenseBreakdownSection({
  items,
  colorMap,
  totalAmount,
}: ExpenseBreakdownSectionProps) {
  const computedTotal =
    totalAmount ?? items.reduce((acc, i) => acc + i.amount, 0)

  const chartConfig = {
    ...items.reduce(
      (acc, i) => {
        acc[i.key] = { label: i.name, color: colorMap[i.key] }
        return acc
      },
      {} as Record<string, { label: string; color: string }>
    ),
  } satisfies ChartConfig

  return (
    <section className="mt-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Other Expenses Breakdown</h2>
        <div className="flex items-center gap-2">
          <Button size="xs" className="h-7 px-3 text-xs">
            Overview
          </Button>
          <Button
            size="xs"
            variant="outline"
            className="h-7 bg-background px-3 text-xs"
          >
            Detailed View
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="py-0">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-base font-medium">
              Expense Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ChartContainer
              config={chartConfig}
              className="mx-auto h-60 w-full max-w-none"
            >
              <PieChart>
                <Pie
                  data={items}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={0}
                  outerRadius={95}
                  strokeWidth={1}
                >
                  {items.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={colorMap[entry.key]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
            <CardTitle className="text-base font-medium">
              Expense Categories
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Total: ${computedTotal.toLocaleString()}
            </span>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            {items.map((expense) => (
              <div key={expense.name} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <span
                      className="inline-flex h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: colorMap[expense.key],
                      }}
                    />
                    {expense.name}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {expense.value}%
                    </span>
                    <span className="font-semibold">
                      ${expense.amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${expense.value}%`,
                      backgroundColor: colorMap[expense.key],
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
