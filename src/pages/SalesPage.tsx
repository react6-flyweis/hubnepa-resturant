import { zodResolver } from "@hookform/resolvers/zod"
import {
  CalendarDays,
  CheckCircle2,
  Download,
  EllipsisVertical,
  TrendingUp,
  TriangleAlert,
} from "lucide-react"
import { useState } from "react"
import { type UseFormReturn, useForm } from "react-hook-form"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatCurrency } from "@/lib/utils"

const salesEntrySchema = z.object({
  reportingDate: z.string().min(1, "Select a reporting date"),
  inHouseDineIn: z.number().min(0, "Enter 0 or greater"),
  inHouseTakeOut: z.number().min(0, "Enter 0 or greater"),
  event: z.number().min(0, "Enter 0 or greater"),
  catering: z.number().min(0, "Enter 0 or greater"),
  uberEats: z.number().min(0, "Enter 0 or greater"),
  deliveroo: z.number().min(0, "Enter 0 or greater"),
  grubHub: z.number().min(0, "Enter 0 or greater"),
  justEat: z.number().min(0, "Enter 0 or greater"),
  instaCart: z.number().min(0, "Enter 0 or greater"),
  doorDash: z.number().min(0, "Enter 0 or greater"),
  ezeCater: z.number().min(0, "Enter 0 or greater"),
  other: z.number().min(0, "Enter 0 or greater"),
})

type SalesEntryFormValues = z.infer<typeof salesEntrySchema>
type SalesPlatformFieldName = Exclude<
  keyof SalesEntryFormValues,
  "reportingDate"
>
type SalesStatus = "Verified" | "Pending Review"
type SalesBreakdown = Record<SalesPlatformFieldName, number>
type SalesCategory = "inHouse" | "delivery"

type SalesFieldConfig = {
  label: string
  name: SalesPlatformFieldName
  category: SalesCategory
}

type SalesRecord = {
  date: string
  status: SalesStatus
  platforms: SalesBreakdown
}

type SalesTrendPoint = {
  day: string
  inHouse: number
  delivery: number
}

const salesFieldConfigs: SalesFieldConfig[] = [
  { label: "In House Dine-In", name: "inHouseDineIn", category: "inHouse" },
  { label: "In House Take Out", name: "inHouseTakeOut", category: "inHouse" },
  { label: "Event", name: "event", category: "inHouse" },
  { label: "Catering", name: "catering", category: "inHouse" },
  { label: "Uber Eats", name: "uberEats", category: "delivery" },
  { label: "Deliveroo", name: "deliveroo", category: "delivery" },
  { label: "GrubHub", name: "grubHub", category: "delivery" },
  { label: "JustEat", name: "justEat", category: "delivery" },
  { label: "InstaCart", name: "instaCart", category: "delivery" },
  { label: "DoorDash", name: "doorDash", category: "delivery" },
  { label: "EzeCater", name: "ezeCater", category: "delivery" },
  { label: "Other", name: "other", category: "delivery" },
]

const inHouseFieldNames = salesFieldConfigs
  .filter((field) => field.category === "inHouse")
  .map((field) => field.name)

const deliveryFieldNames = salesFieldConfigs
  .filter((field) => field.category === "delivery")
  .map((field) => field.name)

const salesTrendConfig = {
  inHouse: {
    label: "In-House",
    color: "#10B981",
  },
  delivery: {
    label: "Delivery",
    color: "#3B82F6",
  },
} satisfies ChartConfig

const statusColorMap: Record<SalesStatus, string> = {
  Verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Pending Review": "border-amber-200 bg-amber-50 text-amber-700",
}

const defaultStatusByTotal = {
  verifiedThreshold: 1,
} as const

const initialSalesRecords: SalesRecord[] = sortSalesRecords([
  createSalesRecord("2026-03-12", {
    inHouseDineIn: 550,
    inHouseTakeOut: 380,
    event: 120,
    catering: 150,
    uberEats: 1200,
    deliveroo: 620,
    grubHub: 280,
    justEat: 260,
    instaCart: 180,
    doorDash: 300,
    ezeCater: 150,
    other: 60,
  }),
  createSalesRecord("2026-03-11", {
    inHouseDineIn: 500,
    inHouseTakeOut: 320,
    event: 120,
    catering: 160,
    uberEats: 1437,
    deliveroo: 420,
    grubHub: 250,
    justEat: 210.5,
    instaCart: 130,
    doorDash: 220,
    ezeCater: 90,
    other: 33,
  }),
  createSalesRecord("2026-03-10", {
    inHouseDineIn: 780,
    inHouseTakeOut: 470,
    event: 260,
    catering: 290,
    uberEats: 1600,
    deliveroo: 450,
    grubHub: 280,
    justEat: 240,
    instaCart: 160,
    doorDash: 340,
    ezeCater: 150,
    other: 80,
  }),
  createSalesRecord("2026-03-08", {
    inHouseDineIn: 640,
    inHouseTakeOut: 410,
    event: 215,
    catering: 185,
    uberEats: 1260,
    deliveroo: 420,
    grubHub: 240,
    justEat: 190,
    instaCart: 135,
    doorDash: 210,
    ezeCater: 85,
    other: 50.25,
  }),
  createSalesRecord("2026-03-07", {
    inHouseDineIn: 625,
    inHouseTakeOut: 390,
    event: 180,
    catering: 175,
    uberEats: 1190,
    deliveroo: 410,
    grubHub: 235,
    justEat: 175,
    instaCart: 140,
    doorDash: 190,
    ezeCater: 90,
    other: 59.5,
  }),
  createSalesRecord("2026-03-06", {
    inHouseDineIn: 660,
    inHouseTakeOut: 360,
    event: 195,
    catering: 170,
    uberEats: 1210,
    deliveroo: 400,
    grubHub: 220,
    justEat: 180,
    instaCart: 125,
    doorDash: 205,
    ezeCater: 110,
    other: 89,
  }),
])

function SalesAmountField({
  field,
  values,
}: {
  field: SalesFieldConfig
  values: UseFormReturn<SalesEntryFormValues>
}) {
  const error = values.formState.errors[field.name]?.message

  return (
    <Field className="gap-2">
      <FieldLabel
        htmlFor={field.name}
        className="text-[15px] font-medium text-slate-600"
      >
        {field.label}
      </FieldLabel>

      <Input
        id={field.name}
        type="number"
        min="0"
        step="0.01"
        inputMode="decimal"
        aria-invalid={Boolean(error)}
        className="h-11 rounded-[14px] border-slate-200 bg-[#F8FAFC] px-4 text-base text-slate-700 shadow-none"
        {...values.register(field.name, {
          setValueAs: (value) => {
            if (value === "" || value == null) {
              return 0
            }

            return Number(value)
          },
        })}
      />

      {typeof error === "string" ? (
        <FieldError className="text-xs">{error}</FieldError>
      ) : null}
    </Field>
  )
}

export default function SalesPage() {
  const [salesRecords, setSalesRecords] = useState(initialSalesRecords)

  const values = useForm<SalesEntryFormValues>({
    resolver: zodResolver(salesEntrySchema),
    defaultValues: createBlankSalesValues("2026-03-12"),
  })

  const watchedValues = values.watch()
  const recentEntries = salesRecords.slice(0, 3)
  const previousEntries = salesRecords.slice(3, 6)
  const missingDates = getMissingEntryDates(salesRecords)
  const primaryMissingDate = missingDates[0]
  const trendData = buildTrendData(recentEntries)
  const trendTicks = buildTrendTicks(trendData)
  const currentInHouseTotal = sumFields(watchedValues, inHouseFieldNames)
  const currentDeliveryTotal = sumFields(watchedValues, deliveryFieldNames)
  const currentTotal = currentInHouseTotal + currentDeliveryTotal
  const weeklyTotal = recentEntries.reduce(
    (total, record) => total + getTotalSales(record.platforms),
    0
  )
  const previousWeeklyTotal = previousEntries.reduce(
    (total, record) => total + getTotalSales(record.platforms),
    0
  )
  const weeklyChange =
    previousWeeklyTotal > 0
      ? ((weeklyTotal - previousWeeklyTotal) / previousWeeklyTotal) * 100
      : 0
  const topPlatformSummary = getTopPlatformSummary(recentEntries)

  function onSubmit(data: SalesEntryFormValues) {
    const nextRecord = createSalesRecord(
      data.reportingDate,
      extractPlatforms(data)
    )

    setSalesRecords((currentRecords) => {
      const otherRecords = currentRecords.filter(
        (record) => record.date !== data.reportingDate
      )

      return sortSalesRecords([nextRecord, ...otherRecords])
    })

    values.reset(createBlankSalesValues(data.reportingDate))
  }

  function handleExportReport() {
    const csvHeader = [
      "Date",
      "In-House",
      "Delivery Apps",
      "Total",
      "Status",
      ...salesFieldConfigs.map((field) => field.label),
    ]

    const csvRows = salesRecords.map((record) => {
      const inHouseTotal = getInHouseTotal(record.platforms)
      const deliveryTotal = getDeliveryTotal(record.platforms)

      return [
        record.date,
        inHouseTotal.toFixed(2),
        deliveryTotal.toFixed(2),
        getTotalSales(record.platforms).toFixed(2),
        record.status,
        ...salesFieldConfigs.map((field) =>
          record.platforms[field.name].toFixed(2)
        ),
      ]
    })

    const csvContent = [csvHeader, ...csvRows]
      .map((row) => row.join(","))
      .join("\n")

    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const csvUrl = URL.createObjectURL(csvBlob)
    const link = document.createElement("a")

    link.href = csvUrl
    link.download = `sales-report-${salesRecords[0]?.date ?? "latest"}.csv`
    link.click()

    URL.revokeObjectURL(csvUrl)
  }

  function handleFixMissingDate() {
    if (!primaryMissingDate) {
      return
    }

    values.setValue("reportingDate", primaryMissingDate, { shouldDirty: true })
    values.setFocus("reportingDate")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-4xl leading-none tracking-[-0.03em] text-slate-900">
            Sales Management
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-500">
            Track daily revenue across all delivery platforms and in-house
            dining.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-10 border-slate-200 px-4 text-slate-700"
          onClick={handleExportReport}
        >
          <Download className="size-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="py-0 xl:row-start-1">
          <CardHeader className="gap-4 border-b px-6 py-5 md:grid-cols-[1fr_180px] md:items-start">
            <div>
              <CardTitle className="font-display text-[1.65rem] leading-none text-slate-900">
                Daily Sales Entry
              </CardTitle>
              <CardDescription className="mt-2 max-w-sm text-[15px] leading-6 text-slate-500">
                Enter end-of-day sales figures for each platform.
              </CardDescription>
            </div>

            <Field className="gap-2">
              <FieldLabel htmlFor="reportingDate" className="sr-only">
                Reporting Date
              </FieldLabel>

              <div className="flex items-center gap-3">
                <CalendarDays className="size-6 text-slate-400" />
                <Input
                  id="reportingDate"
                  type="date"
                  aria-invalid={Boolean(values.formState.errors.reportingDate)}
                  className="h-10 border-slate-200 bg-[#F8FAFC] text-sm text-slate-700 shadow-none"
                  {...values.register("reportingDate")}
                />
              </div>

              {typeof values.formState.errors.reportingDate?.message ===
              "string" ? (
                <FieldError className="text-xs">
                  {values.formState.errors.reportingDate.message}
                </FieldError>
              ) : null}
            </Field>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <form onSubmit={values.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {salesFieldConfigs.map((field) => (
                  <SalesAmountField
                    key={field.name}
                    field={field}
                    values={values}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Daily Revenue</p>
                  <p className="mt-1 text-[2rem] leading-none font-semibold tracking-[-0.02em] text-slate-900">
                    {formatCurrency(currentTotal)}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    In-house {formatCurrency(currentInHouseTotal)} • Delivery
                    apps {formatCurrency(currentDeliveryTotal)}
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 rounded-xl px-5 text-sm font-semibold shadow-sm"
                >
                  Save Daily Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6 xl:col-start-2 xl:row-span-2">
          <Card className="py-0">
            <CardHeader className="px-6 pt-5 pb-2">
              <CardTitle className="font-display text-[1.55rem] leading-none text-slate-900">
                Sales Trend
              </CardTitle>
              <CardDescription className="mt-2 text-[15px] leading-6 text-slate-500">
                Last 3 days performance
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 pb-4">
              <ChartContainer
                config={salesTrendConfig}
                className="aspect-auto h-56 w-full"
              >
                <BarChart
                  data={trendData}
                  margin={{ top: 12, right: 8, left: -8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={trendTicks}
                    domain={[0, trendTicks[trendTicks.length - 1] ?? 6000]}
                    tickFormatter={formatAxisCurrency}
                    width={48}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="inHouse"
                    stackId="sales"
                    fill="var(--color-inHouse)"
                    radius={[0, 0, 6, 6]}
                  />
                  <Bar
                    dataKey="delivery"
                    stackId="sales"
                    fill="var(--color-delivery)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="rounded-xl bg-[linear-gradient(180deg,#352C95_0%,#2F2A84_100%)] px-6 py-5 text-white shadow-[0_18px_45px_-28px_rgba(47,42,132,0.85)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-[1.35rem] leading-none">
                  Weekly Insight
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Top-level performance snapshot
                </p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-white/85">
                <TrendingUp className="size-4" />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[2.35rem] leading-none font-semibold tracking-[-0.03em]">
                {formatCurrency(weeklyTotal)}
              </p>
              <p className="mt-2 text-sm text-white/75">
                {formatSignedPercentage(weeklyChange)} vs last week
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-white/70">
                Top Platform{" "}
                <span className="font-semibold text-white">
                  {topPlatformSummary.label} ({topPlatformSummary.share}%)
                </span>
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-white/12">
                <div
                  className="h-full rounded-full bg-[#20D7A3]"
                  style={{ width: `${Math.max(topPlatformSummary.share, 8)}%` }}
                />
              </div>
            </div>
          </div>

          <Card
            className={cn(
              "",
              primaryMissingDate
                ? "border-amber-200 bg-[#FFF7E9]"
                : "border-emerald-200 bg-emerald-50"
            )}
          >
            <CardHeader className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                  primaryMissingDate
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                )}
              >
                {primaryMissingDate ? (
                  <TriangleAlert className="size-4" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
              </div>

              <div>
                <p
                  className={cn(
                    "font-display text-[1.2rem] leading-none",
                    primaryMissingDate ? "text-amber-800" : "text-emerald-800"
                  )}
                >
                  {primaryMissingDate ? "Missing Data" : "Daily Data Complete"}
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm leading-6",
                    primaryMissingDate ? "text-amber-700" : "text-emerald-700"
                  )}
                >
                  {primaryMissingDate
                    ? `You haven’t entered sales data for ${formatLongDate(primaryMissingDate)}. Update it to keep weekly reporting accurate.`
                    : "No missing sales entries were found in the latest 7-day reporting window."}
                </p>

                {primaryMissingDate ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-3 h-auto p-0 text-sm font-semibold text-amber-800 hover:bg-transparent hover:text-amber-900"
                    onClick={handleFixMissingDate}
                  >
                    Fix Now
                  </Button>
                ) : null}
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="xl:row-start-2">
          <CardHeader className="border-b px-6 py-5">
            <CardTitle className="font-display text-[1.55rem] leading-none text-slate-900">
              Recent Entries
            </CardTitle>
          </CardHeader>

          <CardContent className="px-0 py-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Date
                  </TableHead>
                  <TableHead className="py-4 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    In-House
                  </TableHead>
                  <TableHead className="py-4 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Delivery Apps
                  </TableHead>
                  <TableHead className="py-4 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Total
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Status
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentEntries.map((record) => {
                  const inHouseTotal = getInHouseTotal(record.platforms)
                  const deliveryTotal = getDeliveryTotal(record.platforms)
                  const total = inHouseTotal + deliveryTotal

                  return (
                    <TableRow
                      key={record.date}
                      className="border-slate-100 hover:bg-slate-50/60"
                    >
                      <TableCell className="px-6 py-5 font-medium text-slate-700">
                        {record.date}
                      </TableCell>
                      <TableCell className="py-5 text-[15px] text-slate-500">
                        {formatCurrency(inHouseTotal)}
                      </TableCell>
                      <TableCell className="py-5 text-[15px] text-slate-500">
                        {formatCurrency(deliveryTotal)}
                      </TableCell>
                      <TableCell className="py-5 text-[15px] font-semibold text-slate-900">
                        {formatCurrency(total)}
                      </TableCell>
                      <TableCell className="py-5 pr-6">
                        <Badge
                          variant="outline"
                          className={cn(
                            "gap-1.5 rounded-full border px-2.5 py-1",
                            statusColorMap[record.status]
                          )}
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>{record.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5 pr-6 text-slate-500">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          aria-label={`Open actions for ${record.date}`}
                        >
                          <EllipsisVertical className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function createBlankSalesValues(reportingDate: string): SalesEntryFormValues {
  return {
    reportingDate,
    inHouseDineIn: 0,
    inHouseTakeOut: 0,
    event: 0,
    catering: 0,
    uberEats: 0,
    deliveroo: 0,
    grubHub: 0,
    justEat: 0,
    instaCart: 0,
    doorDash: 0,
    ezeCater: 0,
    other: 0,
  }
}

function createSalesRecord(
  date: string,
  platforms: SalesBreakdown
): SalesRecord {
  return {
    date,
    status:
      getTotalSales(platforms) >= defaultStatusByTotal.verifiedThreshold
        ? "Verified"
        : "Pending Review",
    platforms,
  }
}

function extractPlatforms(values: SalesEntryFormValues): SalesBreakdown {
  return {
    inHouseDineIn: values.inHouseDineIn,
    inHouseTakeOut: values.inHouseTakeOut,
    event: values.event,
    catering: values.catering,
    uberEats: values.uberEats,
    deliveroo: values.deliveroo,
    grubHub: values.grubHub,
    justEat: values.justEat,
    instaCart: values.instaCart,
    doorDash: values.doorDash,
    ezeCater: values.ezeCater,
    other: values.other,
  }
}

function sortSalesRecords(records: SalesRecord[]) {
  return [...records].sort((left, right) => right.date.localeCompare(left.date))
}

function sumFields(
  values: Partial<SalesEntryFormValues>,
  fieldNames: SalesPlatformFieldName[]
) {
  return fieldNames.reduce(
    (total, fieldName) => total + Number(values[fieldName] ?? 0),
    0
  )
}

function getInHouseTotal(platforms: SalesBreakdown) {
  return inHouseFieldNames.reduce(
    (total, fieldName) => total + platforms[fieldName],
    0
  )
}

function getDeliveryTotal(platforms: SalesBreakdown) {
  return deliveryFieldNames.reduce(
    (total, fieldName) => total + platforms[fieldName],
    0
  )
}

function getTotalSales(platforms: SalesBreakdown) {
  return getInHouseTotal(platforms) + getDeliveryTotal(platforms)
}

function buildTrendData(records: SalesRecord[]): SalesTrendPoint[] {
  return [...records].reverse().map((record) => ({
    day: formatWeekday(record.date),
    inHouse: getInHouseTotal(record.platforms),
    delivery: getDeliveryTotal(record.platforms),
  }))
}

function buildTrendTicks(records: SalesTrendPoint[]) {
  const maxValue = records.reduce(
    (currentMax, record) =>
      Math.max(currentMax, record.inHouse + record.delivery),
    0
  )
  const roundedMax = Math.max(6000, Math.ceil(maxValue / 1500) * 1500)
  const step = roundedMax / 4

  return Array.from({ length: 5 }, (_, index) => Math.round(step * index))
}

function getTopPlatformSummary(records: SalesRecord[]) {
  const platformTotals: Record<SalesPlatformFieldName, number> = {
    inHouseDineIn: 0,
    inHouseTakeOut: 0,
    event: 0,
    catering: 0,
    uberEats: 0,
    deliveroo: 0,
    grubHub: 0,
    justEat: 0,
    instaCart: 0,
    doorDash: 0,
    ezeCater: 0,
    other: 0,
  }

  let overallTotal = 0

  records.forEach((record) => {
    salesFieldConfigs.forEach((field) => {
      const value = record.platforms[field.name]

      platformTotals[field.name] += value
      overallTotal += value
    })
  })

  let topField = salesFieldConfigs[0]

  salesFieldConfigs.forEach((field) => {
    if (platformTotals[field.name] > platformTotals[topField.name]) {
      topField = field
    }
  })

  const share =
    overallTotal > 0
      ? Math.round((platformTotals[topField.name] / overallTotal) * 100)
      : 0

  return {
    label: topField.label,
    share,
  }
}

function getMissingEntryDates(records: SalesRecord[]) {
  if (!records.length) {
    return []
  }

  const latestDate = parseDate(records[0].date)
  const availableDates = new Set(records.map((record) => record.date))
  const missingDates: string[] = []

  for (let offset = 6; offset >= 0; offset -= 1) {
    const currentDate = new Date(latestDate)
    currentDate.setDate(latestDate.getDate() - offset)

    const currentDateLabel = formatDateValue(currentDate)

    if (!availableDates.has(currentDateLabel)) {
      missingDates.push(currentDateLabel)
    }
  }

  return missingDates
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`)
}

function formatWeekday(value: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    parseDate(value)
  )
}

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parseDate(value))
}

function formatDateValue(value: Date) {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, "0")
  const day = `${value.getDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatAxisCurrency(value: number) {
  return `$${value.toLocaleString()}`
}

function formatSignedPercentage(value: number) {
  if (!Number.isFinite(value)) {
    return "+0.0%"
  }

  const sign = value >= 0 ? "+" : "-"

  return `${sign}${Math.abs(value).toFixed(1)}%`
}
