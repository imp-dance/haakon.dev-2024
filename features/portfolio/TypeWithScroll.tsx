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
          value: "~~ ~~~~~~~~~~",
        },
        opacity: 0,
        translateX: 50,
      });
  });

  const Element = (props.as ?? "div") as "div";

  return (
    <Element ref={ref} {...props}>
      {props.children}
    </Element>
  );
}

type Test = HTMLAttributes<"div">;
