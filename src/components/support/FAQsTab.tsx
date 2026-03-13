import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const faqData: FAQSection[] = [
  {
    title: "Menu & Orders",
    items: [
      {
        id: "menu-1",
        question: "How do I mark an item as sold out?",
        answer:
          "To mark an item as sold out, go to your Menu Management page, find the item you want to mark as unavailable, and toggle the 'Available' switch to off. This will immediately hide the item from customer view and prevent new orders for that item.",
      },
      {
        id: "menu-2",
        question: "Can I cancel an order after accepting?",
        answer:
          "Yes, you can cancel an order after accepting it, but this should be done sparingly as it affects customer experience. Go to the Order Management page, find the order, and click 'Cancel Order'. The customer will be automatically refunded, and they'll receive a notification about the cancellation.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        id: "payments-1",
        question: "When are payouts processed?",
        answer:
          "Payouts are processed twice weekly - on Tuesdays and Fridays. All orders completed by 11:59 PM on the processing day will be included in that payout. Funds typically arrive in your bank account within 1-2 business days after processing.",
      },
      {
        id: "payments-2",
        question: "How do I update bank details?",
        answer:
          "To update your bank details, go to Settings > Payment Settings > Bank Account Information. You'll need to verify the new account with micro-deposits, which typically takes 1-2 business days. For security reasons, you may need to re-verify your identity when changing bank details.",
      },
    ],
  },
]

export function FAQsTab() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="space-y-8">
      {faqData.map((section) => (
        <div key={section.title}>
          <h2 className="mb-6 font-display text-2xl font-semibold text-slate-900">
            {section.title}
          </h2>

          <div className="space-y-4">
            {section.items.map((item) => {
              const isExpanded = expandedItems.has(item.id)

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="pr-4 text-lg font-medium text-slate-900">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                        isExpanded && "rotate-180 transform"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-slate-100 pt-2">
                        <p className="leading-relaxed text-slate-600">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
