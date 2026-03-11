import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Dialog, DialogContent } from "@/components/ui/dialog"

// basic shape for cooked food entry shown on the inventory page
export type NewCookedFood = {
  dishName: string
  preparedBy: string
  preparedDate: string
  expiryDate: string
  quantity: string
}

const cookedSchema = z.object({
  dishName: z.string().min(1, "Dish name is required"),
  preparedBy: z.string().min(1, "Prepared by is required"),
  preparedDate: z.string().min(1, "Prepared date/time is required"),
  expiryDate: z.string().min(1, "Expiry date/time is required"),
  quantity: z.string().min(1, "Quantity is required"),
})

type CookedValues = z.infer<typeof cookedSchema>

interface AddCookedFoodDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: CookedValues) => void
}

export function AddCookedFoodDialog({
  open,
  onClose,
  onSubmit,
}: AddCookedFoodDialogProps) {
  const form = useForm<CookedValues>({
    resolver: zodResolver(cookedSchema),
    defaultValues: {
      dishName: "",
      preparedBy: "",
      preparedDate: "",
      expiryDate: "",
      quantity: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        dishName: "",
        preparedBy: "",
        preparedDate: "",
        expiryDate: "",
        quantity: "",
      })
    }
  }, [open, form])

  function handleSubmit(values: CookedValues) {
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
        <h2 className="text-lg font-medium text-slate-900">Add Cooked Food</h2>
        <p className="mt-1 text-sm text-slate-500">
          Log a batch of prepared dish so it shows up in stock.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div>
            <Label htmlFor="dishName">Dish Name</Label>
            <Input
              id="dishName"
              className="mt-1"
              {...form.register("dishName")}
            />
            {form.formState.errors.dishName && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.dishName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="preparedBy">Prepared By</Label>
            <Input
              id="preparedBy"
              className="mt-1"
              {...form.register("preparedBy")}
            />
            {form.formState.errors.preparedBy && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.preparedBy.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="preparedDate">Prepared Date & Time</Label>
            <Input
              id="preparedDate"
              type="datetime-local"
              className="mt-1"
              {...form.register("preparedDate")}
            />
            {form.formState.errors.preparedDate && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.preparedDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date & Time</Label>
            <Input
              id="expiryDate"
              type="datetime-local"
              className="mt-1"
              {...form.register("expiryDate")}
            />
            {form.formState.errors.expiryDate && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              className="mt-1"
              placeholder="e.g. 5 Portions, 3 Liters"
              {...form.register("quantity")}
            />
            {form.formState.errors.quantity && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.quantity.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
