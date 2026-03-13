import { Home, MapPin, Phone, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type LocationStatus = "Active" | "Maintenance"

type LocationItem = {
  id: string
  name: string
  address: string
  phone: string
  status: LocationStatus
}

const locationStatusColorMap: Record<LocationStatus, string> = {
  Active: "border-transparent bg-emerald-50 text-emerald-700",
  Maintenance: "border-transparent bg-amber-50 text-amber-700",
}

const locations: LocationItem[] = [
  {
    id: "hq",
    name: "Downtown HQ",
    address: "123 Main St, New York, NY",
    phone: "+1 (555) 123-4567",
    status: "Active",
  },
  {
    id: "westside",
    name: "Westside Branch",
    address: "456 West Ave, New York, NY",
    phone: "+1 (555) 987-6543",
    status: "Active",
  },
  {
    id: "brooklyn",
    name: "Brooklyn Hub",
    address: "789 Park Slope, Brooklyn, NY",
    phone: "+1 (555) 456-7890",
    status: "Maintenance",
  },
]

function LocationCard({ location }: { location: LocationItem }) {
  return (
    <Card className="">
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Home className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {location.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              <MapPin className="inline-block size-4 align-text-bottom" />
              <span className="ml-1">{location.address}</span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              <Phone className="inline-block size-4 align-text-bottom" />
              <span className="ml-1">{location.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium",
              locationStatusColorMap[location.status]
            )}
          >
            {location.status}
          </Badge>

          <Button variant="outline" size="sm" className="ml-auto">
            View Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AddLocationCard() {
  return (
    <Card className="rounded-xl border border-dashed border-slate-200 bg-slate-50 shadow-none">
      <CardContent className="grid h-full place-items-center gap-2 py-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-slate-200 bg-white text-slate-500">
          <Plus className="size-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">
            Add New Location
          </p>
          <p className="text-sm text-slate-500">Expand your business</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function LocationsSettingsTab() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
      <AddLocationCard />
    </div>
  )
}
