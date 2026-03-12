import { cn } from "@/lib/utils"
import type { KitchenItemSubTab } from "@/types/inventory"

interface KitchenItemTabsProps {
  activeTab: KitchenItemSubTab
  onChange: (tab: KitchenItemSubTab) => void
}

export function KitchenItemTabs({ activeTab, onChange }: KitchenItemTabsProps) {
  const tabs: { key: KitchenItemSubTab; label: string }[] = [
    { key: "raw", label: "Raw Food Items" },
    { key: "solid", label: "Solid / Non-Consumable Items" },
  ]

  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            "rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors",
            activeTab === tab.key
              ? "bg-[#059669] text-white"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
