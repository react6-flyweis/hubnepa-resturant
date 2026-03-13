import { useMemo, useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export type GeneralSettingsFormValues = {
  restaurantName: string
  phoneNumber: string
  emailAddress: string
  description: string
  cuisineType: string
  averageCostForTwo: string
  preparationTime: string
  minOrderValue: string
}

const generalSettingsSchema = z.object({
  restaurantName: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters."),
  phoneNumber: z.string().min(7, "Phone number is required."),
  emailAddress: z.string().email("Please enter a valid email address."),
  description: z
    .string()
    .max(500, "Description should be at most 500 characters.")
    .optional()
    .or(z.literal("")),
  cuisineType: z.string().min(2, "Cuisine type is required."),
  averageCostForTwo: z
    .string()
    .min(1, "Average cost is required.")
    .refine(
      (value) => !Number.isNaN(Number(value)) && Number(value) >= 0,
      "Average cost must be a valid positive number."
    ),
  preparationTime: z.string().min(2, "Preparation time is required."),
  minOrderValue: z
    .string()
    .min(1, "Minimum order value is required.")
    .refine(
      (value) => !Number.isNaN(Number(value)) && Number(value) >= 0,
      "Minimum order value must be a valid positive number."
    ),
})

const defaultFormValues: GeneralSettingsFormValues = {
  restaurantName: "The Golden Spoon",
  phoneNumber: "+1 (555) 123-4567",
  emailAddress: "contact@goldenspoon.com",
  description: "",
  cuisineType: "Italian, Continental, Seafood",
  averageCostForTwo: "65.00",
  preparationTime: "30-45 mins",
  minOrderValue: "20.00",
}

export type OperatingHour = {
  dayKey: string
  dayLabel: string
  openTime: string
  closeTime: string
  isOpen: boolean
}

const initialOperatingHours: OperatingHour[] = [
  {
    dayKey: "mon",
    dayLabel: "Mon",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "tue",
    dayLabel: "Tue",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "wed",
    dayLabel: "Wed",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "thu",
    dayLabel: "Thu",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "fri",
    dayLabel: "Fri",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "sat",
    dayLabel: "Sat",
    openTime: "09:00",
    closeTime: "22:00",
    isOpen: true,
  },
  {
    dayKey: "sun",
    dayLabel: "Sun",
    openTime: "",
    closeTime: "",
    isOpen: false,
  },
]

type ScheduleStatusKey = "open" | "closed"

const operatingStatusColorMap: Record<
  ScheduleStatusKey,
  {
    rowText: string
    badge: string
    toggleTrack: string
    toggleThumb: string
  }
> = {
  open: {
    rowText: "text-slate-700",
    badge: "bg-slate-100 text-slate-500",
    toggleTrack: "bg-emerald-500/25",
    toggleThumb: "translate-x-4 bg-emerald-600",
  },
  closed: {
    rowText: "text-slate-400",
    badge: "bg-slate-100 text-slate-400",
    toggleTrack: "bg-slate-200",
    toggleThumb: "translate-x-0 bg-slate-400",
  },
}

function OperatingHourRow({
  item,
  onToggle,
}: {
  item: OperatingHour
  onToggle: (dayKey: string) => void
}) {
  const status: ScheduleStatusKey = item.isOpen ? "open" : "closed"
  const statusStyles = operatingStatusColorMap[status]

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={item.isOpen}
          aria-label={`Toggle ${item.dayLabel} schedule`}
          onClick={() => onToggle(item.dayKey)}
          className={cn(
            "relative h-5 w-10 rounded-full transition-colors",
            statusStyles.toggleTrack
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform",
              statusStyles.toggleThumb
            )}
          />
        </button>
        <span className={cn("text-sm font-medium", statusStyles.rowText)}>
          {item.dayLabel}
        </span>
      </div>

      <span
        className={cn(
          "rounded-md px-2.5 py-1 text-xs font-medium tabular-nums",
          statusStyles.badge
        )}
      >
        {item.isOpen ? `${item.openTime} - ${item.closeTime}` : "Closed"}
      </span>
    </div>
  )
}

export function GeneralSettingsTab() {
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>(
    initialOperatingHours
  )

  const handleToggleOperatingDay = (dayKey: string) => {
    setOperatingHours((prevHours) =>
      prevHours.map((hour) =>
        hour.dayKey === dayKey ? { ...hour, isOpen: !hour.isOpen } : hour
      )
    )
  }

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: defaultFormValues,
  })

  const hasDescriptionErrors = Boolean(errors.description)

  const descriptionClassName = useMemo(() => {
    return hasDescriptionErrors ? "border-destructive" : ""
  }, [hasDescriptionErrors])

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="space-y-6 xl:col-span-8">
        <Card className="rounded-xl border border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-display text-3xl text-slate-900">
              Restaurant Details
            </CardTitle>
            <CardDescription className="text-slate-500">
              Update your public restaurant information.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="restaurantName">
                    Restaurant Name
                  </FieldLabel>
                  <Input
                    id="restaurantName"
                    placeholder="The Golden Spoon"
                    {...register("restaurantName")}
                  />
                  <FieldError errors={[errors.restaurantName]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                  <Input
                    id="phoneNumber"
                    placeholder="+1 (555) 123-4567"
                    {...register("phoneNumber")}
                  />
                  <FieldError errors={[errors.phoneNumber]} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="emailAddress">Email Address</FieldLabel>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder="contact@goldenspoon.com"
                  {...register("emailAddress")}
                />
                <FieldError errors={[errors.emailAddress]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Tell customers what makes your restaurant special."
                  className={cn("min-h-28", descriptionClassName)}
                  {...register("description")}
                />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-display text-3xl text-slate-900">
              Operational Details
            </CardTitle>
            <CardDescription className="text-slate-500">
              Configure cuisines, timing, and order rules.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="cuisineType">Cuisine Type</FieldLabel>
                  <Input
                    id="cuisineType"
                    placeholder="Italian, Continental, Seafood"
                    {...register("cuisineType")}
                  />
                  <FieldDescription>
                    Separate cuisines with commas.
                  </FieldDescription>
                  <FieldError errors={[errors.cuisineType]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="averageCostForTwo">
                    Average Cost for Two
                  </FieldLabel>
                  <Input
                    id="averageCostForTwo"
                    inputMode="decimal"
                    placeholder="65.00"
                    {...register("averageCostForTwo")}
                  />
                  <FieldError errors={[errors.averageCostForTwo]} />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="preparationTime">
                    Preparation Time (Avg)
                  </FieldLabel>
                  <Input
                    id="preparationTime"
                    placeholder="30-45 mins"
                    {...register("preparationTime")}
                  />
                  <FieldError errors={[errors.preparationTime]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="minOrderValue">
                    Min. Order Value
                  </FieldLabel>
                  <Input
                    id="minOrderValue"
                    inputMode="decimal"
                    placeholder="20.00"
                    {...register("minOrderValue")}
                  />
                  <FieldError errors={[errors.minOrderValue]} />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 xl:col-span-4">
        <Card className="rounded-xl border border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-display text-3xl text-slate-900">
              Branding
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=260&q=80"
                alt="Restaurant logo"
                className="h-30 w-30 rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-9 w-full text-slate-600"
            >
              Change Logo
            </Button>

            <div className="border-t border-slate-200 pt-4">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Cover Image
              </p>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant cover"
                  className="h-28 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-8 bg-white/80 text-slate-700 hover:bg-white"
                  >
                    Upload Cover
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-display text-3xl text-slate-900">
              Operating Hours
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {operatingHours.map((item) => (
              <OperatingHourRow
                key={item.dayKey}
                item={item}
                onToggle={handleToggleOperatingDay}
              />
            ))}

            <Button
              type="button"
              variant="secondary"
              className="h-10 w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            >
              Edit Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
