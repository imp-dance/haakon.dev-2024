import { styled } from "@pigment-css/react";
import { formatDistance } from "date-fns";
import { Metadata } from "next";
import { ExternalIcon } from "../../components/svg/ExternalIcon";
import { ButtonLink } from "../../components/ui/Button";
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
      <h1
        style={{
          paddingInline: "var(--size-5)",
          color: "var(--text-5)",
        }}
      >
        Articles
      </h1>
      <List>
        {articles.map((article) => (
          <li key={article.name}>
            <StyledButtonLink
              title={article.frontMatter.title}
              href={`/articles/${article.name.replace(
                ".md",
                ""
              )}`}
              variant="ghost"
            >
              <Title>{article.frontMatter.title}</Title>
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

const StyledButtonLink = styled(ButtonLink)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  transition: transform 0.2s var(--ease-out-1);

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.99);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  & h1 {
    font-size: var(--font-size-fluid-3);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  & li {
    max-inline-size: 100%;

    & .btn:hover {
      text-decoration: none;
      & h3 {
        text-decoration: underline;
      }
    }
  }
`;

const Title = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: var(--font-size-fluid-2);
`;
