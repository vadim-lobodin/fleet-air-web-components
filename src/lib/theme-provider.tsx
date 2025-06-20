import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Theme, createCSSVariables } from './colors';
import { applyRadixTheme, createRadixCSSVariables } from './radix-theme';

interface ThemeProviderContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'fleet-air-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check for stored theme preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored && (stored === 'light' || stored === 'dark')) {
        return stored;
      }
      
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    // Apply Radix theme (handles CSS variables and classes)
    applyRadixTheme(theme);
    
    // Also apply our custom Fleet semantic colors
    const root = document.documentElement;
    const cssVars = createCSSVariables(theme);
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Store theme preference
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };

  const value: ThemeProviderContext = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Utility hook for accessing colors
export function useColors() {
  const { theme } = useTheme();
  
  return {
    theme,
    // Helper function to get CSS variable
    getVar: (name: string) => `var(--color-${name})`,
    // Helper function to get color values directly
    getRaw: (name: string) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(`--color-${name}`)
          .trim();
      }
      return '';
    },
  };
} 