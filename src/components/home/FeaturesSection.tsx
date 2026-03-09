import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router"
import { MapPin, Smartphone, Star, type LucideIcon } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: LucideIcon
  href: string
  linkLabel: string
  /**
   * Tailwind color (e.g. "orange-500"). Used for icon and link.
   * If omitted, the primary color is used.
   */
  color?: string
}

const accolades = [
  "Michelin Stars",
  "Eater Approved",
  "James Beard Foundation",
  "Zagat Rated",
  "Bon Appetit",
]

const features: Feature[] = [
  {
    title: "Local Discovery",
    description:
      "Find hidden gems and top-rated spots in your neighborhood with our smart discovery engine.",
    icon: MapPin,
    href: "/restaurants",
    linkLabel: "Browse Restaurants →",
    color: "orange-500",
  },
  {
    title: "Smart Management",
    description:
      "Restaurants get a powerful tablet dashboard to manage orders, inventory, and staff in real-time.",
    icon: Smartphone,
    href: "/features",
    linkLabel: "See Features →",
    color: "green-500",
  },
  {
    title: "Verified Reviews",
    description:
      "Authentic feedback from real customers helps diners choose better and restaurants improve faster.",
    icon: Star,
    href: "/reviews",
    linkLabel: "Read Reviews →",
    color: "yellow-400",
  },
]

export default function FeaturesSection() {
  return (
    <div className="bg-[#020618]">
      <div className="overflow-hidden bg-[#0F172B80]">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-6 py-8 sm:px-8 lg:flex-nowrap lg:justify-between lg:px-10">
          {accolades.map((accolade) => (
            <p
              key={accolade}
              className="font-display text-xl font-semibold tracking-[-0.03em] text-slate-400/85 sm:text-2xl"
            >
              {accolade}
            </p>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden px-6 py-16 text-white sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-20 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]">
              A complete ecosystem for food lovers
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Whether you&apos;re ordering dinner or serving it, we&apos;ve
              built the tools to make the experience seamless.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              // define explicit classes for known colors so Tailwind can pick them up
              const colorClasses: Record<string, { bg: string; text: string }> =
                {
                  "orange-500": {
                    bg: "bg-orange-500/10",
                    text: "text-orange-500",
                  },
                  "green-500": {
                    bg: "bg-green-500/10",
                    text: "text-green-500",
                  },
                  "yellow-400": {
                    bg: "bg-yellow-400/10",
                    text: "text-yellow-400",
                  },
                }
              const classes = feature.color ? colorClasses[feature.color] : null

              return (
                <Card
                  key={feature.title}
                  className="rounded-lg border border-white/10 bg-[#0F172B99]"
                >
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <div>
                      <div
                        className={cn(
                          "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                          classes
                            ? `${classes.bg} ${classes.text}`
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        <Icon className="size-6" />
                      </div>

                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-300">
                        {feature.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      variant="link"
                      className={cn(
                        "mt-4 p-0 hover:underline",
                        classes ? classes.text : "text-primary"
                      )}
                    >
                      <Link to={feature.href}>{feature.linkLabel}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
