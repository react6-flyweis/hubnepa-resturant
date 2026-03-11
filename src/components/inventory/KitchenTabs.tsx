import { cn } from "@/lib/utils"
import type { KitchenSubTab } from "@/types/inventory"

interface KitchenTabsProps {
  activeTab: KitchenSubTab
  onChange: (tab: KitchenSubTab) => void
}

export function KitchenTabs({ activeTab, onChange }: KitchenTabsProps) {
  const kitchenTabs: { key: KitchenSubTab; label: string }[] = [
    { key: "cooked", label: "Cooked Food Stock" },
    { key: "item", label: "Kitchen Item Stock" },
  ]

  return (
    <div className="overflow-x-auto border-b border-slate-200 px-4 pt-2 sm:px-6">
      <div className="flex min-w-max gap-8">
        {kitchenTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "border-b-2 px-0 pb-3 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-[#14B8A6] text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
