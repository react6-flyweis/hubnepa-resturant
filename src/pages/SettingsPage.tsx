import { useState } from "react"
import {
  Bell,
  Building2,
  MapPin,
  Save,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { GeneralSettingsTab } from "@/components/settings/GeneralSettingsTab"
import { LocationsSettingsTab } from "@/components/settings/LocationsSettingsTab"
import { NotificationsSettingsTab } from "@/components/settings/NotificationsSettingsTab"
import { SecuritySettingsTab } from "@/components/settings/SecuritySettingsTab"
import { TeamSettingsTab } from "@/components/settings/TeamSettingsTab"
import { cn } from "@/lib/utils"

type SettingsTabKey =
  | "general"
  | "locations"
  | "notifications"
  | "security"
  | "team"

type SettingsTabItem = {
  key: SettingsTabKey
  label: string
  icon: LucideIcon
}

const settingsTabs: SettingsTabItem[] = [
  { key: "general", label: "General", icon: Building2 },
  { key: "locations", label: "Locations", icon: MapPin },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "team", label: "Team", icon: Users },
]

function SettingsTabButton({
  item,
  isActive,
  onClick,
}: {
  item: SettingsTabItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-white text-slate-700 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      )}
    >
      <item.icon className="size-4" />
      <span>{item.label}</span>
    </button>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("general")

  return (
    <div className="p-6">
      <PageHeader
        title="Settings"
        description="Manage your restaurant profile, locations, team, and security."
        right={
          <Button
            type="submit"
            size="lg"
            className="h-11 rounded-lg bg-[#059669] px-5 text-white hover:bg-[#047857]"
          >
            <Save className="size-4" />
            Save Changes
          </Button>
        }
      />

      <div className="mt-5 inline-flex w-full flex-wrap rounded-lg border border-slate-200 bg-slate-100 p-1">
        {settingsTabs.map((tab) => (
          <SettingsTabButton
            key={tab.key}
            item={tab}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      {activeTab === "general" ? (
        <GeneralSettingsTab />
      ) : activeTab === "locations" ? (
        <LocationsSettingsTab />
      ) : activeTab === "notifications" ? (
        <NotificationsSettingsTab />
      ) : activeTab === "security" ? (
        <SecuritySettingsTab />
      ) : (
        <TeamSettingsTab />
      )}
    </div>
  )
}
