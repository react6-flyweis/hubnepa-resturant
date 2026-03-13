import { type ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  /**
   * Optional content rendered on the right side of the header. Useful for status indicators,
   * actions, or timestamps like "last updated". You can pass a simple string or a React node
   * with icons, etc.
   */
  right?: ReactNode
}

export function PageHeader({ title, description, right }: PageHeaderProps) {
  return (
    <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
      <div>
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-1 text-lg text-gray-600">{description}</p>
        )}
      </div>
      {right && (
        <div className="flex items-center text-sm text-gray-500">{right}</div>
      )}
    </div>
  )
}
