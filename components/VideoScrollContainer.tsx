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
      <AboveVideo />
      <video ref={videoRef} autoPlay muted loop>
        <source src={props.videoSrc} type="video/mp4" />
      </video>
      <InnerContainer>{props.children}</InnerContainer>
    </Container>
  );
}

const AboveVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(-180deg, black, transparent);
  background-size: 100% 1000px;
  background-repeat: no-repeat;
  z-index: 2;
  border-top: 1px solid var(--text-pink-2);
`;

const InnerContainer = styled.div`
  position: relative;
  top: 0;
  z-index: 2;
  background: hsl(var(--background-hsl) / 70%);
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;
  min-height: 1050px;
  display: flex;
  border-top: 1px solid var(--text-pink-2);
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
    transform-origin: top center;
    transform: scaleY(0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--pink-2);
  }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: var(--gray-12);
  position: relative;
  overflow: visible;
  max-height: auto;
  & > video {
    position: sticky;
    z-index: 1;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 80%;
    width: 100%;
  }
`;
