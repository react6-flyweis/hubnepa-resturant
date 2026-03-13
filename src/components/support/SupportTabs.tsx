import { cn } from "@/lib/utils"
import {
  MessageSquare,
  HelpCircle,
  type LucideIcon,
  AlertCircle,
} from "lucide-react"

interface SupportTabsProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function SupportTabs({ activeTab, onChange }: SupportTabsProps) {
  const tabs: { key: string; label: string; icon: LucideIcon }[] = [
    { key: "tickets", label: "Support Tickets", icon: AlertCircle },
    { key: "chat", label: "Live Chat", icon: MessageSquare },
    { key: "faqs", label: "FAQs", icon: HelpCircle },
  ]

  return (
    <div className="mt-5">
      <div className="inline-flex flex-wrap rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-white text-slate-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="size-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
