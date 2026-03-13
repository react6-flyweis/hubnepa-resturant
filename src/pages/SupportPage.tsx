import { useState } from "react"
import { Plus } from "lucide-react"

import { SupportTabs } from "@/components/support/SupportTabs"
import { SupportTicketsTab } from "@/components/support/SupportTicketsTab"
import { LiveChatTab } from "@/components/support/LiveChatTab"
import { FAQsTab } from "@/components/support/FAQsTab"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<string>("tickets")

  return (
    <div className="p-6">
      <PageHeader
        title="Support Center"
        description="Get help with technical issues or operational questions."
        right={
          <Button
            size="lg"
            className="h-10 rounded-lg bg-[#059669] px-4 text-white hover:bg-[#047857]"
          >
            <Plus className="size-4" />
            New Ticket
          </Button>
        }
      />

      <SupportTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "tickets" && <SupportTicketsTab />}
        {activeTab === "chat" && <LiveChatTab />}
        {activeTab === "faqs" && <FAQsTab />}
      </div>
    </div>
  )
}
