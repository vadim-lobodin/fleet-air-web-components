"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  FleetWindowLayout,
  Typography,
  Island,
  IslandWithTabs,
  ThreeDIsland,
  ToolbarButton,
  ToolbarSeparator,
  WorkspaceWidget,
  LeftToolbarSection,
  RightToolbarSection,
  ContextMenu,
  Icon,
  DraggableTabsProvider,
  DroppableTabIsland,
  type TabIsland,
} from "@/components/ui"
import { cn } from "@/lib/utils"

// Floating island card component
const FloatingIslandCard = ({ 
  title, 
  content, 
  icon, 
  variant = "floating",
  depth = 1,
  className 
}: {
  title: string
  content: string
  icon?: string
  variant?: "floating" | "rotating" | "perspective" | "depth"
  depth?: number
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ThreeDIsland
      threeDVariant={variant}
      depth={depth}
      isHovered={isHovered}
      className={cn("p-6 cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0">
            <Icon fleet={icon} size="md" className="text-accent" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Typography variant="header-3-semibold" className="mb-2">
            {title}
          </Typography>
          <Typography variant="default" className="text-muted-foreground">
            {content}
          </Typography>
        </div>
      </div>
    </ThreeDIsland>
  )
}

// 3D Grid container with perspective
const ThreeDGrid = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8",
        "transform-gpu perspective-1000",
        className
      )}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
    >
      {children}
    </div>
  )
}

// Mouse tracking parallax container
const ParallaxContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      
      setMousePosition({ x: deltaX * 10, y: deltaY * 10 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", () => setMousePosition({ x: 0, y: 0 }))
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", () => setMousePosition({ x: 0, y: 0 }))
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}

export default function ThreeDIslandsPage() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)
  const [rightPanelVisible, setRightPanelVisible] = useState(true)
  const [bottomPanelVisible, setBottomPanelVisible] = useState(true)
  const [perspective, setPerspective] = useState(1000)
  const [globalRotation, setGlobalRotation] = useState({ x: 0, y: 0 })

  const initialIslands: TabIsland[] = [
    {
      id: "main",
      activeTab: "3d-demo",
      tabs: [
        {
          id: "3d-demo",
          title: "3D Islands Demo",
          content: <div className="px-4 py-2">3D Demo</div>,
          tabContent: (
            <div className="h-full p-6 overflow-auto">
              <ParallaxContainer>
                <ThreeDGrid>
                  <FloatingIslandCard
                    title="Code Editor"
                    content="Enhanced editing experience with 3D depth and smooth animations"
                    icon="file-types-typescript"
                    variant="floating"
                    depth={1}
                  />
                  <FloatingIslandCard
                    title="File Explorer"
                    content="Navigate your project files with floating tree structure"
                    icon="folder"
                    variant="perspective"
                    depth={2}
                  />
                  <FloatingIslandCard
                    title="Terminal"
                    content="Execute commands in a terminal that floats above your workspace"
                    icon="terminal"
                    variant="rotating"
                    depth={1}
                  />
                  <FloatingIslandCard
                    title="AI Assistant"
                    content="Get AI-powered help with context-aware suggestions"
                    icon="ai-assistant"
                    variant="depth"
                    depth={3}
                  />
                  <FloatingIslandCard
                    title="Git Integration"
                    content="Manage version control with visual diff and commit tools"
                    icon="vcs-vcs"
                    variant="floating"
                    depth={2}
                  />
                  <FloatingIslandCard
                    title="Debugging"
                    content="Debug your applications with interactive breakpoints"
                    icon="debugger"
                    variant="perspective"
                    depth={1}
                  />
                </ThreeDGrid>
              </ParallaxContainer>
            </div>
          ),
          icon: <Icon fleet="ai-assistant" size="sm" />,
        },
      ],
    },
  ]

  return (
    <>
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          3D Islands Effect
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Prototype of floating islands with 3D transformations, depth, and interactive effects
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Controls */}
        <section className="space-y-4">
          <Typography variant="header-2-semibold">3D Controls</Typography>
          <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-2">
              <Typography variant="default">Perspective:</Typography>
              <input
                type="range"
                min="500"
                max="2000"
                value={perspective}
                onChange={(e) => setPerspective(Number(e.target.value))}
                className="w-32"
              />
              <Typography variant="code" className="min-w-[4rem]">
                {perspective}px
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography variant="default">Global Rotation X:</Typography>
              <input
                type="range"
                min="-30"
                max="30"
                value={globalRotation.x}
                onChange={(e) => setGlobalRotation(prev => ({ ...prev, x: Number(e.target.value) }))}
                className="w-32"
              />
              <Typography variant="code" className="min-w-[3rem]">
                {globalRotation.x}°
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography variant="default">Global Rotation Y:</Typography>
              <input
                type="range"
                min="-30"
                max="30"
                value={globalRotation.y}
                onChange={(e) => setGlobalRotation(prev => ({ ...prev, y: Number(e.target.value) }))}
                className="w-32"
              />
              <Typography variant="code" className="min-w-[3rem]">
                {globalRotation.y}°
              </Typography>
            </div>
          </div>
        </section>

        {/* Fleet Window Layout with 3D Islands */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">3D Fleet Window Layout</Typography>
          <div className="space-y-4">
            <DraggableTabsProvider initialIslands={initialIslands}>
              <div 
                className="h-[700px] border border-border rounded-lg overflow-hidden"
                style={{
                  perspective: `${perspective}px`,
                  transform: `perspective(${perspective}px) rotateX(${globalRotation.x}deg) rotateY(${globalRotation.y}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <FleetWindowLayout
                  platform="default"
                  toolbarProps={{
                    focused: true,
                    leftButtons: (
                      <LeftToolbarSection>
                        <ToolbarButton 
                          icon={leftPanelVisible ? "panel-left-open" : "panel-left-closed"} 
                          tooltip="Toggle left panel"
                          onClick={() => setLeftPanelVisible(!leftPanelVisible)}
                          active={leftPanelVisible}
                        />
                        <ToolbarButton 
                          icon={bottomPanelVisible ? "panel-bottom-open" : "panel-bottom-closed"} 
                          tooltip="Toggle bottom panel"
                          onClick={() => setBottomPanelVisible(!bottomPanelVisible)}
                          active={bottomPanelVisible}
                        />
                        <ToolbarButton 
                          icon={rightPanelVisible ? "panel-right-open" : "panel-right-closed"} 
                          tooltip="Toggle right panel"
                          onClick={() => setRightPanelVisible(!rightPanelVisible)}
                          active={rightPanelVisible}
                        />
                        <ToolbarSeparator />
                        <ToolbarButton icon="ai-assistant" tooltip="3D Mode" active />
                      </LeftToolbarSection>
                    ),
                    workspace: (
                      <WorkspaceWidget 
                        projectName="3d-air-components"
                        branchName="3d-islands"
                        projectMenu={
                          <ContextMenu
                            items={[
                              {
                                type: 'action',
                                name: 'Enable 3D Mode',
                                icon: 'ai-assistant',
                                callback: () => console.log('Enable 3D mode')
                              },
                              {
                                type: 'action',
                                name: 'Reset Perspective',
                                icon: 'restart',
                                callback: () => setPerspective(1000)
                              },
                              { type: 'separator' },
                              {
                                type: 'action',
                                name: 'Export 3D View',
                                icon: 'ai-snapshot',
                                callback: () => console.log('Export 3D view')
                              }
                            ]}
                            trigger={
                              <ToolbarButton
                                tooltip="3D project actions"
                                className="h-auto w-auto px-1 py-0.5 min-w-0"
                              >
                                <Typography variant="default-semibold" className="truncate">
                                  3d-air-components
                                </Typography>
                              </ToolbarButton>
                            }
                          />
                        }
                        branchMenu={
                          <ContextMenu
                            items={[
                              {
                                type: 'action',
                                name: '3D Islands Branch',
                                icon: 'vcs-branch',
                                callback: () => console.log('Switch to 3D branch')
                              },
                              {
                                type: 'action',
                                name: 'Create 3D Feature',
                                icon: 'add',
                                callback: () => console.log('New 3D feature')
                              }
                            ]}
                            trigger={
                              <ToolbarButton
                                tooltip="3D branch actions"
                                className="h-auto w-auto px-1 py-0.5 min-w-0"
                              >
                                <Typography variant="default-semibold" className="truncate">
                                  3d-islands
                                </Typography>
                              </ToolbarButton>
                            }
                          />
                        }
                      />
                    ),
                    rightButtons: (
                      <RightToolbarSection>
                        <ToolbarButton icon="ai-chat" tooltip="3D Chat" />
                        <ToolbarButton icon="run" tooltip="Run in 3D" />
                        <ToolbarButton icon="ai-assistant" tooltip="3D Assistant" />
                        <ToolbarButton icon="settings" tooltip="3D Settings" />
                      </RightToolbarSection>
                    )
                  }}
                  leftPanel={
                    <ThreeDIsland
                      threeDVariant="perspective"
                      depth={2}
                      className="h-full"
                      style={{ transformOrigin: "right center" }}
                    >
                      <div className="p-4">
                        <Typography variant="header-3-semibold" className="mb-4">
                          3D File Explorer
                        </Typography>
                        <div className="space-y-2">
                          {["src/", "components/", "islands/", "3d-effects/"].map((item, index) => (
                            <div key={item} className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded transition-colors">
                              <Icon fleet="folder" size="sm" />
                              <Typography variant="default">{item}</Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ThreeDIsland>
                  }
                  rightPanel={
                    <ThreeDIsland
                      threeDVariant="floating"
                      depth={1}
                      className="h-full"
                      style={{ transformOrigin: "left center" }}
                    >
                      <div className="p-4">
                        <Typography variant="header-3-semibold" className="mb-4">
                          3D Inspector
                        </Typography>
                        <div className="space-y-3">
                          <div>
                            <Typography variant="default-semibold">Transform Properties</Typography>
                            <Typography variant="code" className="text-muted-foreground">
                              perspective: {perspective}px
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="default-semibold">Rotation</Typography>
                            <Typography variant="code" className="text-muted-foreground">
                              rotateX: {globalRotation.x}deg
                            </Typography>
                            <Typography variant="code" className="text-muted-foreground">
                              rotateY: {globalRotation.y}deg
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </ThreeDIsland>
                  }
                  bottomPanel={
                    <ThreeDIsland
                      threeDVariant="depth"
                      depth={3}
                      translateZ={20}
                      className="h-full"
                      style={{ transformOrigin: "center top" }}
                    >
                      <div className="p-4">
                        <Typography variant="header-3-semibold" className="mb-4">
                          3D Console
                        </Typography>
                        <div className="font-mono text-sm space-y-1">
                          <div className="text-green-400">$ npm run 3d-dev</div>
                          <div className="text-muted-foreground">Starting 3D development server...</div>
                          <div className="text-blue-400">✓ 3D Islands rendered successfully</div>
                          <div className="text-yellow-400">⚡ Hot reload enabled for 3D transforms</div>
                        </div>
                      </div>
                    </ThreeDIsland>
                  }
                  mainContent={<DroppableTabIsland islandId="main" />}
                  leftPanelVisible={leftPanelVisible}
                  rightPanelVisible={rightPanelVisible}
                  bottomPanelVisible={bottomPanelVisible}
                />
              </div>
            </DraggableTabsProvider>
          </div>
        </section>

        {/* Static 3D Examples */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">3D Island Variants</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Floating Islands</Typography>
              <div className="space-y-4">
                <FloatingIslandCard
                  title="Shallow Depth"
                  content="Subtle elevation with soft shadows"
                  icon="layer"
                  variant="floating"
                  depth={1}
                />
                <FloatingIslandCard
                  title="Medium Depth"
                  content="Moderate elevation for content separation"
                  icon="layers"
                  variant="floating"
                  depth={2}
                />
                <FloatingIslandCard
                  title="Deep Depth"
                  content="High elevation for modal-like prominence"
                  icon="stack"
                  variant="floating"
                  depth={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="header-3-semibold">Interactive Effects</Typography>
              <div className="space-y-4">
                <FloatingIslandCard
                  title="Perspective Tilt"
                  content="3D perspective with rotation on hover"
                  icon="ai-assistant"
                  variant="perspective"
                  depth={2}
                />
                <FloatingIslandCard
                  title="Rotating Island"
                  content="Smooth rotation animation on interaction"
                  icon="restart"
                  variant="rotating"
                  depth={1}
                />
                <FloatingIslandCard
                  title="Z-Depth Translation"
                  content="Forward/backward movement in 3D space"
                  icon="external-link"
                  variant="depth"
                  depth={2}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}