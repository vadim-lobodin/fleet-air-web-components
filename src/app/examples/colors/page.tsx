"use client";
import React from "react";
import { Typography } from "@/components/ui/typography"
import { useTheme } from "@/components/theme-provider";
import fleetSemanticColorsJson from "@/lib/fleet-semantic-colors.json";
import fleetPaletteJson from "@/lib/fleet-palette.json";

const fleetSemanticColors = fleetSemanticColorsJson as Record<'light' | 'dark', Record<string, string>>;
const fleetPalette = fleetPaletteJson as Record<string, string>;



const getResolvedColor = (semanticName: string, theme: 'light' | 'dark') => {
  const paletteKey = fleetSemanticColors[theme][semanticName];
  if (!paletteKey) return '#FF00FF';
  if (paletteKey.startsWith('#') || paletteKey === 'transparent' || paletteKey === 'Transparent') return paletteKey;
  return fleetPalette[paletteKey] || '#FF00FF';
};

export default function ColorsExamplePage() {
  const { theme } = useTheme();
  const resolvedTheme = theme === 'system'
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  const [searchQuery, setSearchQuery] = React.useState('');
  const semanticTokens = Object.keys(fleetSemanticColors[resolvedTheme])
    .filter(token => token.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Typography variant="header-1-semibold">Colors</Typography>
        <input
          type="text"
          placeholder="Search colors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground w-[300px]"
        />
      </div>
      
      <Typography variant="default-multiline" className="text-muted-foreground mb-8">
        Fleet Air Web Components provides a comprehensive color system that mirrors Fleet&apos;s design tokens. 
        All colors are available in both light and dark themes and can be easily integrated into your components.
      </Typography>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2">Semantic Token</th>
              <th className="text-left p-2">Swatch</th>
              <th className="text-left p-2">Palette Key</th>
              <th className="text-left p-2">Hex Value</th>
            </tr>
          </thead>
          <tbody>
            {semanticTokens.map(token => {
              const paletteKey = fleetSemanticColors[resolvedTheme][token];
              const hex = getResolvedColor(token, resolvedTheme);
              return (
                <tr key={token} className="border-b border-border">
                  <td className="p-2 font-mono whitespace-nowrap">{token}</td>
                  <td className="p-2">
                    <span style={{
                      display: 'inline-block',
                      width: 24,
                      height: 24,
                      background: hex,
                      border: '1px solid #bbb',
                      borderRadius: '50%',
                      verticalAlign: 'middle'
                    }} />
                  </td>
                  <td className="p-2 font-mono whitespace-nowrap max-w-[200px] truncate" title={paletteKey}>{paletteKey}</td>
                  <td className="p-2 font-mono whitespace-nowrap">{hex}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 