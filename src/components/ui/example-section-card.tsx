import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Typography } from "./typography"

interface ExampleSectionCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title?: string
  description?: string
  children: React.ReactNode
}

export const ExampleSectionCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  ExampleSectionCardProps
>(({ title, description, children, className, ...props }, ref) => (
  <Card ref={ref} className={className} {...props}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle><Typography variant="header-2-semibold">{title}</Typography></CardTitle>}
        {description && <Typography variant="default" className="mt-2" style={{ color: 'var(--fleet-text-secondary)' }}>{description}</Typography>}
      </CardHeader>
    )}
    <CardContent>
      {children}
    </CardContent>
  </Card>
))

ExampleSectionCard.displayName = "ExampleSectionCard"
