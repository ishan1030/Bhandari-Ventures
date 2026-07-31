import * as React from "react";

export type Theme = "dark" | "light";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/**
 * Reads/writes the active theme by toggling the `light`/`dark` class on
 * <html> (set pre-paint by the inline script in index.html) and persisting
 * the choice to localStorage.
 */
const THEME_EVENT = "themechange";

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(currentTheme);

  // Keep every mounted instance (e.g. desktop + mobile toggles) in sync.
  React.useEffect(() => {
    const sync = () => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const applyTheme = React.useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
    setTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggle = React.useCallback(() => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  }, [applyTheme]);

  return { theme, toggle, setTheme: applyTheme };
}
