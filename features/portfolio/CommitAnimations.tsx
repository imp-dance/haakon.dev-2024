"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../../services/gsap";

type CommitType = "chore" | "fix" | "refactor" | "feat";

const commits: Array<{
  type: CommitType;
  msg: string;
}> = [
  {
    type: "chore",
    msg: "added missing translations",
  },
  {
    type: "refactor",
    msg: "moved file encoding to web workers",
  },
  {
    type: "feat",
    msg: "metrograph component",
  },
  {
    type: "fix",
    msg: "the cake is now properly a lie",
  },
  {
    type: "chore",
    msg: "updated dependencies",
  },
  {
    type: "feat",
    msg: "polished animations",
  },
  {
    type: "fix",
    msg: "reconciliated variables with figma",
  },
  {
    type: "fix",
    msg: "cleaned up vibecoded mess",
  },
  {
    type: "fix",
    msg: "accessibility concerns",
  },
  {
    type: "chore",
    msg: "small fix #52",
  },
];

export function CommitAnimations() {
  const [mounted, setMounted] = useState(false);
  const [currentI, setCurrentI] = useState(0);
  const commit = commits[currentI % commits.length];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1000); // delay first iteration of animation
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!mounted || !commit) return null;

  return (
    <Container aria-hidden="true">
      <Commit
        {...commit}
        onEnd={() => setCurrentI((p) => p + 1)}
        key={currentI}
      />
    </Container>
  );
}

function Commit(props: {
  type: CommitType;
  msg: string;
  onEnd: () => void;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    // make text type in when component mounts
    gsap.from(textRef.current, {
      text: {
        value: "",
      },
      duration: 1.5,
      ease: "circ",
      opacity: 0,
      translateX: 50,
    });
  });
  return (
    <CommitContainer onAnimationEnd={props.onEnd}>
      <code>
        <strong className={props.type}>{props.type}</strong>:{" "}
        <span ref={textRef}>{props.msg}</span>
      </code>
    </CommitContainer>
  );
}

const Container = styled.div`
  position: absolute;
  top: 60%;
  right: 20%;
`;

const CommitContainer = styled.div`
  opacity: 0.8;
  pointer-events: none;
  user-select: none;
  animation-fill-mode: both;
  filter: blur(0.2px);
  & .chore {
    color: var(--indigo-5);
  }
  & .fix {
    color: var(--green-5);
  }
  & .refactor {
    color: var(--yellow-5);
  }
  & .feat {
    color: var(--camo-5);
  }
  position: relative;
  animation: commit-msg 6s ease-in-out both;

  /*  &::after {
    content: "";
    width: 0;
    height: 0;
    --size: 8px;
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid var(--surface-2);
    position: absolute;
    top: 100%;
    left: 10px;
  } */
`;
