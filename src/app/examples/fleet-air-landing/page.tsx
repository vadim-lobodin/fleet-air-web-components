"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  Typography,
  ThreeDIsland,
  FloatingIsland,
  Icon,
  Button,
} from "@/components/ui"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Hero 3D Island with dynamic effects
const HeroIsland = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      
      setMousePosition({ x: deltaX * 15, y: deltaY * 15 })
    }

    const hero = heroRef.current
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove)
      hero.addEventListener("mouseleave", () => setMousePosition({ x: 0, y: 0 }))
    }

    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove)
        hero.removeEventListener("mouseleave", () => setMousePosition({ x: 0, y: 0 }))
      }
    }
  }, [])

  return (
    <div ref={heroRef} className={cn("relative overflow-hidden", className)}>
      <ThreeDIsland
        threeDVariant="perspective"
        depth={3}
        rotateX={mousePosition.y * 0.3}
        rotateY={mousePosition.x * 0.3}
        perspective={1200}
        className="relative z-10"
        style={{
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </ThreeDIsland>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>
    </div>
  )
}

// Feature card with 3D hover effects
const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  highlight = false,
  className 
}: {
  title: string
  description: string
  icon: string
  highlight?: boolean
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ThreeDIsland
      threeDVariant="floating"
      depth={highlight ? 3 : 2}
      isHovered={isHovered}
      className={cn(
        "p-8 cursor-pointer group relative overflow-hidden",
        highlight && "ring-2 ring-blue-500/20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for highlight cards */}
      {highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-center w-16 h-16 mx-auto">
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
            highlight ? "bg-blue-500/20 group-hover:bg-blue-500/30" : "bg-accent group-hover:bg-accent/80"
          )}>
            <Icon fleet={icon} size="lg" className={cn(
              "transition-all duration-300",
              highlight ? "text-blue-500" : "text-foreground",
              "group-hover:scale-110"
            )} />
          </div>
        </div>
        
        <Typography variant="header-3-semibold" className="mb-4 text-center group-hover:text-primary transition-colors">
          {title}
        </Typography>
        
        <Typography variant="default" className="text-center text-muted-foreground leading-relaxed">
          {description}
        </Typography>
      </div>
    </ThreeDIsland>
  )
}

// Testimonial card with profile styling
const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  testimonial, 
  avatar,
  className 
}: {
  name: string
  role: string
  company: string
  testimonial: string
  avatar?: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ThreeDIsland
      threeDVariant="perspective"
      depth={2}
      isHovered={isHovered}
      className={cn("p-6 cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Typography variant="header-3-semibold" className="text-white">
              {name.charAt(0)}
            </Typography>
          </div>
        </div>
        
        <div className="flex-1">
          <Typography variant="default" className="text-muted-foreground mb-4 leading-relaxed">
            "{testimonial}"
          </Typography>
          
          <div>
            <Typography variant="default-semibold" className="text-foreground">
              {name}
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              {role} at {company}
            </Typography>
          </div>
        </div>
      </div>
    </ThreeDIsland>
  )
}

// Floating orbit elements
const OrbitElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbiting icons */}
      <div className="absolute top-1/4 left-1/4 animate-pulse">
        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Icon fleet="ai-assistant" size="sm" className="text-blue-500" />
        </div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 animate-pulse delay-1000">
        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
          <Icon fleet="run" size="sm" className="text-green-500" />
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 animate-pulse delay-2000">
        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Icon fleet="vcs-vcs" size="sm" className="text-purple-500" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 right-1/5 animate-pulse delay-3000">
        <div className="w-7 h-7 bg-orange-500/20 rounded-full flex items-center justify-center">
          <Icon fleet="debugger" size="sm" className="text-orange-500" />
        </div>
      </div>
    </div>
  )
}

export default function FleetAirLandingPage() {
  const [emailInput, setEmailInput] = useState("")

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon fleet="ai-assistant" size="md" className="text-blue-500" />
            <Typography variant="header-3-semibold">Fleet Air</Typography>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/examples/3d-islands" className="text-muted-foreground hover:text-foreground transition-colors">
              <Typography variant="default">Examples</Typography>
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <Typography variant="default">Components</Typography>
            </Link>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <HeroIsland className="text-center mb-16">
            <div className="max-w-4xl mx-auto p-12">
              <Typography variant="header-0-semibold" className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                The end of context switching
              </Typography>
              
              <Typography variant="header-2" className="mb-8 text-muted-foreground leading-relaxed">
                Never interrupt your workflow again. Fleet Air brings intelligent development tools directly to your fingertips.
              </Typography>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                  <Icon fleet="ai-assistant" size="sm" className="mr-2" />
                  Try Fleet Air
                </Button>
                <Button variant="secondary" size="lg" className="px-8 py-3">
                  <Icon fleet="external-link" size="sm" className="mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </HeroIsland>
        </div>
        
        <OrbitElements />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="header-1-semibold" className="mb-6">
              No need to switch apps to code
            </Typography>
            <Typography variant="default" className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need in one intelligent workspace. From writing code to deploying applications.
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Powered Coding"
              description="Write code faster with intelligent suggestions and context-aware completions."
              icon="ai-assistant"
              highlight={true}
            />
            
            <FeatureCard
              title="Integrated Terminal"
              description="Execute commands without leaving your editor. Full terminal integration."
              icon="terminal"
            />
            
            <FeatureCard
              title="Git Integration"
              description="Seamless version control with visual diff and merge conflict resolution."
              icon="vcs-vcs"
            />
            
            <FeatureCard
              title="Smart Debugging"
              description="Debug applications with intelligent breakpoints and variable inspection."
              icon="debugger"
            />
            
            <FeatureCard
              title="Real-time Collaboration"
              description="Work together in real-time with shared cursors and live editing."
              icon="ai-chat"
              highlight={true}
            />
            
            <FeatureCard
              title="Universal Runner"
              description="Run any language, framework, or script with one click deployment."
              icon="run"
            />
          </div>
        </div>
      </section>

      {/* Universal Workspace Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto text-center">
          <Typography variant="header-1-semibold" className="mb-6">
            Universal workspace
          </Typography>
          <Typography variant="default" className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fleet Air works with every language, framework, and platform. From web apps to mobile, desktop to cloud.
          </Typography>
          
          <div className="relative">
            <ThreeDIsland
              threeDVariant="floating"
              depth={2}
              className="p-8 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "TypeScript", icon: "file-types-typescript" },
                  { name: "React", icon: "file-types-react" },
                  { name: "Node.js", icon: "file-types-nodejs" },
                  { name: "Python", icon: "file-types-python" },
                  { name: "Rust", icon: "file-types-rust" },
                  { name: "Go", icon: "file-types-go" },
                  { name: "Docker", icon: "file-types-docker" },
                  { name: "Kubernetes", icon: "file-types-kubernetes" },
                  { name: "AWS", icon: "file-types-aws" },
                  { name: "Git", icon: "vcs-vcs" },
                  { name: "Terminal", icon: "terminal" },
                  { name: "AI", icon: "ai-assistant" },
                ].map((tech, index) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                    <Icon fleet={tech.icon} size="md" className="text-muted-foreground" />
                    <Typography variant="small" className="text-muted-foreground">
                      {tech.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </ThreeDIsland>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="header-1-semibold" className="mb-6">
              What developers are saying
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Join thousands of developers who've made Fleet Air their daily driver.
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              role="Senior Developer"
              company="Vercel"
              testimonial="Fleet Air has completely transformed my development workflow. The AI suggestions are incredibly accurate and the integrated terminal saves me hours every day."
            />
            
            <TestimonialCard
              name="Marcus Rodriguez"
              role="Tech Lead"
              company="Stripe"
              testimonial="The real-time collaboration features are game-changing for our team. We can debug issues together and ship features faster than ever before."
            />
            
            <TestimonialCard
              name="Emily Johnson"
              role="Full Stack Developer"
              company="GitHub"
              testimonial="Finally, an IDE that understands modern development. The Git integration is seamless and the AI coding assistant feels like having a senior developer pair programming with me."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <ThreeDIsland
            threeDVariant="depth"
            depth={3}
            className="p-12"
          >
            <Typography variant="header-1-semibold" className="mb-6">
              Start coding smarter
            </Typography>
            <Typography variant="default" className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the next generation of developers using Fleet Air. Download now and experience the future of development.
            </Typography>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                <Icon fleet="ai-assistant" size="sm" className="mr-2" />
                Download Fleet Air
              </Button>
              <Button variant="secondary" size="lg" className="px-8 py-3">
                <Icon fleet="external-link" size="sm" className="mr-2" />
                Try in Browser
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Icon fleet="ai-assistant" size="sm" />
                AI-powered
              </span>
              <span className="flex items-center gap-2">
                <Icon fleet="vcs-vcs" size="sm" />
                Open source
              </span>
              <span className="flex items-center gap-2">
                <Icon fleet="run" size="sm" />
                Cross-platform
              </span>
            </div>
          </ThreeDIsland>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Icon fleet="ai-assistant" size="md" className="text-blue-500" />
              <Typography variant="header-3-semibold">Fleet Air</Typography>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/examples/3d-islands" className="text-muted-foreground hover:text-foreground transition-colors">
                <Typography variant="small">Examples</Typography>
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Typography variant="small">Components</Typography>
              </Link>
              <Typography variant="small" className="text-muted-foreground">
                © 2024 Fleet Air. All rights reserved.
              </Typography>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}