"use client";

import React, { useState } from "react";
import { Button, ToggleButton, GhostToggleButton, SplitButton, MenuButton } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

// Exact match to Fleet Buttons.kt structure
const hintTextOptions = [null, "⌘]"]; // Fleet uses Input.Keystroke(...).presentableName
const iconOptions = [null, "arrow-right"]; // Fleet uses ThemeKeys.RightIcon which maps to "icons.arrow-right"

export default function ButtonsPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Buttons
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Complete Fleet button gallery matching the original Kotlin/Compose implementation
        </Typography>
      </div>

      <div className="space-y-12">
        
        {/* Primary Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Primary</Typography>
          <ButtonCombinations
            large={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="primary" size="lg" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            default={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="primary" size="default" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            small={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="primary" size="sm" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
          />
        </section>

        {/* Secondary Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Secondary</Typography>
          <ButtonCombinations
            large={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="secondary" size="lg" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            default={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="secondary" size="default" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            small={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="secondary" size="sm" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
          />
        </section>

        {/* Dangerous Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Dangerous</Typography>
          <ButtonCombinations
            large={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="dangerous" size="lg" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            default={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="dangerous" size="default" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            small={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="dangerous" size="sm" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
          />
        </section>

        {/* Positive Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Positive</Typography>
          <ButtonCombinations
            large={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="positive" size="lg" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            default={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="positive" size="default" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            small={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="positive" size="sm" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
          />
        </section>

        {/* Warning Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Warning</Typography>
          <ButtonCombinations
            large={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="warning" size="lg" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            default={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="warning" size="default" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
            small={(text, iconKey, iconSide, hintText, enabled, isLoading) => 
              <Button variant="warning" size="sm" disabled={!enabled} isLoading={isLoading} iconLeft={iconKey || undefined} hintText={hintText || undefined}>
                {text}
              </Button>
            }
          />
        </section>

        {/* Toggle Button */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Toggle Button</Typography>
          <ToggleButtonExample />
        </section>

        {/* Split Button */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Split Button</Typography>
          <SplitButtonExample />
        </section>

        {/* Menu Button */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Menu Button</Typography>
          <MenuButtonExample />
        </section>

        {/* Ghost Button */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Ghost Button</Typography>
          <GhostButtonExample />
        </section>

        {/* Ghost Toggle Button */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Ghost Toggle Button</Typography>
          <GhostToggleButtonExample />
        </section>

        {/* Fleet Icons Showcase */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Fleet Icons Showcase</Typography>
          <Typography variant="default" className="text-muted-foreground">
            Examples of buttons with various Fleet icons
          </Typography>
          <FleetIconsExample />
        </section>

      </div>
    </div>
  );
}

// Button Combinations Component (matches Kotlin structure exactly)
interface ButtonCombinationsProps {
  large: (text: string, iconKey: string | null, iconSide: string, hintText: string | null, enabled: boolean, isLoading: boolean) => React.ReactNode;
  default: (text: string, iconKey: string | null, iconSide: string, hintText: string | null, enabled: boolean, isLoading: boolean) => React.ReactNode;
  small: (text: string, iconKey: string | null, iconSide: string, hintText: string | null, enabled: boolean, isLoading: boolean) => React.ReactNode;
}

function ButtonCombinations({ large, default: defaultButton, small }: ButtonCombinationsProps) {
  const builders = [large, defaultButton, small];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0 min-w-max">
        {builders.map((builder, index) => (
          <ButtonCombination key={index} builder={builder} />
        ))}
      </div>
    </div>
  );
}

// Exact match to Fleet ButtonCombination structure
function ButtonCombination({ 
  builder 
}: { 
  builder: (text: string, iconKey: string | null, iconSide: string, hintText: string | null, enabled: boolean, isLoading: boolean) => React.ReactNode 
}) {
  return (
    <>
      {iconOptions.map((icon) =>
        hintTextOptions.map((hintText) => (
          <div key={`${icon}-${hintText}`} className="flex flex-col gap-1 p-1">
            {builder("Text", icon, "Left", hintText, true, false)}
            <div className="h-1" /> {/* Spacer matching Fleet's 4.dp */}
            {builder("Text", icon, "Left", hintText, false, false)}
          </div>
        ))
      )}
      <div className="flex flex-col gap-1 p-1">
        {builder("Text", null, "Left", null, true, true)}
        <div className="h-1" /> {/* Spacer matching Fleet's 4.dp */}
        {builder("Text", null, "Left", null, false, false)}
      </div>
    </>
  );
}

// Toggle Button Example (matches Kotlin structure)
function ToggleButtonExample() {
  return (
    <div className="flex items-center gap-0">
      {iconOptions.map((icon) =>
        hintTextOptions.map((hintText) => {
          const [selectedState, setSelectedState] = useState(false);
          return (
            <div key={`${icon}-${hintText}`} className="flex flex-col items-center gap-1 p-1">
                             <ToggleButton 
                 selected={selectedState} 
                 onClick={() => setSelectedState(!selectedState)}
                 iconLeft={icon || undefined}
                 hintText={hintText || undefined}
               >
                 Text
               </ToggleButton>
               <ToggleButton 
                 selected={false} 
                 disabled
                 iconLeft={icon || undefined}
                 hintText={hintText || undefined}
               >
                 Text
               </ToggleButton>
               <ToggleButton 
                 selected={true} 
                 disabled
                 iconLeft={icon || undefined}
                 hintText={hintText || undefined}
               >
                 Text
               </ToggleButton>
            </div>
          );
        })
      )}
    </div>
  );
}

// Split Button Example (matches Kotlin structure)
function SplitButtonExample() {
  const styles = [
    { name: "Primary", variant: "primary" as const },
    { name: "Secondary", variant: "secondary" as const },
    { name: "Dangerous", variant: "dangerous" as const },
    { name: "Warning", variant: "warning" as const },
    { name: "Positive", variant: "positive" as const },
    { name: "AI", variant: "ai" as const },
  ];

  return (
    <div className="flex flex-col gap-2">
      {styles.map((style) => (
        <div key={style.name} className="flex gap-2">
          <SplitButton variant={style.variant}>Action 1</SplitButton>
          <SplitButton variant={style.variant} disabled>Action 1</SplitButton>
        </div>
      ))}
      <div className="flex gap-2">
        <SplitButton variant="primary"> Long long long button text</SplitButton>
      </div>
    </div>
  );
}

// Menu Button Example (matches Kotlin structure)
function MenuButtonExample() {
  return (
    <div className="flex flex-col gap-1">
      <MenuButton>Action 1</MenuButton>
      <MenuButton disabled>Action 1</MenuButton>
    </div>
  );
}

// Ghost Button Example (matches Kotlin structure exactly)
function GhostButtonExample() {
  const icon = "settings"; // Using Fleet settings icon
  const sizes = [
    { name: "Default", size: "default" as const },
    { name: "Large", size: "lg" as const },
    { name: "Small", size: "sm" as const },
    { name: "Tiny", size: "tiny" as const },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {sizes.map((sizeInfo) => (
        <div key={sizeInfo.size} className="flex gap-1 items-center">
          <Typography variant="code" className="w-14 text-xs">{sizeInfo.name}</Typography>
          <Button variant="ghost" size={sizeInfo.size} iconLeft={icon} />
          <Button variant="ghost" size={sizeInfo.size} iconLeft={icon} disabled />
          <div className="w-4" />
          <Button variant="ghost" size={sizeInfo.size} iconLeft={icon}>Label</Button>
          <Button variant="ghost" size={sizeInfo.size} iconLeft={icon} disabled>Label</Button>
          <div className="w-4" />
          <Button variant="ghost" size={sizeInfo.size}>Label</Button>
          <Button variant="ghost" size={sizeInfo.size} disabled>Label</Button>
        </div>
      ))}
    </div>
  );
}

// Ghost Toggle Button Example (matches Kotlin structure exactly)
function GhostToggleButtonExample() {
  const icon = "settings"; // Using Fleet settings icon
  const sizes = [
    { name: "Default", size: "default" as const },
    { name: "Large", size: "lg" as const },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {sizes.map((sizeInfo) => (
        <div key={sizeInfo.size} className="flex gap-1 items-center">
          <Typography variant="code" className="w-14 text-xs">{sizeInfo.name}</Typography>
          
          {/* Icon only buttons */}
          <GhostToggleButtonWithState iconLeft={icon} size={sizeInfo.size} initialSelected={true} />
          <GhostToggleButtonWithState iconLeft={icon} size={sizeInfo.size} initialSelected={false} />
          <GhostToggleButton selected={true} disabled iconLeft={icon} size={sizeInfo.size} />
          <GhostToggleButton selected={false} disabled iconLeft={icon} size={sizeInfo.size} />
          <div className="w-4" />
          
          {/* Icon + Label buttons */}
          <GhostToggleButtonWithState iconLeft={icon} size={sizeInfo.size} initialSelected={true}>Label</GhostToggleButtonWithState>
          <GhostToggleButtonWithState iconLeft={icon} size={sizeInfo.size} initialSelected={false}>Label</GhostToggleButtonWithState>
          <GhostToggleButton selected={true} disabled iconLeft={icon} size={sizeInfo.size}>Label</GhostToggleButton>
          <GhostToggleButton selected={false} disabled iconLeft={icon} size={sizeInfo.size}>Label</GhostToggleButton>
          <div className="w-4" />
          
          {/* Label only buttons */}
          <GhostToggleButtonWithState size={sizeInfo.size} initialSelected={true}>Label</GhostToggleButtonWithState>
          <GhostToggleButtonWithState size={sizeInfo.size} initialSelected={false}>Label</GhostToggleButtonWithState>
          <GhostToggleButton selected={true} disabled size={sizeInfo.size}>Label</GhostToggleButton>
          <GhostToggleButton selected={false} disabled size={sizeInfo.size}>Label</GhostToggleButton>
        </div>
      ))}
    </div>
  );
}

// Helper component for stateful ghost toggle buttons
function GhostToggleButtonWithState({ 
  initialSelected = false, 
  ...props 
}: { 
  initialSelected?: boolean 
} & React.ComponentProps<typeof GhostToggleButton>) {
  const [selected, setSelected] = useState(initialSelected);
  
  return (
    <GhostToggleButton
      selected={selected}
      onClick={() => setSelected(!selected)}
      {...props}
    />
  );
}

// Fleet Icons Example - showcases Fleet icons in buttons (all icons are 16px)
function FleetIconsExample() {
  const fleetIcons = [
    { name: "add", label: "Add" },
    { name: "copy", label: "Copy" },
    { name: "search", label: "Search" },
    { name: "settings", label: "Settings" },
    { name: "arrow-right", label: "Next" },
    { name: "arrow-down", label: "Down" },
    { name: "user", label: "User" },
    { name: "folder", label: "Folder" },
    { name: "run", label: "Run" },
    { name: "stop", label: "Stop" },
    { name: "pause", label: "Pause" },
    { name: "resume", label: "Resume" },
    { name: "restart", label: "Restart" },
    { name: "warning", label: "Warning" },
    { name: "success", label: "Success" },
    { name: "info", label: "Info" },
  ];

  return (
    <div className="space-y-8">
      {/* Primary buttons with icons */}
      <div className="space-y-4">
        <Typography variant="header-3-semibold">Primary Buttons with Fleet Icons</Typography>
        <div className="flex flex-wrap gap-2">
          {fleetIcons.slice(0, 8).map((icon) => (
            <Button key={icon.name} variant="primary" iconLeft={icon.name}>
              {icon.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Secondary buttons with icons */}
      <div className="space-y-4">
        <Typography variant="header-3-semibold">Secondary Buttons with Fleet Icons</Typography>
        <div className="flex flex-wrap gap-2">
          {fleetIcons.slice(8, 16).map((icon) => (
            <Button key={icon.name} variant="secondary" iconLeft={icon.name}>
              {icon.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Icon-only buttons - Fleet icons are always 16px */}
      <div className="space-y-4">
        <Typography variant="header-3-semibold">Icon-only Ghost Buttons (16px icons)</Typography>
        <div className="flex flex-wrap gap-2">
          {fleetIcons.slice(0, 12).map((icon) => (
            <Button 
              key={icon.name} 
              variant="ghost" 
              size="icon" 
              iconLeft={icon.name}
              title={icon.label}
            />
          ))}
        </div>
      </div>

      {/* Different button variants with same icon */}
      <div className="space-y-4">
        <Typography variant="header-3-semibold">Same Icon, Different Variants</Typography>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" iconLeft="run">Run</Button>
          <Button variant="secondary" iconLeft="run">Run</Button>
          <Button variant="positive" iconLeft="run">Run</Button>
          <Button variant="warning" iconLeft="run">Run</Button>
          <Button variant="dangerous" iconLeft="run">Run</Button>
          <Button variant="ghost" iconLeft="run">Run</Button>
        </div>
      </div>

      {/* Buttons with right icons */}
      <div className="space-y-4">
        <Typography variant="header-3-semibold">Buttons with Right Icons</Typography>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" iconRight="arrow-right">Next</Button>
          <Button variant="secondary" iconRight="arrow-down">More</Button>
          <Button variant="primary" iconRight="search">Search</Button>
          <Button variant="positive" iconRight="success">Complete</Button>
        </div>
      </div>
    </div>
  );
}