"use client";
import { useGSAP } from "@gsap/react";
import { HTMLAttributes, JSX, ReactNode, useRef } from "react";
import { gsap } from "../../services/gsap";

export function TypeWithScroll<
  T extends keyof JSX.IntrinsicElements = "div"
>(
  props: {
    as?: T;
    children: ReactNode;
    fromText?: string;
    duration?: number;
  } & Record<string, unknown>
) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
          end: "bottom 0%",
          toggleActions: "play reset play reset",
        },
      })
      .from(ref.current, {
        text: {
          value: props.fromText ?? "~~ ~~~~~~~~~~",
        },
        opacity: 0,
        duration: props.duration ?? 0.75,
        translateX: 50,
        ease: "circ",
      });
  }, [props.fromText]);

  const Element = (props.as ?? "div") as "div";

  return (
    <Element ref={ref} {...props}>
      {props.children}
    </Element>
  );
}

type Test = HTMLAttributes<"div">;
