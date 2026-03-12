import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Key } from "lucide-react"

// shape used by the dialog; callers can map this into whatever project model makes
// sense (e.g. StaffMember used on the page)
export type NewStaff = {
  name: string
  role: string
  email: string
  employmentType: string
  startDate: string
}

const addStaffSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  employmentType: z.string().min(1, "Employment type is required"),
  startDate: z.string().min(1, "Start date is required"),
})

type AddStaffValues = z.infer<typeof addStaffSchema>

interface AddStaffDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: AddStaffValues) => void
}

// some sample picklists matching what TeamManagementPage uses elsewhere
const roles = [
  "Manager",
  "Head Chef",
  "Chef",
  "Front Staff",
  "Host",
  "Dishwasher",
]

const employmentTypes = ["Full-time", "Part-time", "Contract"]

export function AddStaffDialog({
  open,
  onClose,
  onSubmit,
}: AddStaffDialogProps) {
  const form = useForm<AddStaffValues>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      employmentType: "",
      startDate: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        role: "",
        email: "",
        employmentType: "",
        startDate: "",
      })
    }
  }, [open, form])

  function handleSubmit(values: AddStaffValues) {
    if (onSubmit) {
      onSubmit(values)
    }
    onClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-full max-w-md p-6">
        <h2 className="text-lg font-medium text-slate-900">
          Add New Staff Member
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a profile for a new employee. They will receive an email with
          their login code.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. John Doe"
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
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              {...form.register("role")}
            >
              <option value="" disabled>
                select role
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {form.formState.errors.role && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="mt-1"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="employmentType">Employment Type</Label>
              <select
                id="employmentType"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                {...form.register("employmentType")}
              >
                <option value="" disabled>
                  select type
                </option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {form.formState.errors.employmentType && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.employmentType.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                className="mt-1"
                {...form.register("startDate")}
              />
              {form.formState.errors.startDate && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.startDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            <Key className="size-4" />
            <span>
              A unique 4-digit login code will be generated automatically.
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600">
              Create Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
