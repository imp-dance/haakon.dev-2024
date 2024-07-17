"use client";
import { useGSAP } from "@gsap/react";
import { styled } from "@pigment-css/react";
import { formatDistance } from "date-fns";
import { useRef } from "react";
import { ButtonLink } from "../../components/ui/Button";
import { gsap } from "../../services/gsap";
import { Article } from "./types";

export function ArticleListItem(props: {
  article: Article;
  index?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { article, index } = props;

  useGSAP(() => {
    gsap
      .timeline()
      .from(titleRef.current, {
        opacity: 0,
        delay: index ? index * 0.02 : 0,
      })
      .to(ref.current, {
        opacity: 1,
        delay: index ? index * 0.02 : 0,
        duration: 0.05,
      });
    if (imgRef.current) {
      gsap.timeline().from(imgRef.current, {
        opacity: 0,
        delay: index ? index * 0.04 : 0,
        duration: 0.25,
        translateY: "-100%",
      });
    }
  });
  return (
    <StyledButtonLink
      buttonRef={ref}
      title={article.frontMatter.title}
      href={`/articles/${article.name.replace(".md", "")}`}
      variant="ghost"
    >
      {article.frontMatter.img ? (
        // Purely decorative image
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          src={article.frontMatter.img}
          aria-hidden="true"
          loading="lazy"
          ref={imgRef}
        />
      ) : null}
      <Title ref={titleRef}>{article.frontMatter.title}</Title>
      <p
        style={{
          color: "var(--text-6)",
        }}
      >
        {formatDistance(
          new Date(article.frontMatter.date),
          new Date(),
          {
            addSuffix: true,
          }
        )}
      </p>
    </StyledButtonLink>
  );
}

const StyledButtonLink = styled(ButtonLink)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  position: relative;
  transition: transform 0.2s var(--ease-out-1);

  &:active {
    transform: scale(0.99);
  }

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: grayscale(100%) sepia() saturate(100%)
      hue-rotate(198deg) blur(4px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
  }

  &:hover img {
    opacity: 0.05;
  }

  & p {
    z-index: 1;
    position: relative;
  }
`;

const Title = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: var(--font-size-fluid-2);
  position: relative;
  z-index: 1;
`;
