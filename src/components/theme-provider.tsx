"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system";

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

  // Helper to resolve actual theme from system preference
  const resolveTheme = React.useCallback((themeToResolve: Theme): "light" | "dark" => {
    if (themeToResolve === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return themeToResolve;
  }, []);

  // Helper to apply theme to document
  const applyTheme = React.useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement;
    const resolvedTheme = resolveTheme(themeToApply);
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolveTheme]);

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
  }, [theme, resolved, applyTheme, storageKey]);

  // Listen for system theme changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);

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
