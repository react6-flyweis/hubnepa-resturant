import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Dialog, DialogContent } from "@/components/ui/dialog"

// shape used by the dialog; callers can map this into whatever project model makes
// sense (e.g. InventoryItem used on the page)
export type NewInventoryItem = {
  name: string
  category: string
  unitType: string
  initialStock: number
  lowAlert: number
  costPerUnit: number
}

const addItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  unitType: z.string().min(1, "Unit of measure is required"),
  initialStock: z.number().min(0),
  lowAlert: z.number().min(0),
  costPerUnit: z.number().min(0),
})

type AddItemValues = z.infer<typeof addItemSchema>

interface AddInventoryItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: AddItemValues) => void
}

export function AddInventoryItemDialog({
  open,
  onClose,
  onSubmit,
}: AddInventoryItemDialogProps) {
  const form = useForm<AddItemValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      name: "",
      category: "",
      unitType: "",
      initialStock: 0,
      lowAlert: 0,
      costPerUnit: 0,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        category: "",
        unitType: "",
        initialStock: 0,
        lowAlert: 0,
        costPerUnit: 0,
      })
    }
  }, [open, form])

  function handleSubmit(values: AddItemValues) {
    if (onSubmit) {
      onSubmit(values)
    }
    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-full max-w-md p-6">
        <h2 className="text-lg font-medium text-slate-900">
          Add New Inventory Item
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a new raw ingredient or supply item to track.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              placeholder="e.g. Extra Virgin Olive Oil"
              className="mt-1"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("category")}
            >
              <option value="" disabled>
                -- select category --
              </option>
              <option value="Produce">Produce</option>
              <option value="Beverage">Beverage</option>
              <option value="Dairy">Dairy</option>
              <option value="Grains">Grains</option>
              <option value="Protein">Protein</option>
              <option value="Other">Other</option>
            </select>
            {form.formState.errors.category && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="unitType">Unit of Measure</Label>
            <select
              id="unitType"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("unitType")}
            >
              <option value="" disabled>
                -- select unit --
              </option>
              <option value="Kilogram (kg)">Kilogram (kg)</option>
              <option value="Liter (L)">Liter (L)</option>
              <option value="Bottles">Bottles</option>
              <option value="Pieces">Pieces</option>
            </select>
            {form.formState.errors.unitType && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.unitType.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="initialStock">Initial Stock</Label>
              <Input
                id="initialStock"
                type="number"
                min={0}
                className="mt-1"
                {...form.register("initialStock", { valueAsNumber: true })}
              />
              {form.formState.errors.initialStock && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.initialStock.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="lowAlert">Low Alert At</Label>
              <Input
                id="lowAlert"
                type="number"
                min={0}
                className="mt-1"
                {...form.register("lowAlert", { valueAsNumber: true })}
              />
              {form.formState.errors.lowAlert && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.lowAlert.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="costPerUnit">Cost per Unit</Label>
              <Input
                id="costPerUnit"
                type="number"
                step="0.01"
                min={0}
                className="mt-1"
                {...form.register("costPerUnit", { valueAsNumber: true })}
              />
              {form.formState.errors.costPerUnit && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.costPerUnit.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              + Calculate Price
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
