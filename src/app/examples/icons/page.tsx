"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { FleetIcon, LucideIcon } from "@/components/ui/icon"
import { getAllFleetIcons } from "@/lib/fleet-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle } from "lucide-react"

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

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [copiedText, setCopiedText] = React.useState<string | null>(null)
  const allFleetIcons = getAllFleetIcons()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const filteredFleetIcons = allFleetIcons.filter(icon =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLucideIcons = commonLucideIcons.filter(icon =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="header-1-semibold">Icons</Typography>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>
        </div>

        <Typography variant="default" className="text-muted-foreground">
          Fleet Air Web Components supports both Fleet icons (from the original Fleet design system)
          and Lucide icons (for rapid prototyping). All icons are available in multiple sizes and
          can be easily integrated into your components.
        </Typography>
      </div>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">
          Fleet Icons {searchTerm && `(${filteredFleetIcons.length} results)`}
        </Typography>
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {filteredFleetIcons.map((iconPath) => (
            <Tooltip key={iconPath}>
              <TooltipTrigger asChild>
                <div
                  className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer aspect-square"
                  onClick={() => handleCopy(`<FleetIcon fleet="${iconPath}" />`)}
                >
                  <FleetIcon fleet={iconPath} size="md" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{iconPath}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">
          Lucide Icons {searchTerm && `(${filteredLucideIcons.length} results)`}
        </Typography>
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {filteredLucideIcons.map((iconName) => (
            <Tooltip key={iconName}>
              <TooltipTrigger asChild>
                <div
                  className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer aspect-square"
                  onClick={() => handleCopy(`<LucideIcon lucide="${iconName}" />`)}
                >
                  <LucideIcon lucide={iconName} size="md" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{iconName}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
} 