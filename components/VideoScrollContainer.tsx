"use client";

import { styled } from "@pigment-css/react";
import { useEffect, useRef } from "react";

export function VideoScrollContainer(props: {
  children: React.ReactNode;
  videoSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, []);
  return (
    <Container>
      <video ref={videoRef} autoPlay muted loop>
        <source src={props.videoSrc} type="video/mp4" />
      </video>
      <InnerContainer>{props.children}</InnerContainer>
    </Container>
  );
}

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: hsl(var(--background-hsl) / 90%);
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-timeline: --aboutMeSectionTimeline y;
  scroll-timeline: --aboutMeSectionTimeline vertical;
  height: 100dvh;
  display: flex;

  > div {
    padding: var(--size-9);
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
  & p {
    font-size: var(--font-size-fluid-1);
    color: var(--text-2);
    text-shadow: 0 1px 0 hsl(var(--background-hsl));
    line-height: var(--font-lineheight-2);
  }

  & > .progress {
    animation-name: scrollAnimAboutMeSection;
    animation-duration: 1ms;
    animation-timeline: --aboutMeSectionTimeline;
    transform-origin: top center;
    transform: scaleY(0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--pink-2);
    @keyframes scrollAnimAboutMeSection {
      to {
        transform: scaleX(1);
      }
    }
  }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: var(--gray-12);
  position: relative;
  overflow: hidden;
  & > video {
    position: absolute;
    z-index: 1;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
