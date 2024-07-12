"use client";
import { styled } from "@pigment-css/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { ToggleButtonGroup } from "../../components/ui/ToggleButtonGroup";
import { PortfolioItem } from "./PortfolioItem";
import { TypeWithScroll } from "./TypeWithScroll";

export function PortfolioSectionClient(props: {
  files: {
    frontMatter: {
      id: string;
      title: string;
      subTitle: string;
      body: string;
      type: string;
      image: string;
      goto?: string;
    };
    html: string;
    name: string;
  }[];
}) {
  const { files } = props;
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    ScrollTrigger.refresh(true);
  }, [expanded.length]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <TypeWithScroll as="h2" fromText="Min erfaring::">
          My experience
        </TypeWithScroll>
        <ToggleButtonGroup style={{ width: "min-content" }}>
          <Button
            variant={
              expanded.length === files.length
                ? "primary"
                : "ghost"
            }
            size="sm"
            onClick={() => {
              setExpanded(
                files.map((file) => file.frontMatter.id)
              );
            }}
          >
            Expanded
          </Button>
          <Button
            variant={expanded.length === 0 ? "primary" : "ghost"}
            size="sm"
            onClick={() => {
              setExpanded([]);
            }}
          >
            Condensed
          </Button>
        </ToggleButtonGroup>
      </div>
      {files.map((file, index) => (
        <PortfolioItem
          item={file}
          key={file.frontMatter.title}
          isLastChild={index === files.length - 1}
          expanded={expanded.includes(file.frontMatter.id)}
          setExpanded={(newExpanded) => {
            if (newExpanded) {
              setExpanded((prev) => [
                ...prev,
                file.frontMatter.id,
              ]);
            } else {
              setExpanded((prev) =>
                prev.filter((id) => id !== file.frontMatter.id)
              );
            }
          }}
        />
      ))}
      <div style={{ height: "var(--size-5)" }} />
    </Container>
  );
}

const Container = styled.section`
  padding: var(--size-9);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  background: hsl(var(--background-hsl));
  gap: var(--size-4);
  padding-bottom: 100px;

  & > div {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: var(--size-7);
  }

  & > div > h2 {
    font-size: var(--font-size-fluid-3);
    color: var(--text-1);
    background: var(--text-highlight-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left;
    margin: var(--size-7) auto var(--size-9) 0;
  }

  & button:hover > svg {
    animation: var(--animation-bounce);
    animation-timing-function: var(--ease-elastic-in-out-3);
    animation-duration: 2.5s;
  }

  @media screen and (max-width: 768px) {
    padding: var(--size-7);
  }
`;
