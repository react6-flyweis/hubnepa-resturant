import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { Dialog, DialogContent } from "@/components/ui/dialog"

export type InventoryItem = {
  name: string
  category: string
  currentStock: number
  minThreshold: number
  unitType: string
  supplier: string
  status: "In Stock" | "Low" | "Out of Stock"
}

const adjustmentSchema = z.object({
  item: z.string(),
  type: z.enum(["add", "remove"]),
  quantity: z.number().min(1, "Quantity must be at least 1"),
})

type AdjustmentValues = z.infer<typeof adjustmentSchema>

interface StockAdjustmentDialogProps {
  open: boolean
  onClose: () => void
  /** the list of items that can be adjusted */
  items: InventoryItem[]
  /** label used when prompting the user to select an item */
  itemLabel?: string
  /** called when the user submits the form */
  onApply?: (values: AdjustmentValues) => void
}

export function StockAdjustmentDialog({
  open,
  onClose,
  items,
  onApply,
  itemLabel = "Item",
}: StockAdjustmentDialogProps) {
  // track which step of the flow we're in: selecting an item or adjusting
  const [stage, setStage] = useState<"select" | "adjust">("select")

  const form = useForm<AdjustmentValues>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues: {
      item: "",
      type: "add",
      quantity: 0,
    },
  })

  // reset dialog state when it is opened
  useEffect(() => {
    if (open) {
      setStage("select")
      form.reset({ item: "", type: "add", quantity: 0 })
    }
  }, [open, form])

  // whenever the list of items changes we clear the selection if it no longer exists
  useEffect(() => {
    if (
      stage === "select" &&
      items.length > 0 &&
      !items.find((i) => i.name === form.getValues("item"))
    ) {
      form.setValue("item", "")
    }
  }, [items, form, stage])

  // automatically advance to adjustment view when an item is selected
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (stage === "select" && value.item) {
        setStage("adjust")
      }
    })
    return () => subscription.unsubscribe()
  }, [form, stage])

  const selectedItem = items.find((i) => i.name === form.watch("item"))

  function handleSubmit(values: AdjustmentValues) {
    // if user is still on the initial selection screen, advance to the
    // adjustment step instead of closing the dialog.
    if (stage === "select") {
      setStage("adjust")
      return
    }

    if (onApply) {
      onApply(values)
    }
    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-full max-w-md p-6">
        <h2 className="text-lg font-medium text-slate-900">Stock Adjustment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Adjust {itemLabel.toLowerCase()} stock quantities by adding or
          removing items
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-6"
          noValidate
        >
          {stage === "select" ? (
            <>
              <div>
                <Label htmlFor="item">Select {itemLabel}</Label>
                <select
                  id="item"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                  {...form.register("item")}
                >
                  <option value="" disabled>
                    -- choose an option --
                  </option>
                  {items.map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {selectedItem && (
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-slate-500">Adjusting stock for:</p>
                  <p className="font-medium text-slate-900">
                    {selectedItem.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Current: {selectedItem.currentStock} {selectedItem.unitType}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {(["add", "remove"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => form.setValue("type", mode)}
                    className={cn(
                      "flex-1 rounded-lg py-2 font-medium",
                      mode === "add"
                        ? form.watch("type") === "add"
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-200 text-slate-700"
                        : form.watch("type") === "remove"
                          ? "bg-red-600 text-white"
                          : "border border-slate-200 text-slate-700"
                    )}
                  >
                    {mode === "add" ? "Add Stock" : "Remove Stock"}
                  </button>
                ))}
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  className="mt-1"
                  {...form.register("quantity", { valueAsNumber: true })}
                />
                {form.formState.errors.quantity && (
                  <p className="mt-1 text-xs text-red-600">
                    {form.formState.errors.quantity.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button type="submit">Apply</Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
