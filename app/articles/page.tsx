import { ButtonLink } from "@/components/Button";
import { getArticles } from "@/services/fs";
import { styled } from "@pigment-css/react";
import { formatDistance } from "date-fns";

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <Container>
      <h1>Archive</h1>
      <List>
        {articles.map((article) => (
          <li key={article.name}>
            <ButtonLink
              title={article.frontMatter.title}
              href={`/articles/${article.name.replace(
                ".md",
                ""
              )}`}
              variant="ghost"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Title>{article.frontMatter.title}</Title>
              <p
                style={{
                  color: "var(--gray-6)",
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
            </ButtonLink>
          </li>
        ))}
      </List>
    </Container>
  );
}

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
  }
`;

const Title = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: var(--font-size-fluid-2);
`;
