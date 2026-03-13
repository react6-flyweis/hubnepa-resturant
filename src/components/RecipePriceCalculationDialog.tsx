import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

// Categories considered as liquids for the solid/liquid split
const LIQUID_CATEGORIES = new Set(["Beverage", "Dairy"])

function isLiquid(category: string) {
  return LIQUID_CATEGORIES.has(category)
}

export interface RecipeIngredient {
  id: string
  name: string
  category: string // "solid" | "liquid" determined from the original item category
  totalPrice: number
  totalUnits: number
  totalWeight: number
  quantityUsed: number
}

// Derived/computed values for display
interface IngredientRow extends RecipeIngredient {
  pricePerUnit: number // totalPrice / totalUnits
  unitPrice: number // totalPrice / totalWeight
  finalCost: number // unitPrice * quantityUsed
}

function deriveRow(ing: RecipeIngredient): IngredientRow {
  const pricePerUnit = ing.totalUnits > 0 ? ing.totalPrice / ing.totalUnits : 0
  const unitPrice = ing.totalWeight > 0 ? ing.totalPrice / ing.totalWeight : 0
  const finalCost = unitPrice * ing.quantityUsed
  return { ...ing, pricePerUnit, unitPrice, finalCost }
}

export interface RecipeData {
  recipeName: string
  date: string
  laborCost: number
  portionSize: string
  ingredients: RecipeIngredient[]
  totalSolid: number
  totalLiquid: number
  finalTotal: number
}

export interface InitialIngredientSeed {
  name: string
  category: string
  costPerUnit: number
  initialStock: number
}

interface RecipePriceCalculationDialogProps {
  open: boolean
  onClose: () => void
  onSave?: (recipe: RecipeData) => void
  initialIngredient?: InitialIngredientSeed
}

let _idCounter = 1
function nextId() {
  return String(_idCounter++)
}

function emptyIngredient(): RecipeIngredient {
  return {
    id: nextId(),
    name: "",
    category: "Other",
    totalPrice: 0,
    totalUnits: 0,
    totalWeight: 0,
    quantityUsed: 0,
  }
}

function seedFromItem(seed: InitialIngredientSeed): RecipeIngredient {
  return {
    id: nextId(),
    name: seed.name,
    category: seed.category,
    totalPrice: seed.costPerUnit * seed.initialStock,
    totalUnits: seed.initialStock,
    totalWeight: 0,
    quantityUsed: 0,
  }
}

export function RecipePriceCalculationDialog({
  open,
  onClose,
  onSave,
  initialIngredient,
}: RecipePriceCalculationDialogProps) {
  const [recipeName, setRecipeName] = useState("")
  const [date, setDate] = useState("")
  const [laborCost, setLaborCost] = useState(0)
  const [portionSize, setPortionSize] = useState("")
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(() =>
    initialIngredient ? [seedFromItem(initialIngredient)] : [emptyIngredient()]
  )

  // Reset state whenever the dialog opens
  function handleOpenChange(val: boolean) {
    if (!val) {
      onClose()
      return
    }
  }

  function resetForm() {
    setRecipeName("")
    setDate("")
    setLaborCost(0)
    setPortionSize("")
    setIngredients(
      initialIngredient
        ? [seedFromItem(initialIngredient)]
        : [emptyIngredient()]
    )
  }

  function addIngredient() {
    setIngredients((prev) => [...prev, emptyIngredient()])
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => prev.filter((i) => i.id !== id))
  }

  function updateIngredient(
    id: string,
    field: keyof Omit<RecipeIngredient, "id" | "category">,
    raw: string
  ) {
    setIngredients((prev) =>
      prev.map((ing) => {
        if (ing.id !== id) return ing
        if (field === "name") return { ...ing, name: raw }
        const num = parseFloat(raw) || 0
        return { ...ing, [field]: num }
      })
    )
  }

  const rows = ingredients.map(deriveRow)

  const totalSolid = rows
    .filter((r) => !isLiquid(r.category))
    .reduce((s, r) => s + r.finalCost, 0)

  const totalLiquid = rows
    .filter((r) => isLiquid(r.category))
    .reduce((s, r) => s + r.finalCost, 0)

  const finalTotal = totalSolid + totalLiquid + laborCost

  function handleSave() {
    if (onSave) {
      onSave({
        recipeName,
        date,
        laborCost,
        portionSize,
        ingredients,
        totalSolid,
        totalLiquid,
        finalTotal,
      })
    }
    onClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto p-6 sm:max-w-4xl">
        <h2 className="text-lg font-semibold text-slate-900">
          Recipe Price Calculation
        </h2>

        {/* Header fields */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rpc-name">Recipe Name</Label>
            <Input
              id="rpc-name"
              placeholder="Enter recipe name"
              className="mt-1"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rpc-labor">Labor Cost ($)</Label>
            <Input
              id="rpc-labor"
              type="number"
              step="0.01"
              min={0}
              className="mt-1"
              value={laborCost === 0 ? "" : laborCost}
              placeholder="0.00"
              onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="rpc-date">Date</Label>
            <Input
              id="rpc-date"
              type="date"
              className="mt-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rpc-portion">Portion Size</Label>
            <Input
              id="rpc-portion"
              placeholder="Optional"
              className="mt-1"
              value={portionSize}
              onChange={(e) => setPortionSize(e.target.value)}
            />
          </div>
        </div>

        {/* Ingredients table */}
        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-225 text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left tracking-wide text-slate-500 uppercase">
                <th className="px-3 py-2">Ingredient Name</th>
                <th className="px-3 py-2">Total Price&nbsp;($)</th>
                <th className="px-3 py-2">Total Units</th>
                <th className="px-3 py-2">Price Per Unit</th>
                <th className="px-3 py-2">Total Weight&nbsp;(LB)</th>
                <th className="px-3 py-2">Unit Price</th>
                <th className="px-3 py-2">Quantity Used&nbsp;(LB)</th>
                <th className="px-3 py-2">Final</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-2">
                    <Input
                      className="h-8 min-w-30 text-xs"
                      placeholder="Ingredient"
                      value={row.name}
                      onChange={(e) =>
                        updateIngredient(row.id, "name", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      className="h-8 w-20 text-xs"
                      type="number"
                      step="0.01"
                      min={0}
                      placeholder="0.00"
                      value={row.totalPrice === 0 ? "" : row.totalPrice}
                      onChange={(e) =>
                        updateIngredient(row.id, "totalPrice", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      className="h-8 w-16 text-xs"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={row.totalUnits === 0 ? "" : row.totalUnits}
                      onChange={(e) =>
                        updateIngredient(row.id, "totalUnits", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {row.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      className="h-8 w-16 text-xs"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={row.totalWeight === 0 ? "" : row.totalWeight}
                      onChange={(e) =>
                        updateIngredient(row.id, "totalWeight", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {row.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      className="h-8 w-16 text-xs"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={row.quantityUsed === 0 ? "" : row.quantityUsed}
                      onChange={(e) =>
                        updateIngredient(row.id, "quantityUsed", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {row.finalCost.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-red-500"
                      onClick={() => removeIngredient(row.id)}
                      disabled={rows.length === 1}
                      type="button"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-3 h-8 w-fit text-xs"
          onClick={addIngredient}
          type="button"
        >
          <Plus className="size-3.5" />
          Add Ingredient
        </Button>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-gray-50 p-4 sm:grid-cols-2">
          {/* Left: solid / liquid totals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total Solid ($):</span>
              <span className="font-semibold text-blue-600">
                ${totalSolid.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total Liquid ($):</span>
              <span className="font-semibold text-emerald-600">
                ${totalLiquid.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Right: labor + final total */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Labor Cost ($):</span>
              <span className="text-sm font-medium text-slate-700">
                {laborCost > 0 ? `$${laborCost.toFixed(2)}` : "—"}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-wide text-slate-700 uppercase">
                Final Total ($):
              </span>
              <span className="text-lg font-bold text-emerald-600">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={resetForm}
            type="button"
          >
            Reset
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSave}
            type="button"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
