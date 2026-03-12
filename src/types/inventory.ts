// shared types for inventory-related components

export type InventoryStatus = "In Stock" | "Low" | "Out of Stock"
export type CookedStatus = "Fresh" | "Expiring Soon" | "Expired"

export type InventoryTab = "beverage" | "kitchen"
export type KitchenSubTab = "cooked" | "item"
export type KitchenItemSubTab = "raw" | "solid"

export interface InventoryStat {
  key: InventoryStatKey
  title: string
  value: string
}

export type InventoryStatKey = "recipes" | "value" | "alerts"

// cooked food record for display
export interface CookedFood {
  dishName: string
  preparedBy: string
  preparedDate: string
  expiryDate: string
  remainingTime: string
  quantity: string
  status: CookedStatus
}
