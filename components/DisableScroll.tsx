"use client";

import { useEffect } from "react";

export function DisableScroll() {
  useEffect(() => {
    const existing = document.getElementById("disable-scroll");
    if (existing) {
      return;
    }
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
            body,
            html {
            overflow: hidden;
            }
        `;
    styleEl.id = "disable-scroll";
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  return null;
}
