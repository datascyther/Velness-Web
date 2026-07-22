import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light" | "system";

const STORAGE_KEY = "neeva-theme-preference";

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getResolvedTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") return getSystemTheme();
  return theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored || "system";
  });

  const [resolved, setResolved] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return getResolvedTheme(
      (localStorage.getItem(STORAGE_KEY) as Theme | null) || "system"
    );
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    const resolved = getResolvedTheme(newTheme);
    setResolved(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  }, []);

  const toggle = useCallback(() => {
    const next = resolved === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolved, setTheme]);

  // Initialize on mount and listen to system changes
  useEffect(() => {
    const resolved = getResolvedTheme(theme);
    document.documentElement.setAttribute("data-theme", resolved);
    setResolved(resolved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const r = getSystemTheme();
        setResolved(r);
        document.documentElement.setAttribute("data-theme", r);
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return { theme, resolved, setTheme, toggle };
}
