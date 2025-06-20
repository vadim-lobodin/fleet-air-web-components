import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Typography, Heading, Text, Code, Separator } from '../components';
import { Button } from '../components/Button';
import { useTheme } from '../lib/theme-provider';

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Fleet Typography System - Exact mirror of Fleet\'s typography with Inter Variable and JetBrains Mono fonts, supporting light and dark theme variations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme} variant="secondary" className="mb-8">
      {theme === 'light' ? '🌙' : '☀️'} Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </Button>
  );
};

// Typography Showcase Component
const TypographyShowcase = () => {
  const { theme } = useTheme();
  
  // Helper component to show variant details
  const VariantDemo = ({ 
    variant, 
    label, 
    description,
    children 
  }: { 
    variant: string; 
    label: string; 
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col space-y-2 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Typography variant="medium-semibold" color="accent" className="mb-1">
            {label}
          </Typography>
          <Typography variant="small" color="secondary" className="mb-3">
            {description}
          </Typography>
          {children}
        </div>
        <Code variant="code" inline className="ml-4 text-xs">
          {variant}
        </Code>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Typography variant="header-0-semibold">Fleet Typography System</Typography>
          <Typography variant="header-3" color="secondary">
            Exact mirror of Fleet's typography system with Inter Variable and JetBrains Mono
          </Typography>
          <Typography variant="default" color="tertiary" className="max-w-2xl mx-auto">
            This typography system mirrors Fleet's exact specifications from Typography.kt, 
            including font weights that adapt to light ({theme === 'light' ? 'current' : 'inactive'}) 
            and dark ({theme === 'dark' ? 'current' : 'inactive'}) themes.
          </Typography>
          <div className="flex justify-center mt-6">
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        {/* Header Variants */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Header Variants</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VariantDemo 
              variant="header-0-semibold" 
              label="Header 0 SemiBold" 
              description="26px/32px, Inter Variable, weight 640/600"
            >
              <Typography variant="header-0-semibold">
                Main Page Title
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-1-semibold" 
              label="Header 1 SemiBold" 
              description="23px/28px, Inter Variable, weight 640/600"
            >
              <Typography variant="header-1-semibold">
                Section Title
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-1" 
              label="Header 1" 
              description="23px/28px, Inter Variable, weight 440/400"
            >
              <Typography variant="header-1">
                Section Title (Regular)
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-2-semibold" 
              label="Header 2 SemiBold" 
              description="19px/24px, Inter Variable, weight 640/600"
            >
              <Typography variant="header-2-semibold">
                Subsection Title
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-2" 
              label="Header 2" 
              description="19px/24px, Inter Variable, weight 440/400"
            >
              <Typography variant="header-2">
                Subsection Title (Regular)
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-3-semibold" 
              label="Header 3 SemiBold" 
              description="15px/20px, Inter Variable, weight 640/600"
            >
              <Typography variant="header-3-semibold">
                Component Title
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-3" 
              label="Header 3" 
              description="15px/20px, Inter Variable, weight 490/450"
            >
              <Typography variant="header-3">
                Component Title (Regular)
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-4-semibold" 
              label="Header 4 SemiBold" 
              description="13px/18px, Inter Variable, weight 640/600"
            >
              <Typography variant="header-4-semibold">
                Small Title
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="header-5-semibold" 
              label="Header 5 SemiBold" 
              description="10px/14px, Inter Variable, weight 740/700, uppercase"
            >
              <Typography variant="header-5-semibold">
                Category Label
              </Typography>
            </VariantDemo>
          </div>
        </section>

        <Separator />

        {/* Default Text Variants */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Default Text Variants</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VariantDemo 
              variant="default" 
              label="Default" 
              description="13px/16px, Inter Variable, weight 520/480"
            >
              <Typography variant="default">
                This is the main text used throughout Fleet's interface. It's designed for optimal readability at the default size.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="default-italic" 
              label="Default Italic" 
              description="13px/16px, Inter Variable, weight 520/480, italic"
            >
              <Typography variant="default-italic">
                This is italic text for emphasis and special content formatting.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="default-semibold" 
              label="Default SemiBold" 
              description="13px/16px, Inter Variable, weight 640/600"
            >
              <Typography variant="default-semibold">
                This is semibold text for stronger emphasis and important information.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="default-semibold-italic" 
              label="Default SemiBold Italic" 
              description="13px/16px, Inter Variable, weight 640/600, italic"
            >
              <Typography variant="default-semibold-italic">
                This combines semibold weight with italic style for maximum emphasis.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="default-multiline" 
              label="Default Multiline" 
              description="13px/18px, Inter Variable, weight 520/480"
            >
              <Typography variant="default-multiline">
                This variant has increased line height for better readability in longer text passages and multiline content.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="default-chat" 
              label="Default Chat" 
              description="13px/20px, Inter Variable, weight 520/480"
            >
              <Typography variant="default-chat">
                This variant is optimized for chat interfaces with generous line height for comfortable reading in conversational contexts.
              </Typography>
            </VariantDemo>
          </div>
        </section>

        <Separator />

        {/* Medium and Small Variants */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Medium & Small Variants</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VariantDemo 
              variant="medium" 
              label="Medium" 
              description="12px/16px, Inter Variable, weight 540/500"
            >
              <Typography variant="medium">
                Medium size text for secondary information and UI labels.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="medium-semibold" 
              label="Medium SemiBold" 
              description="12px/16px, Inter Variable, weight 665/625"
            >
              <Typography variant="medium-semibold">
                Medium semibold text for emphasized secondary information.
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="small" 
              label="Small" 
              description="10px/14px, Inter Variable, weight 540/500"
            >
              <Typography variant="small">
                Small text for captions, footnotes, and tertiary information.
              </Typography>
            </VariantDemo>
          </div>
        </section>

        <Separator />

        {/* Code Variants */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Code Variants</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VariantDemo 
              variant="code" 
              label="Code" 
              description="13px/22px, JetBrains Mono, weight 420/400"
            >
              <Typography variant="code" as="pre" className="bg-[var(--color-code-background)] p-3 rounded border border-[var(--color-code-border)]">
                {`function hello() {
  return "Hello Fleet!";
}`}
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="code-italic" 
              label="Code Italic" 
              description="13px/22px, JetBrains Mono, weight 420/400, italic"
            >
              <Typography variant="code-italic" as="pre" className="bg-[var(--color-code-background)] p-3 rounded border border-[var(--color-code-border)]">
                {`// This is a comment
// in italic style`}
              </Typography>
            </VariantDemo>

            <VariantDemo 
              variant="code-bold" 
              label="Code Bold" 
              description="13px/22px, JetBrains Mono, weight 720/700"
            >
              <Typography variant="code-bold" as="pre" className="bg-[var(--color-code-background)] p-3 rounded border border-[var(--color-code-border)]">
                {`const IMPORTANT = true;
let BOLD_VARIABLE = 42;`}
              </Typography>
            </VariantDemo>
          </div>
        </section>

        <Separator />

        {/* Color Variants */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Color Variants</Typography>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Typography variant="medium-semibold" color="accent">Text Colors</Typography>
                <Typography variant="default" color="primary">Primary Text</Typography>
                <Typography variant="default" color="secondary">Secondary Text</Typography>
                <Typography variant="default" color="tertiary">Tertiary Text</Typography>
                <Typography variant="default" color="muted">Muted Text</Typography>
              </div>
              
              <div className="space-y-2">
                <Typography variant="medium-semibold" color="accent">Semantic Colors</Typography>
                <Typography variant="default" color="success">Success Text</Typography>
                <Typography variant="default" color="warning">Warning Text</Typography>
                <Typography variant="default" color="danger">Danger Text</Typography>
                <Typography variant="default" color="accent">Accent Text</Typography>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Usage Examples */}
        <section>
          <Typography variant="header-2-semibold" className="mb-6">Usage Examples</Typography>
          <div className="space-y-6">
            {/* File Explorer Example */}
            <div className="bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
              <Typography variant="header-3-semibold" className="mb-3">File Explorer</Typography>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Typography variant="small" color="secondary">📁</Typography>
                  <Typography variant="default">src/</Typography>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Typography variant="small" color="secondary">📄</Typography>
                  <Typography variant="default">App.tsx</Typography>
                  <Typography variant="small" color="tertiary">- 2.3kb</Typography>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Typography variant="small" color="secondary">📄</Typography>
                  <Typography variant="default">index.css</Typography>
                  <Typography variant="small" color="tertiary">- 1.1kb</Typography>
                </div>
              </div>
            </div>

            {/* Code Editor Example */}
            <div className="bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
              <Typography variant="header-3-semibold" className="mb-3">Code Editor</Typography>
              <div className="bg-[var(--color-code-background)] p-3 rounded border border-[var(--color-code-border)]">
                <Typography variant="code" as="pre" className="whitespace-pre-wrap">
{`import React from 'react';
import { Typography } from './components';

export const App = () => {
  return (
    <Typography variant="header-1-semibold">
      Welcome to Fleet!
    </Typography>
  );
};`}
                </Typography>
              </div>
            </div>

            {/* Status Bar Example */}
            <div className="bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
              <Typography variant="header-3-semibold" className="mb-3">Status Bar</Typography>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Typography variant="small" color="secondary">TypeScript</Typography>
                  <Typography variant="small" color="secondary">UTF-8</Typography>
                  <Typography variant="small" color="secondary">LF</Typography>
                </div>
                <div className="flex items-center space-x-4">
                  <Typography variant="small" color="success">✓ No errors</Typography>
                  <Typography variant="small" color="secondary">Ln 42, Col 15</Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mt-12">
          <Typography variant="header-2-semibold" className="mb-6">Technical Details</Typography>
          <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <Typography variant="default-multiline" className="mb-4">
              This typography system is an exact mirror of Fleet's Typography.kt implementation:
            </Typography>
            <ul className="space-y-2 ml-4">
              <li>
                <Typography variant="default">
                  • <Typography variant="default-semibold" asChild><span>Font Families:</span></Typography> Inter Variable for UI text, JetBrains Mono for code
                </Typography>
              </li>
              <li>
                <Typography variant="default">
                  • <Typography variant="default-semibold" asChild><span>Theme Adaptation:</span></Typography> Font weights automatically adjust between light and dark themes
                </Typography>
              </li>
              <li>
                <Typography variant="default">
                  • <Typography variant="default-semibold" asChild><span>Pixel Perfect:</span></Typography> Exact pixel sizes, line heights, and letter spacing from Fleet's source code
                </Typography>
              </li>
              <li>
                <Typography variant="default">
                  • <Typography variant="default-semibold" asChild><span>Accessibility:</span></Typography> Follows WCAG guidelines with proper contrast ratios
                </Typography>
              </li>
              <li>
                <Typography variant="default">
                  • <Typography variant="default-semibold" asChild><span>Performance:</span></Typography> Optimized for web rendering with variable font support
                </Typography>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <TypographyShowcase />,
}; 