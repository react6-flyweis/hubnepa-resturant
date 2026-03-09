import {
  Award,
  BadgeCheck,
  Crown,
  Gem,
  Sparkle,
  type LucideIcon,
} from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  price: number
  description: string
  icon: LucideIcon
  features: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: "Silver",
    price: 29,
    description: "Perfect for small restaurants getting started",
    icon: Award,
    features: [
      "Up to 50 menu items",
      "Basic inventory tracking",
      "Email support",
      "Mobile app access",
      "Monthly reports",
    ],
  },
  {
    name: "Gold",
    price: 79,
    description: "Ideal for growing restaurants with multiple locations",
    icon: Crown,
    featured: true,
    features: [
      "Unlimited menu items",
      "Advanced inventory tracking",
      "Priority email & chat support",
      "Multi-location management",
      "Real-time analytics",
    ],
  },
  {
    name: "Platinum",
    price: 149,
    description: "Enterprise solution for restaurant chains",
    icon: Gem,
    features: [
      "Everything in Gold",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "API access",
    ],
  },
]

const cardStyles = {
  default:
    "border-white/8 bg-[#0D163F]/88 text-white shadow-[0_20px_80px_rgba(2,6,24,0.42)]",
  featured:
    "border-primary bg-[#0A163E]/95 text-white shadow-[0_28px_120px_rgba(0,188,125,0.16)]",
}

const iconStyles = {
  default: "bg-white/6 text-slate-200",
  featured: "bg-[#FFD70015] text-[#FACC15]",
}

const buttonStyles = {
  default:
    "h-12 rounded-xl border border-white/12 bg-transparent text-white hover:bg-white/4",
  featured:
    "h-12 rounded-xl bg-primary text-slate-950 shadow-[0_16px_36px_rgba(0,188,125,0.24)] hover:bg-primary/90",
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-[#020618] px-6 py-24 text-white sm:px-8 lg:px-10">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,75,0.72),transparent_40%),linear-gradient(180deg,#020824_0%,#020617_100%)]" /> */}

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-center">
            <Sparkle className="size-4 fill-current text-primary" />
            <p className="font-semibold tracking-wide text-primary uppercase">
              Simple & Flexible Pricing
            </p>
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.6rem]">
            Choose the Perfect Plan
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Whether you&apos;re a small bistro or large chain, we have a plan
            that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon
            const styleKey = plan.featured ? "featured" : "default"

            return (
              <Card
                key={plan.name}
                className={cn(
                  "relative overflow-visible rounded-[1.35rem] border py-0 backdrop-blur-sm",
                  cardStyles[styleKey]
                )}
              >
                {plan.featured ? (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-white shadow-[0_8px_24px_rgba(0,188,125,0.3)]">
                    Most Popular
                  </div>
                ) : null}

                <CardContent className="flex h-full flex-col px-5 py-6 sm:px-6 sm:py-7">
                  <div className="flex flex-1 flex-col">
                    <div
                      className={cn(
                        "mx-auto flex size-12 items-center justify-center rounded-xl",
                        iconStyles[styleKey]
                      )}
                    >
                      <Icon className="size-5" />
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-[1.75rem] font-medium text-white">
                        {plan.name}
                      </h3>
                      <div className="mt-5 flex items-end justify-center gap-1.5">
                        <span className="font-display text-5xl leading-none font-semibold tracking-[-0.05em] text-white">
                          ${plan.price}
                        </span>
                        <span className="pb-1 text-base text-slate-400">
                          /month
                        </span>
                      </div>
                      <p className="mx-auto mt-4 max-w-[16rem] text-sm leading-6 text-slate-400 sm:text-[0.95rem]">
                        {plan.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      variant={plan.featured ? "default" : "outline"}
                      className={cn(
                        "mt-8 w-full text-sm font-semibold",
                        buttonStyles[styleKey]
                      )}
                    >
                      <Link to="/partner-login">Get Started</Link>
                    </Button>

                    <div className="mt-8 border-t border-white/8 pt-7">
                      <ul className="space-y-4">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-slate-300"
                          >
                            <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                              <BadgeCheck className="size-3.5" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <p className="mt-18 text-center text-sm text-slate-400">
          Need a custom solution?{" "}
          <Link
            to="/partner-login"
            className="font-medium text-primary transition-colors hover:text-primary/85"
          >
            Contact our sales team
          </Link>
        </p>
      </div>
    </section>
  )
}
