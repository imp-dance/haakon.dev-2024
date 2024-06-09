"use client";

import { styled } from "@pigment-css/react";
import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

export function ScrollProgress(props: { selector?: string }) {
  const [progress, setProgress] = useState(0);
  const prevSelector = useRef<string | undefined>();
  const selectorHeight = useRef<number>();

  function handleScroll() {
    const scroll = document.documentElement.scrollTop;
    const height = props.selector
      ? selectorHeight.current!
      : document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrolled = scroll / height;
    setProgress(scrolled);
  }

  useEffect(() => {
    if (prevSelector.current !== props.selector) {
      selectorHeight.current = props.selector
        ? document
            .querySelector(props.selector)
            ?.getBoundingClientRect().height
        : document.documentElement.scrollHeight;
    }
    prevSelector.current = props.selector;

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.selector]);

  return (
    <StyledDiv
      style={{ "--progress": progress } as CSSProperties}
    />
  );
}

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 0.25rem;
  background: var(--pink-1);
  transform: scaleY(var(--progress));
  transform-origin: top left;
  transition: transform 0.1s var(--ease-in-out-2);
`;
