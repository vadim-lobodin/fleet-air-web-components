"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolved: boolean
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolved: false,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "fleet-air-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolved, setResolved] = useState(false);

  // Helper to apply theme to document
  const applyTheme = React.useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (themeToApply === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(themeToApply);
    }
  }, []);

  // On mount, set theme from storage
  useEffect(() => {
    const storedTheme = (localStorage?.getItem(storageKey) as Theme) || defaultTheme;
    setThemeState(storedTheme);
    applyTheme(storedTheme);
    setResolved(true);
  }, [defaultTheme, storageKey, applyTheme]);

  // When theme changes, update document and storage
  useEffect(() => {
    if (!resolved) return;
    applyTheme(theme);
    localStorage?.setItem(storageKey, theme);
    // If system, listen for system theme changes
    let mql: MediaQueryList | null = null;
    const systemListener = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    if (theme === "system") {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", systemListener);
    }
    return () => {
      if (mql) mql.removeEventListener("change", systemListener);
    };
  }, [theme, resolved, applyTheme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setThemeState(newTheme);
      // applyTheme and storage will be handled by effect
    },
    resolved,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 