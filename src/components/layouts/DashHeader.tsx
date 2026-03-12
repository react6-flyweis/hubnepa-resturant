import { Bell, Search } from "lucide-react"
import { Link, useLocation } from "react-router"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface User {
  name: string
  role: string
  avatarUrl?: string
}

/**
 * Header shown on dashboard pages. Includes a search box, notification
 * bell with badge, and user information (name, role, avatar).
 */
export default function DashHeader() {
  const location = useLocation()

  // TODO: replace with real user data when available
  const user: User = {
    name: "Sarah Chen",
    role: "Manager",
    avatarUrl: "/avatar-placeholder.png",
  }

  const isNotificationsPage = location.pathname === "/dashboard/notifications"

  return (
    <header className="flex w-full items-center justify-between bg-white px-6 py-4 shadow">
      {/* sidebar toggle (visible on small screens) */}
      <div className="mr-4 md:hidden">
        <SidebarTrigger />
      </div>

      {/* search */}
      <div className="max-w-md flex-1">
        <InputGroup className="h-10 w-full rounded-full border bg-gray-100 px-3">
          <InputGroupAddon align="inline-start" className="pr-2">
            <Search className="h-4 w-4 text-gray-500" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 placeholder:text-gray-500"
          />
        </InputGroup>
      </div>

      {/* right side - notifications + profile */}
      <div className="flex items-center space-x-6">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn(
            "relative rounded-full text-gray-600 hover:bg-gray-100",
            isNotificationsPage &&
              "bg-primary/10 text-primary hover:bg-primary/15"
          )}
        >
          <Link to="/dashboard/notifications" aria-label="View notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Link>
        </Button>

        <div className="h-6 w-px bg-gray-300" />

        <Link to="/profile" className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <Avatar className="h-8 w-8">
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            )}
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
