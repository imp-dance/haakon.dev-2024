import { styled } from "@pigment-css/react";
import { Metadata } from "next";
import { ExternalIcon } from "../../components/svg/ExternalIcon";
import { ButtonLink } from "../../components/ui/Button";
import { ArticleListItem } from "../../features/articles/ArticleListItem";
import { ArticleListTitle } from "../../features/articles/ArticleListTitle";
import { getArticles } from "../../features/articles/server-utils";

export const metadata: Metadata = {
  title: "Articles | Håkon Underbakke",
  description:
    "I'm a Norwegian frontend developer currently doing contract work for my own company, Ryfylke React AS. ",
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <Container>
      <ButtonLink
        size="sm"
        variant="ghost"
        style={{
          justifyContent: "flex-start",
          color: "var(--text-5)",
        }}
        href="/"
      >
        ← Portfolio
      </ButtonLink>
      <ArticleListTitle>Articles</ArticleListTitle>
      <List>
        {articles.map((article, index) => (
          <li key={article.name}>
            <ArticleListItem article={article} index={index} />
          </li>
        ))}
        <li style={{ padding: "var(--size-3) var(--size-5)" }}>
          <ButtonLink
            variant="subtle"
            target="_blank"
            href="https://impedans.me/web/?s="
          >
            Articles from my old blog
            <ExternalIcon />
          </ButtonLink>
        </li>
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
`;

const List = styled.ul`
  list-style: none;
  padding: var(--size-4);
  margin: calc(var(--size-4) * -1);
  margin-top: 0;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  overflow: hidden;

  &:hover li {
    opacity: 0.25;
  }

  & li {
    max-inline-size: 100%;
    transition: transform 0.15s var(--ease-elastic-out-1),
      opacity 0.15s var(--ease-elastic-out-1);

    &:hover {
      transform: scale(1.02);
      opacity: 1;
    }

    &:has(+ li:hover),
    &:hover + li {
      opacity: 0.5;
    }

    &:hover + li + li,
    &:has(+ li + li:hover) {
      opacity: 0.3;
    }

    & .btn:hover {
      text-decoration: none;
      & h3 {
        text-decoration: underline;
      }
    }
  }
`;
