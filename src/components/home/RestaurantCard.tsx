import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star } from "lucide-react"

export interface Restaurant {
  name: string
  category: string
  subcategory?: string
  time: string
  distance: string
  rating: number
  deliveryFee: string
  ratingsCount: string
  tags: string[]
  badge?: string
  image: string
  premium?: string
  minOrder?: string
}

export function RestaurantCard(props: Restaurant) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#0F172B] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      {/* top-left badge (exclusive partner etc) */}
      {props.badge ? (
        <div className="absolute top-3 left-3 rounded-full bg-[#00C484] px-2 py-1 text-xs font-medium text-white">
          {props.badge.toUpperCase()}
        </div>
      ) : null}

      {/* image with overlays */}
      <div className="relative">
        <img
          src={props.image}
          alt={props.name}
          className="h-40 w-full object-cover"
        />

        {/* time/distance overlay at bottom-left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          <Clock className="size-4" />
          <span>{props.time}</span>
          <span className="px-1">|</span>
          <MapPin className="size-4" />
          <span>{props.distance}</span>
        </div>

        {/* rating pill top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm text-slate-900">
          <span>{props.rating.toFixed(1)}</span>
          <Star className="size-4 text-yellow-400" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{props.name}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {props.category}
              {props.subcategory ? ` · ${props.subcategory}` : ""}
            </p>
          </div>

          {(props.premium || props.minOrder) && (
            <div className="text-right text-sm">
              {props.premium && (
                <div className="font-medium text-white">{props.premium}</div>
              )}
              {props.minOrder && (
                <div className="text-slate-400">Min. {props.minOrder}</div>
              )}
            </div>
          )}
        </div>

        <div className="mt-2">
          <div className="inline-flex items-center rounded-full bg-[#1E293B] px-3 py-1 text-sm text-slate-300">
            <span>{props.deliveryFee} Delivery</span>
            <span className="mx-1">·</span>
            <span>{props.ratingsCount} ratings</span>
          </div>
        </div>

        {props.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {props.tags.map((tag) => (
              <Badge key={tag} className="text-xs" variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full rounded-full"
        >
          View Menu
        </Button>
      </div>
    </div>
  )
}
