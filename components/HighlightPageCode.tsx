"use client";

import { useLayoutEffect } from "react";

export function HighlightPageCode() {
  useLayoutEffect(() => {
    document.querySelectorAll("pre").forEach((pre) => {
      // @ts-ignore
      Prism.highlightElement(pre);
      pre.style.opacity = "1";
    });
  }, []);
  return (
    <noscript>
      <style>{`pre[class*="language-"] { display: block !important; }`}</style>
    </noscript>
  );
}
