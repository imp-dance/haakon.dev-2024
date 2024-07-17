"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { ReactNode, useRef } from "react";
import { gsap } from "../../services/gsap";
export function ArticleListTitle(props: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.timeline().from(ref.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
    });
  });

  return <Title ref={ref}>{props.children}</Title>;
}

const Title = styled.h1`
  font-size: var(--font-size-fluid-3);
  padding-inline: var(--size-5);
  color: var(--text-5);
`;
