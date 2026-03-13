import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type {
  SupportTicket,
  TicketPriority,
  TicketStatus,
} from "@/types/support"
import { Button } from "../ui/button"
import { Funnel, Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"

interface SupportTicketsTabProps {
  tickets?: SupportTicket[]
  searchQuery?: string
}

const defaultTickets: SupportTicket[] = [
  {
    id: "TCK-9921",
    subject: "Printer connectivity issue",
    priority: "High",
    status: "Open",
    lastUpdated: "2026-03-13T10:15:00Z",
  },
  {
    id: "TCK-9920",
    subject: "Request to add new menu category",
    priority: "Low",
    status: "Closed",
    lastUpdated: "2026-03-11T14:30:00Z",
  },
  {
    id: "TCK-9919",
    subject: "Payout discrepancy inquiry",
    priority: "Medium",
    status: "Resolved",
    lastUpdated: "2026-03-06T09:45:00Z",
  },
]

const priorityClassMap: Record<TicketPriority, string> = {
  High: "border-transparent bg-red-50 text-red-600",
  Medium: "border-transparent bg-amber-50 text-amber-600",
  Low: "border-transparent bg-blue-50 text-blue-600",
}

const statusClassMap: Record<TicketStatus, string> = {
  Open: "border-transparent bg-emerald-50 text-emerald-700",
  Closed: "border-transparent bg-slate-100 text-slate-600",
  Resolved: "border-transparent bg-blue-50 text-blue-700",
}

export function SupportTicketsTab({
  tickets = defaultTickets,
}: SupportTicketsTabProps) {
  const [searchQuery, setFilterQuery] = useState<string>("")

  const normalized = searchQuery.trim().toLowerCase()
  const visible = tickets.filter((t) => {
    return (
      normalized.length === 0 ||
      [t.id, t.subject, t.priority, t.status]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
  })

  return (
    <Card className="p-0">
      <CardHeader className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search tickets..."
              className="h-10 rounded-lg border-slate-200 bg-white pl-9 text-slate-600 placeholder:text-slate-400"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="text-slate-500 hover:text-slate-700"
          >
            <Funnel className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Ticket ID
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Subject
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Priority
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Last Updated
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((t) => (
              <TableRow key={t.id} className="border-slate-100">
                <TableCell className="px-6 py-4 text-sm font-medium text-slate-900">
                  {t.id}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600">
                  {t.subject}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-2 py-1 text-[11px] font-medium",
                      priorityClassMap[t.priority]
                    )}
                  >
                    {t.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-2 py-1 text-[11px] font-medium",
                      statusClassMap[t.status]
                    )}
                  >
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600">
                  {new Date(t.lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Link
                    to="#"
                    className="text-sm font-medium text-emerald-600 hover:underline"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {visible.length === 0 && (
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No tickets match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
