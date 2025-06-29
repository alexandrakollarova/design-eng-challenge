"use client"

import React from "react";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

/**
 * ThemeToggle component for switching between light and dark mode.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="flex items-center border border-gray-200 rounded-full px-2 py-2 h-10 dark:inherit transition"
      tabIndex={0}
      type="button"
    >
      {dark ? (
        <SunIcon size={20} className="text-primary" />
      ) : (
        <MoonIcon size={20} className="text-primary" />
      )}
    </button>
  );
} 