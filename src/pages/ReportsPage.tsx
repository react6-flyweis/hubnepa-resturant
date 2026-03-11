import { useState } from "react"
import { Link } from "react-router"
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  DollarSign,
  Download,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
  Users,
  Wallet,
} from "lucide-react"
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type TimeRange = "7d" | "30d" | "month" | "quarter"
type MetricKey = "revenue" | "orders" | "averageOrderValue" | "customers"
type SalesMixKey = "starters" | "mains" | "drinks" | "desserts"
type TrendTone = "positive" | "negative"

interface TimeRangeOption {
  value: TimeRange
  label: string
}

interface MetricCardData {
  key: MetricKey
  title: string
  value: string
  change: number
}

interface RevenuePoint {
  label: string
  revenue: number
}

interface SalesMixItem {
  key: SalesMixKey
  label: string
  share: number
}

interface ReportSnapshot {
  metrics: MetricCardData[]
  totalMonthlyExpense: number
  expenseChange: number
  revenueTrend: RevenuePoint[]
  revenueTicks: number[]
  revenueDescription: string
  salesMix: SalesMixItem[]
}

const timeRangeOptions: TimeRangeOption[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
]

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

const salesMixColorMap: Record<SalesMixKey, string> = {
  starters: "#19B67A",
  mains: "#4A7BE8",
  drinks: "#F59E0B",
  desserts: "#EF4444",
}

const reportSnapshots: Record<TimeRange, ReportSnapshot> = {
  "7d": {
    metrics: [
      {
        key: "revenue",
        title: "Total Revenue",
        value: "$12,845.50",
        change: 12.5,
      },
      {
        key: "orders",
        title: "Total Orders",
        value: "854",
        change: 6.2,
      },
      {
        key: "averageOrderValue",
        title: "Avg. Order Value",
        value: "$32.40",
        change: -2.4,
      },
      {
        key: "customers",
        title: "New Customers",
        value: "128",
        change: 16.3,
      },
    ],
    totalMonthlyExpense: 13070,
    expenseChange: -3.2,
    revenueTrend: [
      { label: "Mon", revenue: 1220 },
      { label: "Tue", revenue: 1460 },
      { label: "Wed", revenue: 1110 },
      { label: "Thu", revenue: 1785 },
      { label: "Fri", revenue: 2620 },
      { label: "Sat", revenue: 2470 },
      { label: "Sun", revenue: 2315 },
    ],
    revenueTicks: [0, 650, 1300, 1950, 2600],
    revenueDescription: "Daily gross revenue across the past week.",
    salesMix: [
      { key: "starters", label: "Starters", share: 25 },
      { key: "mains", label: "Mains", share: 45 },
      { key: "drinks", label: "Drinks", share: 20 },
      { key: "desserts", label: "Desserts", share: 10 },
    ],
  },
  "30d": {
    metrics: [
      {
        key: "revenue",
        title: "Total Revenue",
        value: "$49,320.80",
        change: 9.7,
      },
      {
        key: "orders",
        title: "Total Orders",
        value: "3,128",
        change: 5.4,
      },
      {
        key: "averageOrderValue",
        title: "Avg. Order Value",
        value: "$31.75",
        change: -1.1,
      },
      {
        key: "customers",
        title: "New Customers",
        value: "428",
        change: 11.8,
      },
    ],
    totalMonthlyExpense: 51480,
    expenseChange: -1.8,
    revenueTrend: [
      { label: "Week 1", revenue: 6420 },
      { label: "Week 2", revenue: 7050 },
      { label: "Week 3", revenue: 6810 },
      { label: "Week 4", revenue: 7595 },
      { label: "Week 5", revenue: 8120 },
      { label: "Week 6", revenue: 8740 },
      { label: "Week 7", revenue: 9310 },
    ],
    revenueTicks: [0, 2500, 5000, 7500, 10000],
    revenueDescription: "Weekly revenue rollup for the last 30 days.",
    salesMix: [
      { key: "starters", label: "Starters", share: 22 },
      { key: "mains", label: "Mains", share: 47 },
      { key: "drinks", label: "Drinks", share: 18 },
      { key: "desserts", label: "Desserts", share: 13 },
    ],
  },
  month: {
    metrics: [
      {
        key: "revenue",
        title: "Total Revenue",
        value: "$58,904.20",
        change: 14.1,
      },
      {
        key: "orders",
        title: "Total Orders",
        value: "3,742",
        change: 8.9,
      },
      {
        key: "averageOrderValue",
        title: "Avg. Order Value",
        value: "$33.10",
        change: 1.6,
      },
      {
        key: "customers",
        title: "New Customers",
        value: "562",
        change: 18.4,
      },
    ],
    totalMonthlyExpense: 59860,
    expenseChange: -4.7,
    revenueTrend: [
      { label: "Week 1", revenue: 10420 },
      { label: "Week 2", revenue: 11180 },
      { label: "Week 3", revenue: 10975 },
      { label: "Week 4", revenue: 12640 },
      { label: "Week 5", revenue: 13690 },
    ],
    revenueTicks: [0, 3500, 7000, 10500, 14000],
    revenueDescription: "Weekly revenue performance for the current month.",
    salesMix: [
      { key: "starters", label: "Starters", share: 24 },
      { key: "mains", label: "Mains", share: 43 },
      { key: "drinks", label: "Drinks", share: 21 },
      { key: "desserts", label: "Desserts", share: 12 },
    ],
  },
  quarter: {
    metrics: [
      {
        key: "revenue",
        title: "Total Revenue",
        value: "$171,240.90",
        change: 10.8,
      },
      {
        key: "orders",
        title: "Total Orders",
        value: "11,452",
        change: 7.2,
      },
      {
        key: "averageOrderValue",
        title: "Avg. Order Value",
        value: "$34.30",
        change: 2.3,
      },
      {
        key: "customers",
        title: "New Customers",
        value: "1,684",
        change: 20.1,
      },
    ],
    totalMonthlyExpense: 173900,
    expenseChange: -2.9,
    revenueTrend: [
      { label: "Jan", revenue: 49250 },
      { label: "Feb", revenue: 54320 },
      { label: "Mar", revenue: 57670 },
    ],
    revenueTicks: [0, 15000, 30000, 45000, 60000],
    revenueDescription: "Monthly revenue trajectory for the current quarter.",
    salesMix: [
      { key: "starters", label: "Starters", share: 23 },
      { key: "mains", label: "Mains", share: 46 },
      { key: "drinks", label: "Drinks", share: 19 },
      { key: "desserts", label: "Desserts", share: 12 },
    ],
  },
}

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#19B67A",
  },
} satisfies ChartConfig

const salesMixChartConfig = {
  starters: {
    label: "Starters",
    color: salesMixColorMap.starters,
  },
  mains: {
    label: "Mains",
    color: salesMixColorMap.mains,
  },
  drinks: {
    label: "Drinks",
    color: salesMixColorMap.drinks,
  },
  desserts: {
    label: "Desserts",
    color: salesMixColorMap.desserts,
  },
} satisfies ChartConfig

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7d")

  const report = reportSnapshots[selectedRange]
  const selectedRangeLabel =
    timeRangeOptions.find((option) => option.value === selectedRange)?.label ??
    timeRangeOptions[0].label

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Reports & Analytics
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Track your restaurant&apos;s performance, revenue, and customer
              insights.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <TimeRangeMenu
              selectedRange={selectedRange}
              selectedRangeLabel={selectedRangeLabel}
              onChange={setSelectedRange}
            />

            <Button
              variant="outline"
              size="lg"
              className="h-10 bg-black px-4 text-white"
            >
              <Download className="size-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {report.metrics.map((metric) => (
            <ReportMetricCard key={metric.key} metric={metric} />
          ))}
        </div>

        <ExpenseHighlightCard
          amount={report.totalMonthlyExpense}
          change={report.expenseChange}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.9fr)]">
          <RevenueTrendCard
            data={report.revenueTrend}
            description={report.revenueDescription}
            ticks={report.revenueTicks}
          />
          <SalesMixCard items={report.salesMix} />
        </div>
      </div>
    </div>
  )
}

function TimeRangeMenu({
  selectedRange,
  selectedRangeLabel,
  onChange,
}: {
  selectedRange: TimeRange
  selectedRangeLabel: string
  onChange: (value: TimeRange) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="h-10 min-w-[148px] justify-between rounded-xl border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-slate-400" />
            <span>{selectedRangeLabel}</span>
          </span>
          <ChevronDown className="size-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl">
        <DropdownMenuLabel>Time Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedRange}
          onValueChange={(value) => onChange(value as TimeRange)}
        >
          {timeRangeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ReportMetricCard({ metric }: { metric: MetricCardData }) {
  const meta = metricMetaMap[metric.key]
  const tone: TrendTone = metric.change >= 0 ? "positive" : "negative"
  const TrendIcon = tone === "positive" ? TrendingUp : TrendingDown
  const Icon = meta.icon

  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
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
          <span>{formatPercentageDelta(metric.change)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ExpenseHighlightCard({
  amount,
  change,
}: {
  amount: number
  change: number
}) {
  return (
    <Card className="mt-4 rounded-3xl border border-red-300 bg-linear-to-r from-red-50/70 via-white to-white py-0 shadow-sm shadow-red-100/40">
      <CardContent className="px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Wallet className="size-4" />
          </span>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Monthly Expense
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {formatCurrency(amount)}
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-600">
              {formatPercentageDelta(change)} vs last period
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RevenueTrendCard({
  data,
  description,
  ticks,
}: {
  data: RevenuePoint[]
  description: string
  ticks: number[]
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
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
          config={revenueChartConfig}
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

function SalesMixCard({ items }: { items: SalesMixItem[] }) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
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
          config={salesMixChartConfig}
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatPercentageDelta(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}
