"use client";

import React, { useState } from "react";
import { Button, ToggleButton, SplitButton, MenuButton } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function ButtonsPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Buttons
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Complete Fleet button gallery with all variants, sizes, states, and combinations
        </Typography>
      </div>

      <div className="space-y-12">
        
        {/* Primary Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Primary Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Primary action buttons in large, default, and small sizes with all state combinations
          </Typography>
          <ButtonCombinations variant="primary" />
        </section>

        {/* Secondary Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Secondary Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Default Fleet buttons (secondary style) in all sizes and states
          </Typography>
          <ButtonCombinations variant="secondary" />
        </section>

        {/* Dangerous Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Dangerous Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Destructive action buttons for delete, remove, and other dangerous operations
          </Typography>
          <ButtonCombinations variant="dangerous" />
        </section>

        {/* Positive Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Positive Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Accept, approve, and other positive action buttons
          </Typography>
          <ButtonCombinations variant="positive" />
        </section>

        {/* Warning Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Warning Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Warning and caution action buttons
          </Typography>
          <ButtonCombinations variant="warning" />
        </section>

        {/* AI Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">AI Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Special AI-themed buttons for AI features and actions
          </Typography>
          <ButtonCombinations variant="ai" />
        </section>

        {/* Toggle Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Toggle Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons that can be selected/unselected with state persistence
          </Typography>
          <ToggleButtonExamples />
        </section>

        {/* Ghost Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Ghost Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Transparent buttons for subtle actions and icon buttons
          </Typography>
          <GhostButtonExamples />
        </section>

        {/* Split Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Split Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons with primary action and dropdown menu for additional actions
          </Typography>
          <SplitButtonExamples />
        </section>

        {/* Menu Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Menu Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons that open dropdown menus with multiple actions
          </Typography>
          <MenuButtonExamples />
        </section>

        {/* Pill Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Pill Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Rounded pill-style buttons for tags, filters, and compact actions
          </Typography>
          <PillButtonExamples />
        </section>

        {/* Tile Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Tile Buttons</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Large tile-style buttons for prominent actions and navigation
          </Typography>
          <TileButtonExamples />
        </section>

        {/* Loading States */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Loading States</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons with loading spinners and custom loading text
          </Typography>
          <LoadingButtonExamples />
        </section>

        {/* Icon Positioning */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Icon Positioning</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons with icons on left, right, or icon-only configurations
          </Typography>
          <IconButtonExamples />
        </section>

        {/* Hint Text */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Hint Text</Typography>
          <Typography variant="small" className="text-muted-foreground">
            Buttons with keyboard shortcuts and additional hint information
          </Typography>
          <HintTextExamples />
        </section>

      </div>
    </div>
  );
}

// Button Combinations Component (matches Fleet gallery layout)
function ButtonCombinations({ variant }: { variant: "primary" | "secondary" | "dangerous" | "positive" | "warning" | "ai" | "ghost" | "link" | "pill" | "tile" }) {
  const sizes = [
    { name: "Large", size: "lg" as const },
    { name: "Default", size: "default" as const },
    { name: "Small", size: "sm" as const },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {sizes.map((sizeInfo) => (
          <div key={sizeInfo.size} className="space-y-4">
            <Typography variant="code" className="text-xs">{sizeInfo.name}</Typography>
            <div className="space-y-2">
              {/* Enabled */}
              <Button variant={variant} size={sizeInfo.size}>Text</Button>
              {/* Disabled */}
              <Button variant={variant} size={sizeInfo.size} disabled>Text</Button>
            </div>
          </div>
        ))}
        {/* Loading state */}
        <div className="space-y-4">
          <Typography variant="code" className="text-xs">Loading</Typography>
          <div className="space-y-2">
            <Button variant={variant} isLoading loadingText="Loading…">Text</Button>
            <Button variant={variant} isLoading disabled>Text</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toggle Button Examples
function ToggleButtonExamples() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  return (
    <div className="flex gap-4 items-center">
      <div className="space-y-2">
        <Typography variant="code" className="text-xs">Interactive</Typography>
        <ToggleButton 
          selected={selected1} 
          onClick={() => setSelected1(!selected1)}
        >
          Toggle Me
        </ToggleButton>
      </div>
      <div className="space-y-2">
        <Typography variant="code" className="text-xs">Selected</Typography>
        <ToggleButton 
          selected={selected2} 
          onClick={() => setSelected2(!selected2)}
        >
          Selected
        </ToggleButton>
      </div>
      <div className="space-y-2">
        <Typography variant="code" className="text-xs">Disabled Off</Typography>
        <ToggleButton selected={false} disabled>Disabled</ToggleButton>
      </div>
      <div className="space-y-2">
        <Typography variant="code" className="text-xs">Disabled On</Typography>
        <ToggleButton selected={true} disabled>Disabled</ToggleButton>
      </div>
    </div>
  );
}

// Ghost Button Examples
function GhostButtonExamples() {
  return (
    <div className="space-y-6">
      {[
        { name: "Default", size: "default" as const },
        { name: "Large", size: "lg" as const },
        { name: "Small", size: "sm" as const },
        { name: "Icon", size: "icon" as const },
      ].map((sizeInfo) => (
        <div key={sizeInfo.size} className="flex gap-4 items-center">
          <Typography variant="code" className="w-14 text-xs">{sizeInfo.name}</Typography>
          <Button variant="ghost" size={sizeInfo.size}>⚙</Button>
          <Button variant="ghost" size={sizeInfo.size} disabled>⚙</Button>
          {sizeInfo.size !== "icon" && (
            <>
              <Button variant="ghost" size={sizeInfo.size} iconLeft="⚙">Label</Button>
              <Button variant="ghost" size={sizeInfo.size} iconLeft="⚙" disabled>Label</Button>
              <Button variant="ghost" size={sizeInfo.size}>Label</Button>
              <Button variant="ghost" size={sizeInfo.size} disabled>Label</Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// Split Button Examples
function SplitButtonExamples() {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const variants: Array<"primary" | "secondary" | "dangerous" | "warning" | "positive" | "ai"> = 
    ["primary", "secondary", "dangerous", "warning", "positive", "ai"];

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant} className="flex gap-4">
          <SplitButton 
            variant={variant}
            menuOpen={menuOpen === variant}
            onMenuClick={() => setMenuOpen(menuOpen === variant ? null : variant)}
          >
            Action 1
          </SplitButton>
          <SplitButton 
            variant={variant}
            disabled
          >
            Disabled
          </SplitButton>
        </div>
      ))}
    </div>
  );
}

// Menu Button Examples
function MenuButtonExamples() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="space-y-4">
      <MenuButton 
        menuOpen={menuOpen}
        onMenuClick={() => setMenuOpen(!menuOpen)}
      >
        Action 1
      </MenuButton>
      <MenuButton disabled>
        Disabled Menu
      </MenuButton>
    </div>
  );
}

// Pill Button Examples
function PillButtonExamples() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="pill" size="pill">Filter</Button>
      <Button variant="pill" size="pill">Tag</Button>
      <Button variant="pill" size="pill">Status</Button>
      <Button variant="pill" size="pill" disabled>Disabled</Button>
    </div>
  );
}

// Tile Button Examples
function TileButtonExamples() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
      <Button variant="tile" size="tile" className="flex-col h-24">
        <span className="text-2xl mb-2">📁</span>
        <span>Open Project</span>
      </Button>
      <Button variant="tile" size="tile" className="flex-col h-24">
        <span className="text-2xl mb-2">➕</span>
        <span>New File</span>
      </Button>
      <Button variant="tile" size="tile" className="flex-col h-24" disabled>
        <span className="text-2xl mb-2">⚙</span>
        <span>Settings</span>
      </Button>
    </div>
  );
}

// Loading Button Examples
function LoadingButtonExamples() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button isLoading>Default Loading</Button>
      <Button variant="primary" isLoading loadingText="Saving…">Save</Button>
      <Button variant="dangerous" isLoading loadingText="Deleting…">Delete</Button>
      <Button variant="ghost" isLoading>Ghost Loading</Button>
    </div>
  );
}

// Icon Button Examples
function IconButtonExamples() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Typography variant="code" className="w-20 text-xs">Left Icon</Typography>
        <Button iconLeft="📁">Open</Button>
        <Button variant="primary" iconLeft="💾">Save</Button>
        <Button variant="dangerous" iconLeft="🗑">Delete</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Typography variant="code" className="w-20 text-xs">Right Icon</Typography>
        <Button iconRight="→">Next</Button>
        <Button variant="secondary" iconRight="↗">External</Button>
        <Button variant="positive" iconRight="✓">Accept</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Typography variant="code" className="w-20 text-xs">Icon Only</Typography>
        <Button variant="ghost" size="icon">⚙</Button>
        <Button variant="ghost" size="icon">📁</Button>
        <Button variant="ghost" size="icon">✏</Button>
        <Button variant="ghost" size="icon" disabled>❌</Button>
      </div>
    </div>
  );
}

// Hint Text Examples
function HintTextExamples() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Button hintText="⌘O">Open</Button>
        <Button variant="primary" hintText="⌘S">Save</Button>
        <Button variant="secondary" hintText="⌘Z">Undo</Button>
        <Button variant="dangerous" hintText="⌘⌫">Delete</Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button iconLeft="📁" hintText="⌘O">Open File</Button>
        <Button iconLeft="💾" hintText="⌘S" variant="primary">Save All</Button>
        <Button iconRight="→" hintText="⌘→">Navigate</Button>
      </div>
    </div>
  );
} 