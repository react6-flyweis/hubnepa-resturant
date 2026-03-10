import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowLeft,
  Building2,
  CircleAlert,
  CreditCard,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { Link, useSearchParams } from "react-router"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Phone number is required"),
  businessName: z.string().min(2, "Business name is required"),
  businessAddress: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(3, "ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
  cardNumber: z
    .string()
    .regex(/^[0-9 ]+$/, "Card number can only contain digits")
    .min(14, "Card number is required"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Use MM/YY format"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>
type CheckoutFieldName = Exclude<keyof CheckoutFormValues, "agreeToTerms">

type CheckoutPlan = {
  key: string
  name: string
  price: number
  features: string[]
}

type CheckoutFieldConfig = {
  name: CheckoutFieldName
  label: string
  placeholder: string
  type?: string
  icon?: React.ComponentType<{ className?: string }>
}

const plans: CheckoutPlan[] = [
  {
    key: "silver",
    name: "Silver",
    price: 29,
    features: [
      "Up to 50 menu items",
      "Basic inventory tracking",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    key: "gold",
    name: "Gold",
    price: 79,
    features: [
      "Instant account activation",
      "30-day money-back guarantee",
      "Free onboarding support",
      "No setup fees",
    ],
  },
  {
    key: "platinum",
    name: "Platinum",
    price: 149,
    features: [
      "Everything in Gold",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
    ],
  },
]

const personalFields: CheckoutFieldConfig[][] = [
  [
    { name: "firstName", label: "First Name *", placeholder: "John" },
    { name: "lastName", label: "Last Name *", placeholder: "Doe" },
  ],
  [
    {
      name: "email",
      label: "Email Address *",
      placeholder: "john@example.com",
      type: "email",
      icon: Mail,
    },
    {
      name: "phone",
      label: "Phone Number *",
      placeholder: "+1 (555) 123-4567",
      type: "tel",
      icon: Phone,
    },
  ],
]

const businessFields: CheckoutFieldConfig[][] = [
  [
    {
      name: "businessName",
      label: "Restaurant/Business Name *",
      placeholder: "Your Restaurant Name",
    },
  ],
  [
    {
      name: "businessAddress",
      label: "Business Address *",
      placeholder: "123 Main Street",
      icon: MapPin,
    },
  ],
  [
    { name: "city", label: "City *", placeholder: "New York" },
    { name: "state", label: "State/Province *", placeholder: "NY" },
    { name: "postalCode", label: "ZIP/Postal Code *", placeholder: "10001" },
  ],
  [
    {
      name: "country",
      label: "Country *",
      placeholder: "United States",
      icon: Globe,
    },
  ],
]

const paymentFields: CheckoutFieldConfig[][] = [
  [
    {
      name: "cardNumber",
      label: "Card Number *",
      placeholder: "1234 5678 9012 3456",
      icon: CreditCard,
    },
  ],
  [
    {
      name: "cardholderName",
      label: "Cardholder Name *",
      placeholder: "Name on card",
    },
  ],
  [
    {
      name: "expiryDate",
      label: "Expiry Date *",
      placeholder: "MM/YY",
      type: "text",
    },
    { name: "cvv", label: "CVV *", placeholder: "123", type: "password" },
  ],
]

const billingStatusColorMap = {
  info: "border-primary/35 bg-primary/12 text-[#B3FEE4]",
}

function getPlanByKey(planKey: string | null): CheckoutPlan {
  if (!planKey) {
    return plans[1]
  }

  const selectedPlan = plans.find((plan) => plan.key === planKey.toLowerCase())
  return selectedPlan ?? plans[1]
}

function CheckoutSection({
  icon,
  title,
  fields,
  values,
  delayClass,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  fields: CheckoutFieldConfig[][]
  values: ReturnType<typeof useForm<CheckoutFormValues>>
  delayClass?: string
}) {
  const Icon = icon

  return (
    <Card
      className={cn(
        "rounded-2xl border border-[#1B2A5A] bg-[#081742]/90 py-0 text-white shadow-[0_18px_60px_rgba(2,8,30,0.45)]",
        delayClass
      )}
    >
      <CardContent className="p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/16 text-primary">
            <Icon className="size-4" />
          </span>
          <h2 className="text-2xl font-medium tracking-tight text-slate-100">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {fields.map((row, rowIndex) => {
            const columnsClass =
              row.length === 3
                ? "grid gap-4 md:grid-cols-3"
                : row.length === 2
                  ? "grid gap-4 md:grid-cols-2"
                  : "grid gap-4"

            return (
              <div key={`${title}-row-${rowIndex}`} className={columnsClass}>
                {row.map((field) => {
                  const FieldIcon = field.icon
                  const error = values.formState.errors[field.name]?.message

                  return (
                    <Field key={field.name}>
                      <FieldLabel htmlFor={field.name}>
                        {field.label}
                      </FieldLabel>
                      <div className="relative">
                        {FieldIcon ? (
                          <FieldIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                        ) : null}
                        <Input
                          id={field.name}
                          type={field.type ?? "text"}
                          placeholder={field.placeholder}
                          className={cn(FieldIcon ? "pl-9" : "pl-3.5")}
                          aria-invalid={Boolean(error)}
                          {...values.register(field.name)}
                        />
                      </div>
                      {typeof error === "string" ? (
                        <FieldError>{error}</FieldError>
                      ) : null}
                    </Field>
                  )
                })}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const selectedPlan = useMemo(
    function memoizedPlan() {
      return getPlanByKey(searchParams.get("plan"))
    },
    [searchParams]
  )

  const values = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessName: "",
      businessAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      agreeToTerms: false,
    },
  })

  const subtotal = selectedPlan.price
  const processingFee = 0
  const taxAmount = 0
  const totalDueToday = subtotal + processingFee + taxAmount

  function onSubmit(data: CheckoutFormValues) {
    values.reset({
      ...data,
      agreeToTerms: false,
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    })
  }

  return (
    <main className="min-h-screen bg-[#0A0E27] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/#pricing"
          className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to pricing
        </Link>

        <header className="mt-7 animate-in text-center duration-700 fade-in slide-in-from-top-4">
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Complete Your <span className="text-primary">Order</span>
          </h1>
          <p className="mt-3 text-base text-slate-300">
            You&apos;re one step away from unlocking powerful features
          </p>
        </header>

        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <form
            onSubmit={values.handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <CheckoutSection
              icon={UserRound}
              title="Personal Information"
              fields={personalFields}
              values={values}
              delayClass="[animation-delay:120ms]"
            />

            <CheckoutSection
              icon={Building2}
              title="Business Information"
              fields={businessFields}
              values={values}
              delayClass="[animation-delay:180ms]"
            />

            <CheckoutSection
              icon={CreditCard}
              title="Payment Details"
              fields={paymentFields}
              values={values}
              delayClass="[animation-delay:240ms]"
            />

            <Card className="animate-in rounded-2xl border border-[#1B2A5A] bg-[#081742]/90 py-0 text-white shadow-[0_18px_60px_rgba(2,8,30,0.45)] duration-700 [animation-delay:320ms] fade-in slide-in-from-bottom-4">
              <CardContent className="space-y-5 p-5 sm:p-6">
                <Field>
                  <label
                    htmlFor="agreeToTerms"
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      className="mt-[2px] size-4 rounded border border-[#2A3A6C] bg-[#050D2D] accent-primary"
                      {...values.register("agreeToTerms")}
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/"
                        className="text-primary transition-colors hover:text-primary/85"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/"
                        className="text-primary transition-colors hover:text-primary/85"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {typeof values.formState.errors.agreeToTerms?.message ===
                  "string" ? (
                    <FieldError>
                      {values.formState.errors.agreeToTerms.message}
                    </FieldError>
                  ) : null}
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-xl text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(0,188,125,0.3)] hover:bg-primary/90"
                >
                  <Lock className="size-4" />
                  Complete Secure Payment
                </Button>
              </CardContent>
            </Card>
          </form>

          <aside className="animate-in duration-700 slide-in-from-right-5 [animation-delay:260ms] fade-in lg:sticky lg:top-6 lg:h-fit">
            <Card className="rounded-2xl border border-primary/70 bg-[#081742]/95 py-0 text-white shadow-[0_20px_70px_rgba(0,188,125,0.12)]">
              <CardContent className="space-y-5 p-5 sm:p-6">
                <h2 className="text-2xl font-medium text-slate-100">
                  Order Summary
                </h2>

                <div className="rounded-xl border border-[#22356E] bg-[#050D2D] p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Plan</span>
                    <span className="font-semibold text-slate-100">
                      {selectedPlan.name}
                    </span>
                  </div>
                  <p className="mt-2 text-right text-4xl leading-none font-semibold tracking-tight text-white">
                    ${selectedPlan.price}
                    <span className="ml-1 text-sm font-normal text-slate-400">
                      /month
                    </span>
                  </p>
                </div>

                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Processing Fee</span>
                    <span>${processingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax (0%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-y border-[#22356E] py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-medium text-slate-100">
                      Total Due Today
                    </span>
                    <span className="text-4xl font-semibold tracking-tight text-primary">
                      ${totalDueToday.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "rounded-xl border p-3 text-sm leading-6",
                    billingStatusColorMap.info
                  )}
                >
                  <div className="flex items-center gap-2">
                    <CircleAlert className="size-4" />
                    Billing starts today
                  </div>
                  <p className="mt-2 text-xs text-[#D1FAEC]">
                    You&apos;ll be charged ${selectedPlan.price} monthly. Cancel
                    anytime from your account settings.
                  </p>
                </div>

                <div className="border-t border-[#22356E] pt-4">
                  <h3 className="text-base font-semibold text-slate-100">
                    What&apos;s Included:
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedPlan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="mt-1.5 size-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
