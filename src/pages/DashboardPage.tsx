import {
  StatsCard,
  type StatsCardProps,
} from "@/components/dashboard/StatsCard"
import { Calendar, CreditCard, DollarSign, Users, Wallet } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import {
  MonthlyReportSection,
  type MonthlyReportCard,
} from "@/components/dashboard/MonthlyReportSection"
import {
  ExpenseBreakdownSection,
  type ExpenseItem,
} from "@/components/dashboard/ExpenseBreakdownSection"
import {
  RecentOrdersSection,
  type OrderRow,
} from "@/components/dashboard/RecentOrdersSection"
import {
  PopularItemsSection,
  type PopularItem,
} from "@/components/dashboard/PopularItemsSection"

export default function DashboardPage() {
  const reportColorMap = {
    sales: "#10B981",
    expenses: "#3B82F6",
    maintenance: "#8B5CF6",
    salaries: "#F97316",
  } as const

  // top-level data definitions; most types are imported from section components
  const stats: StatsCardProps[] = [
    {
      title: "Sales – This Month",
      value: "$45,250",
      change: "12.5% vs last month",
      changeType: "positive",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      footerText: "Updated after monthly report generation",
    },
    {
      title: "Expenses – This Month",
      value: "$28,150",
      change: "8.2% vs last month",
      changeType: "positive",
      icon: <Wallet className="h-5 w-5 text-blue-500" />,
      footerText: "Updated after monthly report generation",
    },
    {
      title: "Total Staff – This Month",
      value: "24",
      change: "+2 vs last month",
      changeType: "positive",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      footerText: "Updated after monthly report generation",
    },
    {
      title: "Salary – This Month",
      value: "$18,500",
      change: "5.7% vs last month",
      changeType: "positive",
      icon: <CreditCard className="h-5 w-5 text-yellow-500" />,
      footerText: "Updated after monthly report generation",
    },
  ]

  const monthlyReportCards: MonthlyReportCard[] = [
    {
      title: "Sales",
      total: "$270,250",
      key: "sales",
      totalClassName: "text-[#10B981]",
      type: "bar",
      yAxisWidth: 36,
      data: [
        { month: "Jan", value: 42000 },
        { month: "Feb", value: 38000 },
        { month: "Mar", value: 45000 },
        { month: "Apr", value: 48000 },
        { month: "May", value: 53000 },
        { month: "Jun", value: 44250 },
      ],
      yTicks: [0, 15000, 30000, 45000, 60000],
    },
    {
      title: "Expenses",
      total: "$167,650",
      key: "expenses",
      totalClassName: "text-[#3B82F6]",
      type: "line",
      yAxisWidth: 36,
      data: [
        { month: "Jan", value: 27500 },
        { month: "Feb", value: 24500 },
        { month: "Mar", value: 30500 },
        { month: "Apr", value: 27500 },
        { month: "May", value: 29500 },
        { month: "Jun", value: 28150 },
      ],
      yTicks: [0, 7500, 15000, 22500, 30000],
    },
    {
      title: "Maintenance Cost",
      total: "$19,900",
      key: "maintenance",
      totalClassName: "text-[#A855F7]",
      type: "bar",
      yAxisWidth: 32,
      data: [
        { month: "Jan", value: 3200 },
        { month: "Feb", value: 2800 },
        { month: "Mar", value: 4100 },
        { month: "Apr", value: 3500 },
        { month: "May", value: 2900 },
        { month: "Jun", value: 3400 },
      ],
      yTicks: [0, 1500, 3000, 4500, 6000],
    },
    {
      title: "Salaries",
      total: "$110,500",
      key: "salaries",
      totalClassName: "text-[#F97316]",
      type: "line",
      yAxisWidth: 42,
      data: [
        { month: "Jan", value: 18200 },
        { month: "Feb", value: 18150 },
        { month: "Mar", value: 18600 },
        { month: "Apr", value: 18550 },
        { month: "May", value: 19000 },
        { month: "Jun", value: 18000 },
      ],
      yTicks: [0, 5000, 10000, 15000, 20000],
    },
  ]

  const expenseColorMap = {
    rent: "#10B981",
    utilities: "#3B82F6",
    supplies: "#8B5CF6",
    marketing: "#F59E0B",
    insurance: "#EF4444",
  } as const

  const orderStatusColorMap = {
    New: "bg-blue-100 text-blue-700",
    Cooking: "bg-orange-100 text-orange-700",
    Ready: "bg-purple-100 text-purple-700",
    Delivered: "bg-emerald-100 text-emerald-700",
  } as const

  const expenseDistribution: ExpenseItem[] = [
    { name: "Rent", value: 48, amount: 8000, key: "rent" },
    { name: "Utilities", value: 21, amount: 3500, key: "utilities" },
    { name: "Supplies", value: 13, amount: 2200, key: "supplies" },
    { name: "Marketing", value: 11, amount: 1800, key: "marketing" },
    { name: "Insurance", value: 7, amount: 1200, key: "insurance" },
  ]

  const orderRows: OrderRow[] = [
    {
      orderId: "#ORD-8821",
      customer: "John Doe",
      customerAgo: "2 min ago",
      items: "2x Chicken Burger, 1x Coke",
      amount: "$28.50",
      status: "New",
    },
    {
      orderId: "#ORD-8820",
      customer: "Alice Smith",
      customerAgo: "7 min ago",
      items: "1x Veg Pizza, 1x Garlic Bread",
      amount: "$32.00",
      status: "Cooking",
    },
    {
      orderId: "#ORD-8819",
      customer: "Bob Wilson",
      customerAgo: "11 min ago",
      items: "3x Pasta Alfredo",
      amount: "$45.00",
      status: "Ready",
    },
    {
      orderId: "#ORD-8818",
      customer: "Emma Davis",
      customerAgo: "18 min ago",
      items: "1x Caesar Salad",
      amount: "$15.50",
      status: "Delivered",
    },
  ]

  const popularItems: PopularItem[] = [
    {
      name: "Spicy Chicken Burger",
      ordersToday: 24,
      price: "$12.99",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Margherita Pizza",
      ordersToday: 18,
      price: "$15.99",
      image:
        "https://images.unsplash.com/photo-1548365328-8b849e96f3aa?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Caesar Salad",
      ordersToday: 16,
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Pasta Alfredo",
      ordersToday: 14,
      price: "$13.99",
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=120&q=80",
    },
  ]

  return (
    <div className="p-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening in your restaurant today."
        right={
          <>
            <Calendar className="mr-1 h-4 w-4" />
            <span>Feb 20, 2026, 10:30 AM</span>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>

      <MonthlyReportSection
        cards={monthlyReportCards}
        reportColorMap={reportColorMap}
      />

      <ExpenseBreakdownSection
        items={expenseDistribution}
        colorMap={expenseColorMap}
      />

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentOrdersSection
          rows={orderRows}
          statusClasses={orderStatusColorMap}
        />
        <PopularItemsSection items={popularItems} />
      </div>
    </div>
  )
}
