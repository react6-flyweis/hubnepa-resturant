import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"

// report-specific imports
import {
  TimeRangeMenu,
  timeRangeOptions,
} from "@/components/reports/TimeRangeMenu"
import { ReportMetricCard } from "@/components/reports/ReportMetricCard"
import { ExpenseHighlightCard } from "@/components/reports/ExpenseHighlightCard"
import { RevenueTrendCard } from "@/components/reports/RevenueTrendCard"
import { SalesMixCard } from "@/components/reports/SalesMixCard"
import { ExpenseByCategoryCard } from "@/components/reports/ExpenseByCategoryCard"
import { ExpenseByTitleCard } from "@/components/reports/ExpenseByTitleCard"
import { TopSellingItemsCard } from "@/components/reports/TopSellingItemsCard"
import { PeakHoursCard } from "@/components/reports/PeakHoursCard"

import type { TimeRange, ReportSnapshot } from "@/types/reports"

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
    expenseByCategory: [
      { category: "Food Supplies", total: 4250, percentage: 32.5 },
      { category: "Staff Salary", total: 3800, percentage: 29.1 },
      { category: "Kitchen Supplies", total: 1200, percentage: 9.2 },
      { category: "Cleaning Supplies", total: 650, percentage: 5.0 },
      { category: "Laundry Supplies", total: 420, percentage: 3.2 },
      { category: "Maintenance", total: 950, percentage: 7.3 },
      { category: "Emergency Maintenance", total: 300, percentage: 2.3 },
      { category: "Office Supplies", total: 280, percentage: 2.1 },
      { category: "Catering Supplies", total: 450, percentage: 3.4 },
      { category: "Beverage", total: 520, percentage: 4.0 },
      { category: "Other", total: 250, percentage: 1.9 },
    ],
    expenseByTitle: [
      {
        title: "Vegetable Supply",
        category: "Food Supplies",
        amount: 1850,
        entries: 12,
      },
      {
        title: "Meat & Poultry",
        category: "Food Supplies",
        amount: 2400,
        entries: 8,
      },
      {
        title: "Staff Wages",
        category: "Staff Salary",
        amount: 3800,
        entries: 15,
      },
      {
        title: "Kitchen Equipment",
        category: "Kitchen Supplies",
        amount: 800,
        entries: 3,
      },
      {
        title: "Utensils & Cookware",
        category: "Kitchen Supplies",
        amount: 400,
        entries: 5,
      },
      {
        title: "Cleaning Product",
        category: "Cleaning Supplies",
        amount: 450,
        entries: 6,
      },
    ],
    topSellingItems: [
      { name: "Grilled Norwegian Salmon", orders: 145, revenue: 3552.5 },
      { name: "Crispy Buffalo Wings", orders: 128, revenue: 1662.72 },
      { name: "Double Cheeseburger", orders: 98, revenue: 1567.02 },
      { name: "Mushroom Risotto", orders: 85, revenue: 1530.0 },
      { name: "Spicy Pepperoni Pizza", orders: 76, revenue: 1254.0 },
    ],
    peakHours: [
      { label: "11am", orders: 25 },
      { label: "1pm", orders: 45 },
      { label: "3pm", orders: 30 },
      { label: "5pm", orders: 35 },
      { label: "7pm", orders: 65 },
      { label: "9pm", orders: 80 },
      { label: "11pm", orders: 60 },
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
    expenseByCategory: [],
    expenseByTitle: [],
    topSellingItems: [],
    peakHours: [],
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
    expenseByCategory: [],
    expenseByTitle: [],
    topSellingItems: [],
    peakHours: [],
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
    expenseByCategory: [],
    expenseByTitle: [],
    topSellingItems: [],
    peakHours: [],
  },
}

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7d")

  const report = reportSnapshots[selectedRange]
  const selectedRangeLabel =
    timeRangeOptions.find((option) => option.value === selectedRange)?.label ??
    timeRangeOptions[0].label

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Reports & Analytics"
          description="Track your restaurant's performance, revenue, and customer insights."
          right={
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
          }
        />

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
        {/* expense overview section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Expense Overview
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ExpenseByCategoryCard data={report.expenseByCategory} />
            <ExpenseByTitleCard data={report.expenseByTitle} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TopSellingItemsCard items={report.topSellingItems} />
          <PeakHoursCard data={report.peakHours} />
        </div>
      </div>
    </div>
  )
}
