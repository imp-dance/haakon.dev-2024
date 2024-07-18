"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { useRef } from "react";
import { gsap } from "../../services/gsap";
export function ArticleListTitle(props: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.timeline().from(ref.current, {
      opacity: 0,
      x: 100,
      duration: 0.3,
    });

    const spans = ref.current?.querySelectorAll("span");
    if (spans) {
      gsap.timeline().from(spans, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.3,
      });
    }
  });

  return (
    <Title ref={ref}>
      {props.children.split("").map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          style={{ display: "inline-block" }}
        >
          {letter}
        </span>
      ))}
    </Title>
  );
}

const Title = styled.h1`
  font-size: var(--font-size-fluid-3);
  padding-inline: var(--size-5);
  color: var(--text-5);
`;
