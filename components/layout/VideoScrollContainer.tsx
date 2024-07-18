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
          end: "bottom 100%",
          scrub: 1.5,
          snap: {
            snapTo: "labels",
            duration: { min: 0.1, max: 0.5 },
            delay: 0.2,
            ease: "power1.inOut",
          },
        },
      })
      .from(el, {
        scale: 0.5,
        filter: "saturate(4) brightness(0.5)",
        duration: 1,
        clipPath: "circle(40%)",
      })
      .to(el, {
        scale: 1,
        filter: "saturate(4) brightness(0.4) grayscale(1)",
        duration: 4,
        clipPath: "circle(100%)",
      })
      .to(el, {
        filter: "saturate(4) brightness(0.1) grayscale(1)",
        duration: 1,
      });
  },
  innerContainer: (el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".vscroll-cont",
          start: "top top",
          end: "bottom 100%",
          scrub: 1.5,
        },
      })
      .from(el, {
        opacity: 0,
        duration: 0.2,
        scale: 0.6,
      })
      .to(el, {
        opacity: 1,
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
`;

const Container = styled.div`
  background: var(--bg-contrast);
  position: relative;

  & > video {
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    filter: saturate(4) brightness(0.9);
    clip-path: circle(40%);
  }

  @media screen and (max-width: 800px) {
    & > video {
      display: none;
    }
  }
`;
