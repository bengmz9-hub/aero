"use client";

import * as React from "react";
import { createContext, useContext, useCallback, useRef } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const STORAGE_KEY = "enigmaworks-theme";

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyThemeToDOM(theme: Theme, attribute: string) {
  const effective = theme === "system" ? getSystemTheme() : theme;
  if (attribute === "class") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(effective);
  }
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);
  const attributeRef = useRef(attribute);
  const disableTransRef = useRef(disableTransitionOnChange);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    let initialTheme: Theme = defaultTheme;

    if (stored) {
      initialTheme = stored;
    } else if (enableSystem) {
      initialTheme = "system";
    }

    applyThemeToDOM(initialTheme, attributeRef.current);
    setResolvedTheme(initialTheme);
    setMounted(true);
  }, [defaultTheme, enableSystem]);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(STORAGE_KEY, newTheme);
    setResolvedTheme(newTheme);
    applyThemeToDOM(newTheme, attributeRef.current);

    if (disableTransRef.current) {
      document.documentElement.style.setProperty(
        "--transition-duration",
        "0ms"
      );
      setTimeout(() => {
        document.documentElement.style.removeProperty("--transition-duration");
      }, 0);
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}