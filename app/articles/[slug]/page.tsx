import { styled } from "@pigment-css/react";
import { formatDistance } from "date-fns";
import { Metadata } from "next";
import { ButtonLink } from "../../../components/Button";
import { External } from "../../../components/svg/External";
import { CommentSection } from "../../../features/articles/CommentSection";
import {
  getArticle,
  getArticles,
} from "../../../features/articles/server-utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.name.replace(/\.md$/, ""),
    data: article,
  }));
}

type PageProps = {
  params: Awaited<
    ReturnType<typeof generateStaticParams>
  >[number];
};

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = props.params;
  const article = await getArticle(slug);
  return {
    title: `${article.frontMatter.title} | Håkon Underbakke`,
    description: article.frontMatter.summary,
  };
}

export default async function ArticlePage(props: PageProps) {
  const { slug } = props.params;
  const article = await getArticle(slug);

  return (
    <Container>
      <header>
        <h1>{article.frontMatter.title}</h1>
        <p>
          <ButtonLink
            size="sm"
            variant="ghost"
            style={{
              justifyContent: "flex-start",
              color: "var(--text-5)",
            }}
            href="/articles"
          >
            ← Back to articles
          </ButtonLink>
          {formatDistance(
            new Date(article.frontMatter.date),
            new Date(),
            {
              addSuffix: true,
            }
          )}{" "}
          <span>|</span> by Håkon Underbakke
        </p>
      </header>
      <ArticleContent
        id="article-content"
        className="language-js"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <CommentSection />
      <GithubLink
        target="_blank"
        href={`https://github.com/imp-dance/haakon.dev-2024/blob/main/public/articles/${article.name}.md`}
      >
        <External /> Edit this page @ Github 🧑‍💻
      </GithubLink>
      <div style={{ height: "var(--size-9)" }} />
    </Container>
  );
}

const GithubLink = styled("a")`
  display: flex;
  gap: var(--size-3);
  margin: var(--size-3);
  margin-left: 0;
  margin-right: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & > header {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
    & h1 {
      font-size: var(--font-size-fluid-3);
      color: var(--text-pink-2);
    }
    & p {
      font-size: var(--font-size-2);
      color: var(--text-6);
      display: flex;
      gap: var(--size-3);
      align-items: center;

      & span {
        color: var(--surface-3);
        user-select: none;
      }
    }
  }
`;

const ArticleContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--size-4);

  & p,
  & li,
  & code,
  & pre,
  & blockquote {
    font-size: var(--font-size-fluid-1);
    line-height: var(--font-lineheight-3);
    color: var(--text-4);
  }

  code {
    color: var(--text-4);
  }

  pre code {
    color: var(--gray-4);
  }

  & p {
    color: var(--text-3);
  }

  & h3 {
    margin-top: var(--size-5);
  }

  & img {
    width: 100%;
    max-width: 100%;
    border-radius: var(--radius-2);
  }

  & pre {
    background: var(--gray-11);
    padding: var(--size-2);
    max-width: 100%;
    width: 100%;
    font-size: var(--font-size-2);
    overflow: auto;
    background: var(--gradient-8) !important;
  }

  & .window {
    background: var(--surface-1);
    border: 1px solid var(--surface-3);
    overflow: hidden;
    border-radius: var(--radius-2);
    & > p {
      padding: var(--size-2) var(--size-5);
      font-size: var(--font-size-1);
      font-weight: var(--font-weight-5);
      color: var(--text-4);
      background: var(--surface-2);
      width: max-content;
      user-select: none;
    }
  }
  & .gallery {
    counter-reset: gallery;
  }
  & .gallery,
  & .gallery > p {
    display: flex;
    overflow-x: scroll;
    gap: var(--size-3);
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    & > img {
      max-width: 100%;
      min-width: 100%;
      flex-shrink: 0;
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      scroll-snap-align: start;
      position: relative;
      counter-increment: gallery;
      &::after {
        content: counter(gallery);
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
`;
