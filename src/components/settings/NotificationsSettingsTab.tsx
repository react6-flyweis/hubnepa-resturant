import { useState } from "react"
import {
  DollarSign,
  MapPin,
  Settings,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NotificationChannel = "email" | "sms"

type NotificationPreferenceItem = {
  key: string
  title: string
  description: string
  icon: LucideIcon
  channels: Record<NotificationChannel, boolean>
}

const notificationPreferenceItems: NotificationPreferenceItem[] = [
  {
    key: "new-orders",
    title: "New Orders",
    description: "Receive alerts when a customer places a new order.",
    icon: UtensilsCrossed,
    channels: { email: true, sms: true },
  },
  {
    key: "order-updates",
    title: "Order Updates",
    description: "Notifications about driver arrivals and delivery status.",
    icon: MapPin,
    channels: { email: true, sms: true },
  },
  {
    key: "customer-reviews",
    title: "Customer Reviews",
    description: "Get notified when you receive a new review.",
    icon: Users,
    channels: { email: true, sms: true },
  },
  {
    key: "payouts-finance",
    title: "Payouts & Finance",
    description: "Weekly payout summaries and invoice alerts.",
    icon: DollarSign,
    channels: { email: true, sms: true },
  },
  {
    key: "system-updates",
    title: "System Updates",
    description: "Important updates about the platform and features.",
    icon: Settings,
    channels: { email: true, sms: true },
  },
]

const notificationSwitchColorMap = {
  enabled: {
    track: "bg-emerald-600",
    thumb: "translate-x-[22px] bg-white",
  },
  disabled: {
    track: "bg-slate-300",
    thumb: "translate-x-0 bg-white",
  },
} as const

function NotificationChannelSwitch({
  channel,
  checked,
  onCheckedChange,
}: {
  channel: NotificationChannel
  checked: boolean
  onCheckedChange: (channel: NotificationChannel) => void
}) {
  const switchColorKey = checked ? "enabled" : "disabled"

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium tracking-wide text-slate-400">
        {channel.toUpperCase()}
      </span>
      <button
        type="button"
        role="switch"
        aria-label={`${channel} notifications`}
        aria-checked={checked}
        onClick={() => onCheckedChange(channel)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          notificationSwitchColorMap[switchColorKey].track
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform",
            notificationSwitchColorMap[switchColorKey].thumb
          )}
        />
      </button>
    </div>
  )
}

function NotificationPreferenceRow({
  item,
  onToggleChannel,
}: {
  item: NotificationPreferenceItem
  onToggleChannel: (
    key: NotificationPreferenceItem["key"],
    channel: NotificationChannel
  ) => void
}) {
  return (
    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500">
          <item.icon className="size-5" />
        </div>

        <div>
          <p className="font-display text-lg font-medium text-slate-900">
            {item.title}
          </p>
          <p className="text-sm text-slate-500">{item.description}</p>
        </div>
      </div>

      <div className="flex items-end gap-6">
        {(["email", "sms"] as NotificationChannel[]).map((channel) => (
          <NotificationChannelSwitch
            key={channel}
            channel={channel}
            checked={item.channels[channel]}
            onCheckedChange={(nextChannel) =>
              onToggleChannel(item.key, nextChannel)
            }
          />
        ))}
      </div>
    </div>
  )
}

export function NotificationsSettingsTab() {
  const [preferences, setPreferences] = useState<NotificationPreferenceItem[]>(
    notificationPreferenceItems
  )

  function handleToggleChannel(
    key: NotificationPreferenceItem["key"],
    channel: NotificationChannel
  ) {
    setPreferences((currentPreferences) =>
      currentPreferences.map((item) =>
        item.key === key
          ? {
              ...item,
              channels: {
                ...item.channels,
                [channel]: !item.channels[channel],
              },
            }
          : item
      )
    )
  }

  return (
    <Card className="mt-6 rounded-xl border border-slate-200 shadow-none">
      <CardHeader className="px-6">
        <CardTitle className="font-display text-lg font-semibold text-slate-900">
          Notification Preferences
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Choose how you want to be notified about important updates.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-1">
        <div className="divide-y divide-slate-100 border-t border-slate-100">
          {preferences.map((item) => (
            <NotificationPreferenceRow
              key={item.key}
              item={item}
              onToggleChannel={handleToggleChannel}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
