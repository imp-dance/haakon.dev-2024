"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "../../services/gsap";

export function FallingCharacters(props: { children: string }) {
  return (
    <>
      {props.children.split("").map((char, index) => (
        <FallingCharacter key={index}>{char}</FallingCharacter>
      ))}
    </>
  );
}

function FallingCharacter(props: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "-50px top",
          end: "50px top",
          scrub: 0.8,
        },
      })
      .to(ref.current, {
        y: gsap.utils.random(-50, -10),
        x: gsap.utils.random(-5, 5),
        rotate: gsap.utils.random(-260, 260),
        opacity: 0,
        scale: 0.5,
      });
  });
  return (
    <div
      ref={ref}
      style={{
        display: "inline-block",
        minWidth: props.children === " " ? "0.2em" : undefined,
      }}
    >
      {props.children}
    </div>
  );
}
