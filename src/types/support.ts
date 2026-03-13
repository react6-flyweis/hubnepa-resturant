export type TicketPriority = "High" | "Medium" | "Low"
export type TicketStatus = "Open" | "Closed" | "Resolved"

export interface SupportTicket {
  id: string
  subject: string
  priority: TicketPriority
  status: TicketStatus
  lastUpdated: string // ISO date string
}
