import { useState } from "react"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Info,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NotificationTone = "order" | "warning" | "system" | "success"

interface NotificationItem {
  id: string
  title: string
  description: string
  timeLabel: string
  tone: NotificationTone
  orderCode?: string
  isRead: boolean
}

interface NotificationCardProps {
  notification: NotificationItem
  onDismiss: (notificationId: string) => void
}

const notificationToneMap: Record<
  NotificationTone,
  {
    icon: LucideIcon
    iconWrapperClassName: string
    iconClassName: string
  }
> = {
  order: {
    icon: Bell,
    iconWrapperClassName: "bg-[#E8F0FF]",
    iconClassName: "text-[#2563EB]",
  },
  warning: {
    icon: AlertTriangle,
    iconWrapperClassName: "bg-[#FEECEC]",
    iconClassName: "text-[#DC2626]",
  },
  system: {
    icon: Info,
    iconWrapperClassName: "bg-[#EEF2F7]",
    iconClassName: "text-[#475569]",
  },
  success: {
    icon: CheckCircle2,
    iconWrapperClassName: "bg-[#DDF6EA]",
    iconClassName: "text-[#059669]",
  },
}

const initialNotifications: NotificationItem[] = [
  {
    id: "ord-8825",
    title: "New Order",
    orderCode: "#ORD-8825",
    description: "A new delivery order has been placed.",
    timeLabel: "2 mins ago",
    tone: "order",
    isRead: false,
  },
  {
    id: "stock-tomatoes",
    title: "Low Stock Alert: Tomatoes",
    description: "Inventory for Tomatoes is below threshold (2.5kg).",
    timeLabel: "1 hour ago",
    tone: "warning",
    isRead: false,
  },
  {
    id: "system-maintenance",
    title: "System Update",
    description: "The platform will undergo maintenance at 2 AM.",
    timeLabel: "3 hours ago",
    tone: "system",
    isRead: true,
  },
  {
    id: "weekly-payout",
    title: "Payout Processed",
    description: "Weekly payout of $4,250 has been sent to your bank.",
    timeLabel: "Yesterday",
    tone: "success",
    isRead: true,
  },
]

function NotificationCard({ notification, onDismiss }: NotificationCardProps) {
  const toneConfig = notificationToneMap[notification.tone]
  const NotificationIcon = toneConfig.icon

  return (
    <Card
      className={cn(
        "rounded-[22px] border border-[#D8E2EF] px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:px-6",
        notification.isRead ? "bg-white" : "bg-[#FBFDFF]"
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full sm:size-10",
              toneConfig.iconWrapperClassName
            )}
          >
            <NotificationIcon
              className={cn("size-4", toneConfig.iconClassName)}
            />
          </div>

          <div className="min-w-0 pt-1">
            <h2 className="font-display text-lg leading-none font-semibold tracking-[-0.02em] text-[#1E293B]">
              {notification.title}
              {notification.orderCode && (
                <span className="ml-2 font-semibold text-[#1E293B]">
                  {notification.orderCode}
                </span>
              )}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#52627A]">
              {notification.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pl-[4.75rem] text-[#8BA0BD] lg:justify-end lg:pl-6">
          <div className="flex items-center gap-2 text-base font-medium">
            <Clock3 className="size-4" />
            <span>{notification.timeLabel}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-[#8BA0BD] hover:bg-[#EEF4FB] hover:text-[#5E738F]"
            onClick={() => onDismiss(notification.id)}
            aria-label={`Dismiss ${notification.title}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications)

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  )

  function handleMarkAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    )
  }

  function handleDismiss(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
            Notifications
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-[#61738C]">
            Stay updated with your restaurant activities.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-10 rounded-2xl border-[#D6DEE8] bg-white px-4 text-sm font-medium text-[#415674] shadow-[0_8px_18px_rgba(15,23,42,0.06)] hover:bg-[#F8FAFC]"
          onClick={handleMarkAllAsRead}
          disabled={!hasUnreadNotifications}
        >
          Mark all as read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <div className="mt-6 space-y-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      ) : (
        <Card className="mt-6 rounded-[22px] border border-dashed border-[#D8E2EF] bg-white px-6 py-12 text-center text-[#61738C] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#EEF4FB]">
            <Bell className="size-4 text-[#5E738F]" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold text-[#0F172A]">
            All caught up
          </h2>
          <p className="mt-3 text-base text-[#61738C]">
            New alerts and order updates will show up here as they happen.
          </p>
        </Card>
      )}
    </div>
  )
}
