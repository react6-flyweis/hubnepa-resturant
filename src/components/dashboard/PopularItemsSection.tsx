import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"

export type PopularItem = {
  name: string
  ordersToday: number
  price: string
  image: string
}

interface PopularItemsSectionProps {
  items: PopularItem[]
}

export function PopularItemsSection({ items }: PopularItemsSectionProps) {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
        <CardTitle className="text-xl font-medium">Popular Items</CardTitle>
        <Button variant="ghost" size="sm" asChild className="h-7 text-primary">
          <Link to="/dashboard">View All</Link>
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={item.image} alt={item.name} />
                <AvatarFallback className="rounded-md">
                  {item.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-medium">
                  {item.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.ordersToday} orders today
                </div>
              </div>

              <div className="text-lg font-semibold">{item.price}</div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-6 w-full" asChild>
          <Link to="/dashboard">View Full Report</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
