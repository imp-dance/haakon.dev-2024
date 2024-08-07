"use client";
import { useGSAP } from "@gsap/react";
import classNames from "classnames";
import { CSSProperties, useRef } from "react";
import { gsap } from "../../services/gsap";
import { createAnimationMap } from "../../types/animation";
import styles from "./MeSVG.module.css";

export const MeSVG = (props: {
  style?: CSSProperties;
  className?: string;
}) => {
  const pcRef = useRef<SVGGElement>(null);
  const personRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    animations.pc(pcRef.current);
    animations.person(personRef.current, pcRef.current);
  });

  return (
    <svg
      width={1149}
      height={921}
      fill="none"
      viewBox="0 0 1149 921"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(props.className, styles.svg)}
      style={props.style}
    >
      <g id="PC" ref={pcRef} style={{ filter: "brightness(1)" }}>
        <path
          d="m480 742.5-168-54 184-102L631.5 634 480 742.5Z"
          fill="#D9D9D9"
          id="KEYBOARD"
        />
        <path
          d="m427.5 715.5-94-30.5 164-91 65.5 26.5-135.5 95Z"
          fill="#B9B9B9"
          id="KEYS"
        />
        <path
          d="m312 689-86.5-174.5L419 435l76 151.5L312 689Z"
          fill="var(--screen-color)"
          id="SCREEN"
        />
      </g>
      <g
        id="person"
        ref={personRef}
        style={{ filter: "brightness(1)" }}
      >
        <path
          d="M825 189c-80.8-55.6-163.667-8.667-205 14.5-9.024 9.776-25.784 31.875-27.5 48.736 1.5 21.088 6.8 65.664 16 75.264 11.5 12 23.5 51.5 18 53.5s27 39 32.5 63 31 27.5 55.5 29 135-131.5 138.5-137.5c8-58-8.5-103-28-146.5Z"
          fill="var(--skin-color)"
          id="HEAD"
        />
        <path
          d="M853 322c-2.396 23.5 0 142.5 79.5 116-48.358 23.228-153.001 76.813-180.098 95.193.215 3.752-1.245 6.069-4.902 6.307-3.404.222-1.248-2.136 4.902-6.307-.867-15.124-28.937-53.563-49.902-73.193l9.5-45.5c26.833-96.333 154.669-226.559 141-92.5Z"
          fill="var(--skin-color)"
        />
        <path
          d="M654.5 372c5-6-24.5-43.5-11.5-42 7.45.86 14.661-1.48 19.5-3.856 8 51.644 44.5 84.356 52 132.356s-66 12.5-65 5.5-6.5-51.5-6.5-51.5c12.5-3.5 6.5-34.5 11.5-40.5Z"
          fill="#783C2F"
          id="BEARD"
        />
        <path
          d="M495 581.5c-10 7.2-14.167 23.333-15 30.5-2.8 2.8 1.167 5.5 3.5 6.5 3.833-.833 11.5-1.7 11.5 1.5 0 4-6.5 5 16.5 9.5s11.5-5 34 3.5c18 6.8 51.5-5.833 66-13L856 608.5 800 570l-188.5 11.5c-13.667-6-43.9-17.4-55.5-15-14.5 3-37.5-1-44.5 0s-4 6-16.5 15ZM495.5 789.5c30.8-1.2 87.833-96.167 112.5-143.5l82.5 143.5c-1.833 9.167-15.9 34.8-57.5 64-41.6 29.2-146.333 1.833-193.5-15.5 5.833-15.667 25.2-47.3 56-48.5Z"
          fill="var(--skin-color)"
          id="RIGHT_LOWER_ARM"
          className={styles.rightLowerArm}
        />
        <path
          d="M618.5 609c-2.8 23.2-39.5 89.333-57.5 119.5 0 45.2 82.5 71.833 120.5 80.5l-19 85 153 2.5 323-75c-76.5-33-71-344.5-120-373-17.42-10.134-88-15-130.5-15-12.5 48-124 84.5-137 84.5-7.5 19-129 62-132.5 91Z"
          fill="var(--gray-9)"
          id="SHIRT"
        />
        <path
          d="M452.5 849c-19.6-2-18.167-81.167-15-120.5-8.5 3.5-41.5-21.5-43-29.5S384 683 376 677.5s8.5-15.5 4-22.5 21-29 28.5-29c6 0 9.833 2.667 11 4 4-4 13.2-10.4 18-4 6 8 49 27.5 55.5 39s12.5 8.5 0 42c-10 26.8 45.167 75.833 74 97-30 15.833-94.9 47-114.5 45Z"
          fill="var(--skin-color)"
          id="LEFT_LOWER_ARM"
          className={styles.leftLowerArm}
        />
      </g>
    </svg>
  );
};

const animations = createAnimationMap({
  pc: (el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 30%",
          end: "400px 30%",
          scrub: 1,
        },
      })
      .to(el, {
        y: 100,
        scale: 4,
        x: -100,
        rotate: 25,
        filter: "brightness(0)",
      });
  },
  person: (el, trigger) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger,
          start: "top 30%",
          end: "400px 30%",
          scrub: 1,
        },
      })
      .to(el, {
        y: "100%",
        scale: 0.8,
        x: "100%",
        rotate: 25,
        filter: "brightness(0)",
      });
  },
});
