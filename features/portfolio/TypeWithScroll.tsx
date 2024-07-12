"use client";
import { useGSAP } from "@gsap/react";
import { HTMLAttributes, JSX, ReactNode, useRef } from "react";
import { gsap } from "../../services/gsap";

export function TypeWithScroll<
  T extends keyof JSX.IntrinsicElements = "div"
>({
  as,
  children,
  fromText,
  duration,
  ...rest
}: {
  as?: T;
  children: ReactNode;
  fromText?: string;
  duration?: number;
} & Record<string, unknown>) {
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
          value: fromText ?? "~~ ~~~~~~~~~~",
        },
        opacity: 0,
        duration: duration ?? 0.75,
        translateX: 50,
        ease: "circ",
      });
  }, [fromText]);

  const Element = (as ?? "div") as "div";

  return (
    <Element ref={ref} {...rest}>
      {children}
    </Element>
  );
}

type Test = HTMLAttributes<"div">;
