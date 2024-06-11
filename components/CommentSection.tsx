"use client";
import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function CommentSection() {
  const [theme, setTheme] = useState(
    typeof document !== undefined
      ? document.body.classList.contains("light")
        ? "light"
        : "dark"
      : "dark"
  );

  useEffect(() => {
    if (typeof document === undefined) return;
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

  return (
    <>
      <noscript>
        <h4
          style={{
            padding: "var(--size-5)",
            background: "var(--surface-1)",
            color: "var(--text-pink-1)",
          }}
        >
          This is where comments would be, if you had Javascript
          enabled!
        </h4>
      </noscript>
      <Giscus
        repo="imp-dance/haakon.dev-2022"
        repoId="R_kgDOHmeYng"
        category="General"
        categoryId="DIC_kwDOHmeYns4CX3IT"
        mapping="pathname"
        emitMetadata="0"
        reactionsEnabled="1"
        theme={theme}
        lang="en"
        loading="lazy"
        strict="0"
        inputPosition="top"
      />
    </>
  );
}
