"use client";

import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { useRef } from "react";
import { gsap } from "../../services/gsap";

export function Mark(props: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "-100px 75%",
          end: "-100px 55%",
          scrub: 1,
        },
      })
      .from(ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });
  });
  return <StyledMark ref={ref}>{props.text}</StyledMark>;
}

const StyledMark = styled.span`
  color: var(--text-1);
  background: var(--surface-3);
  width: max-content;
  transform: rotate(4deg);
  padding: var(--size-1);
  border-radius: var(--radius-2);
  float: right;
  text-shadow: none;
  font-size: var(--font-size-1);
  display: inline-block;
  user-select: none;
`;
