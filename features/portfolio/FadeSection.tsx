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
          start: "top 95%",
          end: "bottom 5%",
          scrub: 1,
        },
      })
      .from(ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1,
      })
      .to(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 5,
      })
      .to(ref.current, {
        opacity: 0,
        y: -50,
        duration: 1,
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
