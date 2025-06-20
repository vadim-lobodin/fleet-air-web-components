import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading, Text, Code, Separator } from '../components';
import { Button } from '../components/Button';
import { useTheme } from '../lib/theme-provider';
import { palette, lightColors, darkColors } from '../lib/colors';

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive color system based on Fleet\'s Compose themes, designed for web prototyping.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Color Swatch Component
const ColorSwatch = ({ name, value, category }: { name: string; value: string; category?: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative cursor-pointer transition-transform hover:scale-105" onClick={handleCopy}>
      <div 
        className="w-full h-20 rounded-lg ring-1 ring-black ring-opacity-10"
        style={{ backgroundColor: value }}
      />
      <div className="mt-2 space-y-1">
        <Text size="sm" weight="medium" className="capitalize">{name}</Text>
        <Code className="text-xs break-all pointer-events-none">{value}</Code>
        {category && (
          <Text size="xs" variant="secondary" className="capitalize">{category}</Text>
        )}
      </div>
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <Text size="sm" weight="semibold" className="text-white">Copied!</Text>
        </div>
      )}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme} variant="secondary">
      {theme === 'light' ? '🌙' : '☀️'} Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </Button>
  );
};

// Semantic Color Demos
const SemanticColorDemos = () => {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={4} className="mb-4">Text Colors</Heading>
        <div className="space-y-3">
          <Text variant="primary" size="lg">Primary Text - This is the main text color used throughout the interface</Text>
          <Text variant="secondary">Secondary Text - Used for supporting information and descriptions</Text>
          <Text variant="tertiary">Tertiary Text - Used for subtle information and metadata</Text>
          <Text variant="success">Positive Text - Used for success messages and positive feedback</Text>
          <Text variant="danger">Dangerous Text - Used for error messages and warnings</Text>
          <Text variant="accent">Accent Text - Used for links and interactive elements</Text>
        </div>
      </div>
    </div>
  );
};



// Input Field Examples
const InputFieldExamples = () => {
  return (
    <div className="space-y-4">
      <Heading level={4}>Input Fields</Heading>
      <div className="space-y-3 max-w-md">
        <input 
          type="text" 
          placeholder="Default input field"
          className="w-full px-3 py-2 rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-focus-root)] focus:border-transparent outline-none transition-colors"
        />
        <input 
          type="text" 
          placeholder="Error state input"
          className="w-full px-3 py-2 rounded-md border-2 border-[var(--color-dangerous)] bg-[var(--color-input-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-dangerous)] focus:border-transparent outline-none transition-colors"
        />
      </div>
    </div>
  );
};

// Main Color System Component
const ColorSystemShowcase = () => {
  const { theme } = useTheme();
  const currentColors = theme === 'light' ? lightColors : darkColors;
  
  // Get ALL palette colors by flattening the nested structure
  const getAllPaletteColors = (): [string, string][] => {
    const entries: [string, string][] = [];
    
    Object.entries(palette).forEach(([category, value]) => {
      if (typeof value === 'string') {
        // Top-level colors like white, black, transparent
        entries.push([category, value]);
      } else if (typeof value === 'object' && value !== null) {
        // Nested color scales like neutral, blue, etc.
        Object.entries(value).forEach(([scale, color]) => {
          if (typeof color === 'string') {
            entries.push([`${category}.${scale}`, color]);
          }
        });
      }
    });
    
    return entries;
  };
  
  // Helper function to flatten semantic color objects
  const flattenColorEntries = (colorObj: any): [string, string][] => {
    const entries: [string, string][] = [];
    
    const flatten = (obj: any, prefix = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string') {
          entries.push([newKey, value]);
        } else if (typeof value === 'object' && value !== null) {
          flatten(value, newKey);
        }
      });
    };
    
    flatten(colorObj);
    return entries;
  };
  
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading level={1}>Fleet Air Web Components</Heading>
          <Heading level={2} variant="secondary">Color System Showcase</Heading>
          <Text size="lg" variant="secondary">
            A comprehensive color system based on Fleet's Compose themes, designed for web prototyping
          </Text>
          <div className="flex justify-center mt-4">
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        {/* Semantic Colors */}
        <div>
          <Heading level={3} className="mb-6">Semantic Colors in Use</Heading>
          <SemanticColorDemos />
        </div>

        <Separator />

        <InputFieldExamples />

        <Separator />

        {/* Base Palette */}
        <div>
          <Heading level={3} className="mb-6">Base Palette ({getAllPaletteColors().length} colors)</Heading>
          
          {/* All palette colors in organized grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {getAllPaletteColors().map(([name, color]) => (
              <ColorSwatch key={name} name={name} value={color} category="base" />
            ))}
          </div>
        </div>

        <Separator />

        {/* Current Theme Colors */}
        <div>
          <Heading level={3} className="mb-6">Current Theme Colors - {theme} ({flattenColorEntries(currentColors).length} colors)</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {flattenColorEntries(currentColors).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} category="semantic" />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <Text variant="secondary">
            Click any color swatch to copy its value to clipboard
          </Text>
        </div>
      </div>
    </div>
  );
};

// Main Color System Story
export const ColorSystem: Story = {
  render: ColorSystemShowcase,
}; 