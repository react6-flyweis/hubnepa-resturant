import { cn } from "@/lib/utils"
import type { InventoryTab } from "@/types/inventory"

interface InventoryTabsProps {
  activeTab: InventoryTab
  onChange: (tab: InventoryTab) => void
}

export function InventoryTabs({ activeTab, onChange }: InventoryTabsProps) {
  const inventoryTabs: { key: InventoryTab; label: string }[] = [
    { key: "beverage", label: "Beverage Management" },
    { key: "kitchen", label: "Kitchen Stock Management" },
  ]

  return (
    <div className="overflow-x-auto border-b border-slate-200 px-4 pt-4 sm:px-6">
      <div className="flex min-w-max gap-8">
        {inventoryTabs.map((tab) => (
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
