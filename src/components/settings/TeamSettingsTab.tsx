import { useState } from "react"
import { Settings, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type TeamMemberRole = "Owner" | "Manager" | "Staff"

type TeamMember = {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  avatar: string
  accessLevel: string
  active: boolean
}

const roleColorMap: Record<TeamMemberRole, string> = {
  Owner: "bg-slate-100 text-slate-700 border-slate-200",
  Manager: "bg-slate-100 text-slate-700 border-slate-200",
  Staff: "bg-slate-100 text-slate-700 border-slate-200",
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@goldenspoon.com",
    role: "Owner",
    avatar: "https://i.pravatar.cc/150?img=12",
    accessLevel: "Full Access",
    active: true,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@goldenspoon.com",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?img=47",
    accessLevel: "Orders, Menu, Reports",
    active: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@goldenspoon.com",
    role: "Staff",
    avatar: "https://i.pravatar.cc/150?img=53",
    accessLevel: "Orders Only",
    active: true,
  },
]

const switchColorMap = {
  enabled: {
    track: "bg-emerald-600",
    thumb: "translate-x-[22px] bg-white",
  },
  disabled: {
    track: "bg-slate-300",
    thumb: "translate-x-0 bg-white",
  },
} as const

function MemberToggle({
  checked,
  onCheckedChange,
  memberId,
}: {
  checked: boolean
  onCheckedChange: (id: string) => void
  memberId: string
}) {
  const colorKey = checked ? "enabled" : "disabled"
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle member access"
      onClick={() => onCheckedChange(memberId)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        switchColorMap[colorKey].track
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform",
          switchColorMap[colorKey].thumb
        )}
      />
    </button>
  )
}

function TeamMemberRow({
  member,
  onToggle,
}: {
  member: TeamMember
  onToggle: (id: string) => void
}) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <Avatar className="size-12 shrink-0">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback className="bg-slate-200 text-sm font-medium text-slate-600">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 font-display">
          <span className="text-sm font-semibold text-slate-800">
            {member.name}
          </span>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", roleColorMap[member.role])}
          >
            {member.role}
          </Badge>
        </div>
        <span className="text-sm text-slate-500">{member.email}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden flex-col items-end sm:flex">
          <span className="text-xs font-semibold text-slate-700">
            Access Level
          </span>
          <span className="text-sm text-slate-500">{member.accessLevel}</span>
        </div>

        <MemberToggle
          checked={member.active}
          onCheckedChange={onToggle}
          memberId={member.id}
        />

        <button
          type="button"
          aria-label={`Settings for ${member.name}`}
          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <Settings className="size-5" />
        </button>
      </div>
    </div>
  )
}

export function TeamSettingsTab() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers)

  function handleToggle(id: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <div>
          <CardTitle className="font-display text-xl font-semibold text-slate-800">
            Team Management
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Control who has access to your restaurant dashboard.
          </p>
        </div>
        <Button className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-700">
          <UserPlus className="size-4" />
          Invite Member
        </Button>
      </CardHeader>

      <CardContent className="">
        {members.map((member) => (
          <TeamMemberRow
            key={member.id}
            member={member}
            onToggle={handleToggle}
          />
        ))}
      </CardContent>
    </Card>
  )
}
