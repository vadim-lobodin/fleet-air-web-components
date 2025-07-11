"use client"

import React, { useMemo, useCallback, useState, useDeferredValue } from "react"
import { Typography } from "@/components/ui/typography"
import { FleetIcon, LucideIcon } from "@/components/ui/icon"
import * as LucideIcons from "lucide-react"
import { getAllFleetIcons } from "@/lib/fleet-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle } from "lucide-react"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

// Common Lucide icons for prototyping
const commonLucideIcons = [
  "Home", "User", "Settings", "Search", "Plus", "Minus", "X", "Check",
  "ChevronDown", "ChevronUp", "ChevronLeft", "ChevronRight", "Menu",
  "MoreHorizontal", "MoreVertical", "Edit", "Trash2", "Download", "Upload",
  "File", "Folder", "FolderOpen", "Save", "Copy", "Clipboard", "Scissors",
  "Play", "Pause", "Square", "SkipForward", "SkipBack", "Volume2",
  "Heart", "Star", "Bookmark", "Share", "Link", "ExternalLink",
  "Mail", "Phone", "MessageCircle", "Bell", "Calendar", "Clock",
  "Eye", "EyeOff", "Lock", "Unlock", "Shield", "AlertTriangle",
  "Info", "CheckCircle", "XCircle", "AlertCircle", "HelpCircle",
  "Sun", "Moon", "Zap", "Wifi", "Battery", "Bluetooth"
] as const

const IconGrid = function IconGrid({ icons, onIconClick, type }: {
  icons: string[]
  onIconClick: (text: string) => void
  type: 'fleet' | 'lucide'
}) {
  return (
  <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
    {icons.map((iconPath) => (
      <Tooltip key={iconPath}>
        <TooltipTrigger asChild>
          <div
            className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer aspect-square"
            onClick={() => onIconClick(type === 'fleet' ? `<FleetIcon fleet="${iconPath}" />` : `<LucideIcon lucide="${iconPath}" />`)}
          >
            {type === 'fleet' ? (
              <FleetIcon fleet={iconPath} size="md" />
            ) : (
              <LucideIcon lucide={iconPath as keyof typeof LucideIcons} size="md" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{iconPath}</p>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
  )
};

const IconsPage = function IconsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const deferredSearchTerm = useDeferredValue(searchTerm)
  
  const allFleetIcons = useMemo(() => getAllFleetIcons(), [])

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }, [])

  const filteredFleetIcons = useMemo(() => 
    allFleetIcons.filter(icon =>
      icon.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ), [allFleetIcons, deferredSearchTerm]
  )

  const filteredLucideIcons = useMemo(() => 
    commonLucideIcons.filter(icon =>
      icon.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ), [deferredSearchTerm]
  )

  return (
    <TooltipProvider>
      {copiedText && (
        <Alert className="fixed top-4 right-4 w-auto max-w-sm z-50">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Copied to Clipboard!</AlertTitle>
          <AlertDescription>
            {copiedText}
          </AlertDescription>
        </Alert>
      )}
      <ExamplePageTemplate
        title="Icons"
        description="Fleet Air Web Components supports both Fleet icons (from the original Fleet design system) and Lucide icons (for rapid prototyping). All icons are available in multiple sizes and can be easily integrated into your components. This uses default-multiline for proper leading after H1."
      >
        <div className="flex items-center justify-end mb-6">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>

      <ExampleSectionCard title={`Fleet Icons ${searchTerm && `(${filteredFleetIcons.length} results)`}`}>
        <IconGrid icons={filteredFleetIcons} onIconClick={handleCopy} type="fleet" />
      </ExampleSectionCard>

      <ExampleSectionCard title={`Lucide Icons ${searchTerm && `(${filteredLucideIcons.length} results)`}`}>
        <IconGrid icons={filteredLucideIcons} onIconClick={handleCopy} type="lucide" />
      </ExampleSectionCard>
    </ExamplePageTemplate>
    </TooltipProvider>
  )
}

export default IconsPage 