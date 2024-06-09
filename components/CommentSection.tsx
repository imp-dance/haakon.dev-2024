"use client";
import Giscus from "@giscus/react";

export function CommentSection() {
  return (
    <>
      <noscript>
        <h4
          style={{
            padding: "var(--size-5)",
            background: "var(--gray-10)",
            color: "var(--pink-1)",
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
        theme="dark"
        lang="en"
        loading="lazy"
        strict="0"
        inputPosition="top"
      />
    </>
  );
}
