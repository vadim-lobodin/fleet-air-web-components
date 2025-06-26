"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

// Icon size variants
const iconVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4", 
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  lucide?: keyof typeof LucideIcons
  fleet?: string
  strokeWidth?: number | string
}

// Helper function to process SVG content for responsive sizing (Fleet icons keep original colors)
function processFleetSvgContent(svgContent: string): string {
  // Only make Fleet icons responsive, preserve their original colors
  const processed = svgContent
    .replace(/<svg([^>]*)>/i, (match, attributes) => {
      // Ensure the SVG has proper attributes for responsive sizing
      const hasViewBox = /viewBox=/.test(attributes)
      
      let newAttributes = attributes
      
      // Remove fixed width/height if viewBox exists
      if (hasViewBox) {
        newAttributes = newAttributes
          .replace(/width="[^"]*"/g, '')
          .replace(/height="[^"]*"/g, '')
      }
      
      // Add responsive attributes and proper alignment for Fleet icons
      newAttributes += ' width="100%" height="100%" style="display: block;"'
      
      return `<svg${newAttributes}>`
    })
  
  return processed
}



// Fleet Icon Component - loads SVG icons from Fleet icon system
export const FleetIcon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ className, size, fleet, ...props }, ref) => {
    const [svgContent, setSvgContent] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    // Function to get current theme
    const getCurrentTheme = React.useCallback(() => {
      // Check if dark class is present on document element
      if (document.documentElement.classList.contains('dark')) {
        return 'dark'
      }
      
      // Check if light class is present on document element
      if (document.documentElement.classList.contains('light')) {
        return 'light'
      }
      
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }, [])

    React.useEffect(() => {
      if (!fleet) return

      const loadIcon = async () => {
        setIsLoading(true)
        setError(null)
        
        try {
          const theme = getCurrentTheme()
          const iconPath = fleet.includes('/') ? fleet : fleet
          
          console.log(`Loading Fleet icon: ${iconPath} in ${theme} theme`)
          
          // Try the theme-specific icon first
          let response = await fetch(`/icons/${theme}/${iconPath}.svg`)
          
          // If theme-specific icon doesn't exist, fall back to light theme
          if (!response.ok && theme === 'dark') {
            console.log(`Dark theme icon not found, falling back to light theme for: ${iconPath}`)
            response = await fetch(`/icons/light/${iconPath}.svg`)
          }
          
          if (!response.ok) {
            throw new Error(`Failed to load icon: ${fleet} (tried ${theme} theme)`)
          }
          
          const svgText = await response.text()
          const processedSvg = processFleetSvgContent(svgText)
          setSvgContent(processedSvg)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load icon")
          console.warn(`Fleet icon not found: ${fleet}`, err)
        } finally {
          setIsLoading(false)
        }
      }

      loadIcon()

      // Listen for theme changes to reload icons
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement
            if (target === document.documentElement && 
                (target.classList.contains('dark') || target.classList.contains('light'))) {
              console.log('Theme change detected, reloading Fleet icons')
              loadIcon()
            }
          }
        })
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })

      // Also listen for system theme changes (for when theme is set to 'system')
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleThemeChange = () => {
        // Only reload if we're using system theme (no explicit light/dark class)
        if (!document.documentElement.classList.contains('dark') && 
            !document.documentElement.classList.contains('light')) {
          console.log('System theme change detected, reloading Fleet icons')
          loadIcon()
        }
      }
      mediaQuery.addEventListener('change', handleThemeChange)

      return () => {
        observer.disconnect()
        mediaQuery.removeEventListener('change', handleThemeChange)
      }
    }, [fleet, getCurrentTheme])

    if (isLoading) {
      return (
        <div 
          ref={ref}
          className={cn(iconVariants({ size }), "animate-pulse bg-muted rounded", className)}
          {...props}
        />
      )
    }

    if (error || !svgContent) {
      return (
        <div 
          ref={ref}
          className={cn(iconVariants({ size }), "bg-destructive/20 rounded flex items-center justify-center", className)}
          title={error || `Icon not found: ${fleet}`}
          {...props}
        >
          <span className="text-xs text-destructive">?</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        {...props}
      />
    )
  }
)
FleetIcon.displayName = "FleetIcon"

// Lucide Icon Component - wrapper for Lucide React icons
export const LucideIcon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ className, size, lucide, strokeWidth = 1, ...props }, ref) => {
    if (!lucide || !(lucide in LucideIcons)) {
      console.warn(`Lucide icon not found: ${lucide}`)
      return (
        <div 
          ref={ref}
          className={cn(iconVariants({ size }), "bg-destructive/20 rounded flex items-center justify-center", className)}
          title={`Lucide icon not found: ${lucide}`}
          {...props}
        >
          <span className="text-xs text-destructive">?</span>
        </div>
      )
    }

    const IconComponent = LucideIcons[lucide] as React.ComponentType<LucideIcons.LucideProps>

    return (
      <div ref={ref} className={cn(iconVariants({ size }), "text-foreground", className)} {...props}>
        <IconComponent className="w-full h-full" strokeWidth={strokeWidth} />
      </div>
    )
  }
)
LucideIcon.displayName = "LucideIcon"

// Unified Icon Component - can handle both Fleet and Lucide icons
export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ fleet, lucide, strokeWidth, ...props }, ref) => {
    if (fleet) {
      return <FleetIcon ref={ref} fleet={fleet} {...props} />
    }
    
    if (lucide) {
      return <LucideIcon ref={ref} lucide={lucide} strokeWidth={strokeWidth} {...props} />
    }

    console.warn("Icon component requires either 'fleet' or 'lucide' prop")
    return null
  }
)
Icon.displayName = "Icon"

// Export icon variants for external use
export { iconVariants } 