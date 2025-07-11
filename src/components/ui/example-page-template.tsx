import * as React from "react"
import { Typography } from "./typography"
import { cn } from "@/lib/utils"

interface ExamplePageTemplateProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  showBackToTop?: boolean
}

export const ExamplePageTemplate = React.forwardRef<
  HTMLDivElement,
  ExamplePageTemplateProps
>(({ title, description, children, className, showBackToTop = false, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-12 bg-[var(--fleet-background-primary)]", className)} {...props}>
      {/* Page Header */}
      <div className="mb-8">
        <Typography variant="header-1-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="default-multiline" className="mt-2" style={{ color: 'var(--fleet-text-secondary)' }}>
            {description}
          </Typography>
        )}
      </div>

      {/* Page Content */}
      <div className="space-y-12">
        {children}
      </div>

      {/* Back to Top (optional) */}
      {showBackToTop && (
        <div className="pt-8 border-t border-[var(--fleet-border-primary)]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[var(--fleet-text-primary)] transition-colors"
            style={{ color: 'var(--fleet-text-secondary)' }}
          >
            <Typography variant="default">
              ↑ Back to top
            </Typography>
          </button>
        </div>
      )}
    </div>
  )
})

ExamplePageTemplate.displayName = "ExamplePageTemplate"