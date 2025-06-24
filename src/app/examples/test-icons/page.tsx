"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { FleetIcon, LucideIcon } from "@/components/ui/icon"
import { useTheme } from "@/components/theme-provider"

export default function TestIconsPage() {
  const { theme } = useTheme()
  const [currentTheme, setCurrentTheme] = React.useState<string>("")
  const [documentClasses, setDocumentClasses] = React.useState<string>("")

  // Update theme info on client side
  React.useEffect(() => {
    const updateThemeInfo = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const isLight = document.documentElement.classList.contains('light')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      let resolvedTheme = 'unknown'
      if (isDark) resolvedTheme = 'dark'
      else if (isLight) resolvedTheme = 'light'
      else resolvedTheme = systemPrefersDark ? 'dark (system)' : 'light (system)'
      
      setCurrentTheme(resolvedTheme)
      setDocumentClasses(document.documentElement.className)
    }

    updateThemeInfo()

    // Listen for theme changes
    const observer = new MutationObserver(updateThemeInfo)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateThemeInfo)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', updateThemeInfo)
    }
  }, [])

  const testIcons = [
    'run',
    'terminal',
    'folder',
    'settings',
    'search',
    'user',
    'chevron-down',
    'ai/chat',
    'vcs/commit',
    'tools'
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Typography variant="header-1-semibold">Icon Debug Page</Typography>
        <Typography variant="default" className="text-muted-foreground">
          Test page to debug Fleet icon theme switching issues
        </Typography>
      </div>

      {/* Theme Debug Info */}
      <div className="space-y-4 p-6 border border-border rounded-lg bg-muted/20">
        <Typography variant="header-2-semibold">Theme Debug Info</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
             <Typography variant="default-semibold">Theme Provider State:</Typography>
             <Typography variant="code" className="block p-2 bg-background rounded border">
               {theme}
             </Typography>
           </div>
           
           <div className="space-y-2">
             <Typography variant="default-semibold">Resolved Theme:</Typography>
             <Typography variant="code" className="block p-2 bg-background rounded border">
               {currentTheme}
             </Typography>
           </div>
           
           <div className="space-y-2 md:col-span-2">
             <Typography variant="default-semibold">Document Classes:</Typography>
             <Typography variant="code" className="block p-2 bg-background rounded border">
               {documentClasses || 'Loading...'}
             </Typography>
           </div>
        </div>
      </div>

      {/* Fleet Icons Test Grid */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Fleet Icons Test</Typography>
        <Typography variant="small" className="text-muted-foreground">
          These icons should change color when switching themes. Dark icons in light theme, light icons in dark theme.
        </Typography>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {testIcons.map((iconName) => (
            <div
              key={iconName}
              className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <FleetIcon fleet={iconName} size="xl" />
              <Typography variant="code" className="text-xs text-center">
                {iconName}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Size Test */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Icon Sizes Test</Typography>
        <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="xs" />
            <Typography variant="code" className="text-xs">xs</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="sm" />
            <Typography variant="code" className="text-xs">sm</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="md" />
            <Typography variant="code" className="text-xs">md</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="lg" />
            <Typography variant="code" className="text-xs">lg</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="xl" />
            <Typography variant="code" className="text-xs">xl</Typography>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <FleetIcon fleet="run" size="2xl" />
            <Typography variant="code" className="text-xs">2xl</Typography>
          </div>
        </div>
      </div>

             {/* Lucide Icons Comparison */}
       <div className="space-y-4">
         <Typography variant="header-2-semibold">Lucide Icons (Should Use Current Color)</Typography>
         <Typography variant="small" className="text-muted-foreground">
           These Lucide icons should automatically adapt to the current text color.
         </Typography>
         
         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
           {['Play', 'Terminal', 'Folder', 'Settings', 'Search'].map((iconName) => (
             <div
               key={iconName}
               className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
             >
               <LucideIcon lucide={iconName as any} size="xl" />
               <Typography variant="code" className="text-xs text-center">
                 {iconName}
               </Typography>
             </div>
           ))}
         </div>
       </div>

       {/* Lucide Stroke Width Test */}
       <div className="space-y-4">
         <Typography variant="header-2-semibold">Lucide Stroke Width Test</Typography>
         <Typography variant="small" className="text-muted-foreground">
           Same icon with different stroke widths. Default is 1px for thin, clean lines.
         </Typography>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg">
             <LucideIcon lucide="Settings" size="xl" strokeWidth={0.5} />
             <Typography variant="code" className="text-xs text-center">
               strokeWidth={0.5}
             </Typography>
           </div>
           <div className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg">
             <LucideIcon lucide="Settings" size="xl" strokeWidth={1} />
             <Typography variant="code" className="text-xs text-center">
               strokeWidth={1} (default)
             </Typography>
           </div>
           <div className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg">
             <LucideIcon lucide="Settings" size="xl" strokeWidth={2} />
             <Typography variant="code" className="text-xs text-center">
               strokeWidth={2}
             </Typography>
           </div>
           <div className="flex flex-col items-center space-y-2 p-4 border border-border rounded-lg">
             <LucideIcon lucide="Settings" size="xl" strokeWidth={3} />
             <Typography variant="code" className="text-xs text-center">
               strokeWidth={3}
             </Typography>
           </div>
         </div>
       </div>

      {/* Instructions */}
      <div className="space-y-4 p-6 border border-border rounded-lg bg-accent/10">
        <Typography variant="header-3-semibold">Testing Instructions</Typography>
                 <div className="space-y-2">
           <Typography variant="default">
             1. Use the theme switcher in the header to change between light, dark, and system themes
           </Typography>
           <Typography variant="default">
             2. Fleet icons should change color to match the theme (dark icons on light background, light icons on dark background)
           </Typography>
           <Typography variant="default">
             3. Lucide icons should automatically use the current text color and support custom stroke widths
           </Typography>
           <Typography variant="default">
             4. Try different stroke widths for Lucide icons: strokeWidth={1} (default), strokeWidth={2} for thicker lines, etc.
           </Typography>
           <Typography variant="default">
             5. Check the browser console for any icon loading errors or debug messages
           </Typography>
         </div>
      </div>
    </div>
  )
} 