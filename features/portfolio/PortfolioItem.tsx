"use client";
import { styled } from "@pigment-css/react";
import { CSSProperties, useState } from "react";
import { Disclose } from "../../components/Disclose";
import { Divider } from "../../components/Divider";
import { RawHTML } from "../../components/RawHTML";
import { ExternalIcon } from "../../components/svg/ExternalIcon";
import { Button, ButtonLink } from "../../components/ui/Button";

export function PortfolioItem(props: {
  item: {
    frontMatter: {
      id: string;
      title: string;
      subTitle: string;
      body: string;
      type: string;
      image: string;
      goto?: string | undefined;
    };
    html: string;
    name: string;
  };
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Container>
      <ImageContainer>
        {/* Image breaks build for some reason. Should look into that. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={props.item.frontMatter.image}
          alt={props.item.frontMatter.title}
          width={200}
          height={200}
        />
      </ImageContainer>
      <Entry
        style={
          {
            background: expanded
              ? "conic-gradient(from 90deg at 50% 0%, #1110, 50%, #2222220d, #11111126)"
              : undefined,
          } as CSSProperties
        }
      >
        <h2>
          <span>{props.item.frontMatter.title}</span>
          {props.item.frontMatter.goto && (
            <ButtonLink
              href={props.item.frontMatter.goto}
              target="_blank"
              variant="subtle"
              size="sm"
            >
              Open <ExternalIcon />
            </ButtonLink>
          )}
        </h2>
        <h3>{props.item.frontMatter.subTitle}</h3>
        <p>{props.item.frontMatter.body}</p>
        <Disclose
          showText="Read more"
          hideText="Collapse"
          variant="ghost"
          controls={{
            isDisclosed: expanded,
            setIsDisclosed: setExpanded,
          }}
          renderButton={
            <Button
              variant="ghost"
              style={{
                width: "max-content",
                border: "none",
                boxShadow: "none",
              }}
            />
          }
        >
          <Divider style={{ marginBlock: "var(--size-3)" }} />
          <div className="anim-fadedown">
            <RawHTML html={props.item.html} />
          </div>
        </Disclose>
      </Entry>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: var(--size-7);
`;

const Entry = styled.div`
  background: var(--card-gradient);
  transition: background 0.6s var(--ease-out-2);
  color: var(--text-2);
  padding: var(--size-6);
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  border: none;
  height: max-content;
  border-radius: var(--radius-1);
  box-shadow: var(--ui-shadow);
  width: 100%;
  & h2 {
    font-size: var(--font-size-fluid-2);
    display: flex;
    justify-content: space-between;
    max-width: 100%;

    & span {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: var(--font-size-fluid-2);
      flex: 1;
      min-width: 0;
    }

    & .btn {
      flex-shrink: 0;
      height: min-content;
    }
  }
  & h3 {
    font-weight: var(--font-weight-2);
    font-size: var(--font-size-1);
    color: var(--text-1);
  }
  & p {
    color: var(--text-5);
    font-size: var(--font-size-3);

    font-weight: var(--font-weight-4);
  }

  @media screen and (max-width: 768px) {
    & h2 .btn {
      display: none;
    }
  }
`;
const ImageContainer = styled.div`
  width: 200px;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  & > img {
    filter: grayscale(0.85);
    position: absolute;
    pointer-events: none;
    user-select: none;
    top: var(--size-2);
    left: var(--size-2);
    right: var(--size-2);

    border-radius: 50%;
    border: 1px solid var(--surface-4);
    aspect-ratio: 1 / 1;
    width: 95%;
  }
  @media screen and (max-width: 820px) {
    width: 100px;
  }
  @media screen and (max-width: 768px) {
    width: 70px;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
