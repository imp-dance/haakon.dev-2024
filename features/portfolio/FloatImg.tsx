"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "../../services/gsap";

export function FloatImg(props: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "top 5%",
          scrub: 1,
        },
      })
      .from(ref.current, {
        filter: "grayscale(100%)",
        y: 10,
        scale: 0.95,
        duration: 0.5,
      })
      .to(ref.current, {
        opacity: 1,
        filter: "grayscale(0%)",
        y: 0,
        scale: 1,
        duration: 5,
      })
      .to(ref.current, {
        filter: "grayscale(100%)",
        opacity: 0.5,
        scale: 0.95,
        duration: 1,
      });
  });
  return (
    <Image
      ref={ref}
      src={props.src}
      alt={props.alt}
      width={350}
      height={350}
      placeholder="blur"
      blurDataURL="/images/hakon-kid.jpg"
      style={{
        float: "left",
        margin: 0,
        marginRight: "var(--size-5)",
        marginBottom: "var(--size-5)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}

const StyledMark = styled.div`
  color: var(--text-1);
  background: var(--surface-3);
  width: max-content;
  transform: rotate(4deg);
  padding: var(--size-1);
  border-radius: var(--radius-2);
  float: right;
  text-shadow: none;
  font-size: var(--font-size-1);
  user-select: none;
`;
