import React from "react"
import { PageTransition } from "@/components/ui/page-transition"

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageTransition>
          {children}
        </PageTransition>
      </div>
    </div>
  )
}
