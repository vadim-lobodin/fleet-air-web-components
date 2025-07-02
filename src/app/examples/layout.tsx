import React from "react"
import { PageTransition } from "@/components/ui/page-transition"
import { Typography } from "@/components/ui/typography"
import { FleetIcon } from "@/components/ui/icon"

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageTransition>
          <div className="desktop-only">{children}</div>
          <div className="mobile-only">
            <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-10rem)]">
              <FleetIcon fleet="error-outline" size="xl" className="mb-4 text-destructive" />
              <Typography variant="header-2-semibold">Mobile Not Supported</Typography>
              <Typography variant="default" className="text-muted-foreground mt-2 max-w-md">
                For the best experience, please view this page on a desktop device. The component galleries are not optimized for mobile view.
              </Typography>
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  )
}
