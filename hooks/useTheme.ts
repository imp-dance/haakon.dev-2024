"use client";

import { useEffect, useState } from "react";
import { getDocument } from "../utils/getDocument";

export function useCurrentTheme() {
  const [theme, setTheme] = useState(
    getDocument()?.body.classList.contains("light")
      ? "light"
      : "dark"
  );

  useEffect(() => {
    if (!getDocument()) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const theme = document.body.classList.contains("light")
            ? "light"
            : "dark";
          setTheme(theme);
        }
      });
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return theme as "light" | "dark";
}
