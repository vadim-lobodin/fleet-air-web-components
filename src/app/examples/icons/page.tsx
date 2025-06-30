"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { FleetIcon, LucideIcon } from "@/components/ui/icon"
import { getAllFleetIcons } from "@/lib/fleet-icons"

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
  const allFleetIcons = getAllFleetIcons()
  
  const filteredFleetIcons = allFleetIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLucideIcons = commonLucideIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
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
            <div
              key={iconPath}
              className="flex flex-col items-center p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
              title={iconPath}
              onClick={() => navigator.clipboard.writeText(`<FleetIcon fleet="${iconPath}" />`)}
            >
              <FleetIcon fleet={iconPath} size="md" className="mb-1" />
              <Typography variant="code" className="text-xs text-center truncate w-full">
                {iconPath.split('/').pop()}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">
          Lucide Icons {searchTerm && `(${filteredLucideIcons.length} results)`}
        </Typography>
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {filteredLucideIcons.map((iconName) => (
            <div
              key={iconName}
              className="flex flex-col items-center p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
              title={iconName}
              onClick={() => navigator.clipboard.writeText(`<LucideIcon lucide="${iconName}" />`)}
            >
              <LucideIcon lucide={iconName} size="md" className="mb-1" />
              <Typography variant="code" className="text-xs text-center truncate w-full">
                {iconName}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 