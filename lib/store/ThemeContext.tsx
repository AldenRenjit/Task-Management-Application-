<<<<<<< HEAD
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  accentColor: string;
  setAccentColor: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined")
      return true;

    const stored =
      localStorage.getItem("darkMode");

    return stored
      ? JSON.parse(stored)
      : true;
  });

  const [accentColor, setAccentColor] =
    useState(() => {
      if (typeof window === "undefined")
        return "#3b82f6";

      return (
        localStorage.getItem("accentColor") ||
        "#3b82f6"
      );
    });

  useEffect(() => {
    const root =
      window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.setProperty(
      "--accent-color",
      accentColor
    );

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "accentColor",
      accentColor
    );
  }, [darkMode, accentColor]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      accentColor,
      setAccentColor,
    }),
    [darkMode, accentColor]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
=======
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  accentColor: string;
  setAccentColor: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined")
      return true;

    const stored =
      localStorage.getItem("darkMode");

    return stored
      ? JSON.parse(stored)
      : true;
  });

  const [accentColor, setAccentColor] =
    useState(() => {
      if (typeof window === "undefined")
        return "#3b82f6";

      return (
        localStorage.getItem("accentColor") ||
        "#3b82f6"
      );
    });

  useEffect(() => {
    const root =
      window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.setProperty(
      "--accent-color",
      accentColor
    );

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "accentColor",
      accentColor
    );
  }, [darkMode, accentColor]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      accentColor,
      setAccentColor,
    }),
    [darkMode, accentColor]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
>>>>>>> 4835df88119b320e10bcb9bfe7c23adbbcd7ea3c
}