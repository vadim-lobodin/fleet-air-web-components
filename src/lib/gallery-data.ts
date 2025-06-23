import { ReactNode } from "react"

export interface GalleryItem {
  name: string
  description?: string
  component: ReactNode
  sourceCode?: string
  preferredHeight?: number
}

export interface GallerySection {
  name: string
  items: GalleryItem[]
}

export const galleryData: GallerySection[] = [
  {
    name: "Typography",
    items: [
      {
        name: "Headers",
        description: "Fleet Air header typography variants",
        component: null, // Will be filled in the page component
      },
      {
        name: "Body Text",
        description: "Default text styles for body content",
        component: null,
      },
      {
        name: "Medium & Small Text",
        description: "Secondary text sizes for UI elements",
        component: null,
      },
      {
        name: "Code Text",
        description: "Monospace typography for code display",
        component: null,
      },
    ],
  },
  {
    name: "Theme Integration",
    items: [
      {
        name: "Color System",
        description: "shadcn/ui color integration with Fleet Air",
        component: null,
      },
      {
        name: "Dark Mode",
        description: "Theme-aware typography adjustments",
        component: null,
      },
    ],
  },
] 