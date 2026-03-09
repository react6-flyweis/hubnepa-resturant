import bgImage from "@/assets/bg-image.jpg"
import manageRestaurantImage from "@/assets/manage-resturant.jpg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Sparkles } from "lucide-react"
import { Link } from "react-router"

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "linear-gradient(0deg, #020618 0%, rgba(2, 6, 24, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl items-center px-6 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
          <Badge className="gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-[0.68rem] font-semibold tracking-[0.32em] text-primary uppercase shadow-[0_0_0_1px_rgba(0,188,125,0.1)]">
            <Sparkles className="size-3.5" />
            For Food Lovers & Creators
          </Badge>

          <div className="max-w-3xl space-y-5">
            <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              The Heart of <span className="text-primary">Good Food</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Connecting passionate chefs with hungry hearts. Whether
              you&apos;re here to serve or to savor, you&apos;ve found the right
              place.
            </p>
          </div>

          <Card className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0F172B99] py-0 text-left text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-3 lg:p-8">
              <div className="space-y-6 md:col-span-2">
                <CardHeader className="px-0 pt-0">
                  <Badge className="w-full justify-start gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase">
                    <ChefHat className="size-3.5" />
                    For Owners
                  </Badge>
                  <CardTitle className="pt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    Manage your Restaurant?
                  </CardTitle>
                </CardHeader>

                <CardContent className="max-w-xl px-0 pb-0 text-base leading-8 text-slate-300 sm:text-lg">
                  Streamline operations, track inventory, and grow your customer
                  base with our all-in-one management suite.
                </CardContent>

                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(0,188,125,0.28)] hover:bg-primary/90"
                >
                  <Link to="/partner-login">Partner Access</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -right-14 -bottom-14 size-60 overflow-hidden rounded-full">
                  <img
                    src={manageRestaurantImage}
                    alt="Restaurant owner dashboard preview"
                    className="blur-2xs h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
