import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarDays, ChevronDown } from "lucide-react"
import type { TimeRange } from "@/types/reports"

export interface TimeRangeOption {
  value: TimeRange
  label: string
}

export const timeRangeOptions: TimeRangeOption[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
]

interface Props {
  selectedRange: TimeRange
  selectedRangeLabel: string
  onChange: (value: TimeRange) => void
}

export function TimeRangeMenu({
  selectedRange,
  selectedRangeLabel,
  onChange,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="h-10 min-w-[148px] justify-between rounded-xl border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-slate-400" />
            <span>{selectedRangeLabel}</span>
          </span>
          <ChevronDown className="size-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl">
        <DropdownMenuLabel>Time Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedRange}
          onValueChange={(value) => onChange(value as TimeRange)}
        >
          {timeRangeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
