"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { ReactNode, useRef } from "react";
import { gsap } from "../../services/gsap";

export function NoAiTag(props: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.timeline().to(ref.current, {
      opacity: 0.5,
      y: 0,
      delay: 0.7,
      rotate: 0,
      duration: 0.3,
    });
  });
  return <Tag ref={ref}>{props.children}</Tag>;
}

const Tag = styled.span`
  display: flex;
  padding: var(--size-2);
  background: var(--gray-7);
  width: max-content;
  border-radius: var(--radius-2);
  color: #f1f3f5;
  margin-inline: var(--size-5);
  font-size: 0.75rem;
  font-weight: var(--font-weight-7);
  opacity: 0;
  transform: translateY(10px) rotate(-5deg);
`;
