import insightImage from "@/assets/insight.jpg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Store } from "lucide-react"
import { Link } from "react-router"

const insightPoints = [
  "Live sales tracking and forecasting",
  "Inventory management with low-stock alerts",
  "Staff performance monitoring",
  "Customer feedback aggregation",
]

export default function InsightsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0F172B] px-6 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(8,92,113,0.32),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(21,44,111,0.78),transparent_34%),linear-gradient(90deg,#0A163D_0%,#041030_45%,#042239_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="max-w-2xl">
            <Badge className="gap-2 rounded-full border border-primary/15 bg-[#063F4B]/45 px-4 py-1.5 text-sm font-medium text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <Store className="size-4" />
              Restaurant Owners
            </Badge>

            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] font-semibold tracking-[-0.05em] text-white lg:text-6xl">
              <span className="block">Real-time insights</span>
              <span className="block">at your fingertips</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-6 text-slate-400 md:text-lg">
              Stop guessing and start knowing. Our powerful dashboard gives you
              a live view of your restaurant&apos;s performance, from sales
              velocity to inventory levels.
            </p>

            <ul className="mt-10 space-y-3 text-base text-slate-200 sm:text-lg lg:text-[1.05rem]">
              {insightPoints.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10 text-primary shadow-[0_0_0_3px_rgba(0,188,125,0.06)]">
                    <CheckCircle2 className="size-4 stroke-3" />
                  </span>
                  <span className="leading-8 text-slate-200">{point}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-12 h-14 rounded-full bg-primary px-8 text-base font-semibold text-[#042519] shadow-[0_18px_38px_rgba(0,188,125,0.35)] hover:bg-primary/90"
            >
              <Link to="/">Explore Now</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(0,188,125,0.08),transparent_62%)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/20 shadow-[0_28px_90px_rgba(0,0,0,0.46)]">
              <div className="aspect-[16/10] w-full">
                <img
                  src={insightImage}
                  alt="Restaurant dashboard insight preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
