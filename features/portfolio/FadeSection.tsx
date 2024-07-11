"use client";

import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { ReactNode, useRef } from "react";
import { gsap } from "../../services/gsap";

export function FadeSection(props: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 70%",
          scrub: 1,
        },
      })
      .from(ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });
  });
  return <Container ref={ref}>{props.children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-6);
  margin: var(--size-9) 0;
`;
