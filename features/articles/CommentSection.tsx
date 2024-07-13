"use client";
import Giscus from "@giscus/react";
import { styled } from "@pigment-css/react";
import { useCurrentTheme } from "../../hooks/useTheme";

export function CommentSection() {
  const theme = useCurrentTheme();
  return (
    <>
      <noscript>
        <FallbackText>
          This is where comments would be, if you had Javascript
          enabled!
        </FallbackText>
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

const FallbackText = styled.h4`
  padding: var(--size-5);
  background: var(--surface-1);
  color: var(--text-pink-1);
`;
