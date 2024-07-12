"use client";

import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { gsap } from "../../services/gsap";
import { createAnimationMap } from "../../types/animation";

export function VideoScrollContainer(props: {
  children: React.ReactNode;
  videoSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isSmallscreen = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, []);

  useGSAP(() => {
    if (isSmallscreen) return;
    animations.video(videoRef.current);
    animations.innerContainer(innerRef.current);
  }, [isSmallscreen]);
  return (
    <>
      <Container className="vscroll-cont">
        <video id="bg-video" ref={videoRef} autoPlay muted loop>
          <source src={props.videoSrc} type="video/mp4" />
        </video>
        <InnerContainer ref={innerRef}>
          {props.children}
        </InnerContainer>
      </Container>
    </>
  );
}

const animations = createAnimationMap({
  video: (el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".vscroll-cont",
          start: "top top",
          end: "2500px top",
          scrub: 1,
        },
      })
      .from(el, {
        scale: 0.5,
        filter: "saturate(4) brightness(0.5)",
        duration: 0.5,
      })
      .to(el, {
        scale: 1,
        filter: "saturate(4) brightness(0.4)",
        duration: 4,
      })
      .to(el, {
        filter: "saturate(4) brightness(0.1)",
        duration: 1,
      });
  },
  innerContainer: (el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".vscroll-cont",
          start: "top top",
          end: "100% top",
          scrub: 1.5,
        },
      })
      .from(el, {
        opacity: 0,
        duration: 0.2,
      })
      .to(el, {
        scale: 0.95,
        duration: 0.5,
      });
  },
});

const InnerContainer = styled.div`
  position: relative;
  top: 0;
  z-index: 2;
  background: hsl(from var(--bg-contrast) h s l / 69%);
  backdrop-filter: blur(10px);
  min-height: 100vh;
  min-height: 100svh;
  @media screen and (max-width: 800px) {
    background: hsl(from var(--bg-contrast) h s l / 95%);
    min-height: auto;
  }
  display: flex;

  @media screen and (max-width: 800px) {
    border: 0;
  }
  > div {
    padding: var(--size-9);
    padding-top: var(--size-11);

    @media screen and (max-width: 800px) {
      padding: var(--size-9) var(--size-6);
    }
    display: flex;
    flex-direction: column;
    gap: var(--size-6);
    max-width: 90%;
    margin: auto auto;
  }
  & code {
    color: var(--text-1);
  }

  & h2 {
    font-size: var(--font-size-fluid-3);
    color: var(--text-1);
    background: var(--text-highlight-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & p,
  & blockquote {
    font-size: var(--font-size-fluid-1);
    color: var(--text-2);
    text-shadow: 0 1px 0 hsl(var(--background-hsl));
    line-height: var(--font-lineheight-3);
    text-wrap: pretty;
  }
`;

const Container = styled.div`
  background: var(--bg-contrast);
  position: relative;

  & > video {
    position: sticky;
    z-index: 1;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    filter: saturate(4) brightness(0.9);
    margin-bottom: var(--size-9);
  }

  @media screen and (max-width: 800px) {
    & > video {
      display: none;
    }
  }
`;
