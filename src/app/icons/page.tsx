"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { Icon, FleetIcon, LucideIcon } from "@/components/ui/icon"
import { CommonFleetIcons, getAllFleetIcons } from "@/lib/fleet-icons"
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
  const [selectedCategory, setSelectedCategory] = React.useState<"fleet" | "lucide" | "all">("all")
  
  const allFleetIcons = getAllFleetIcons()
  
  const filteredFleetIcons = allFleetIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredLucideIcons = commonLucideIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <Typography variant="header-3-semibold" className="mb-4">
          Icon System
        </Typography>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === "all" 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/50"
            }`}
          >
            All Icons ({allFleetIcons.length + commonLucideIcons.length})
          </button>
          <button
            onClick={() => setSelectedCategory("fleet")}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === "fleet" 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/50"
            }`}
          >
            Fleet Icons ({allFleetIcons.length})
          </button>
          <button
            onClick={() => setSelectedCategory("lucide")}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === "lucide" 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/50"
            }`}
          >
            Lucide Icons ({commonLucideIcons.length})
          </button>
        </div>
      </div>

      <div>
        <Typography variant="header-3-semibold" className="mb-4">
          Common Fleet Icons
        </Typography>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(CommonFleetIcons).map(([key, iconPath]) => (
            <div
              key={key}
              className="flex flex-col items-center p-2 rounded-md hover:bg-accent/50 transition-colors"
              title={iconPath}
            >
              <FleetIcon fleet={iconPath} size="md" className="mb-1" />
              <Typography variant="code" className="text-xs text-center">
                {key}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const mainContent = (
    <div className="space-y-8">
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
          can be easily integrated into your components. Lucide icons support custom stroke widths 
          for fine-tuning the visual weight.
        </Typography>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Usage Examples</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 border border-border rounded-lg">
            <Typography variant="header-3-semibold">Fleet Icons</Typography>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FleetIcon fleet="run" size="sm" />
                <Typography variant="code">{"<FleetIcon fleet=\"run\" size=\"sm\" />"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <FleetIcon fleet="ai/chat" size="md" />
                <Typography variant="code">{"<FleetIcon fleet=\"ai/chat\" size=\"md\" />"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <FleetIcon fleet="vcs/commit" size="lg" />
                <Typography variant="code">{"<FleetIcon fleet=\"vcs/commit\" size=\"lg\" />"}</Typography>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 border border-border rounded-lg">
            <Typography variant="header-3-semibold">Lucide Icons</Typography>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Home" size="sm" />
                <Typography variant="code">{"<LucideIcon lucide=\"Home\" size=\"sm\" />"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Settings" size="md" />
                <Typography variant="code">{"<LucideIcon lucide=\"Settings\" size=\"md\" />"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Star" size="lg" />
                <Typography variant="code">{"<LucideIcon lucide=\"Star\" size=\"lg\" />"}</Typography>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 border border-border rounded-lg">
            <Typography variant="header-3-semibold">Lucide Stroke Width</Typography>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Settings" size="md" strokeWidth={1} />
                <Typography variant="code">{"<LucideIcon lucide=\"Settings\" strokeWidth={1} /> (default)"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Settings" size="md" strokeWidth={2} />
                <Typography variant="code">{"<LucideIcon lucide=\"Settings\" strokeWidth={2} />"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon lucide="Settings" size="md" strokeWidth={3} />
                <Typography variant="code">{"<LucideIcon lucide=\"Settings\" strokeWidth={3} />"}</Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 border border-border rounded-lg">
          <Typography variant="header-3-semibold">Unified Icon Component</Typography>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon fleet="terminal" size="md" />
              <Typography variant="code">{"<Icon fleet=\"terminal\" size=\"md\" />"}</Typography>
            </div>
            <div className="flex items-center space-x-2">
              <Icon lucide="Terminal" size="md" />
              <Typography variant="code">{"<Icon lucide=\"Terminal\" size=\"md\" />"}</Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Sizes */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Icon Sizes</Typography>
        <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="xs" />
            <Typography variant="code">xs</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="sm" />
            <Typography variant="code">sm</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="md" />
            <Typography variant="code">md</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="lg" />
            <Typography variant="code">lg</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="xl" />
            <Typography variant="code">xl</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="2xl" />
            <Typography variant="code">2xl</Typography>
          </div>
        </div>
      </div>

      {/* Fleet Icons Grid */}
      {(selectedCategory === "all" || selectedCategory === "fleet") && (
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
      )}

      {/* Lucide Icons Grid */}
      {(selectedCategory === "all" || selectedCategory === "lucide") && (
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
      )}
    </div>
  )

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card overflow-auto p-6">
        {sidebarContent}
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {mainContent}
      </div>
    </div>
  )
} 