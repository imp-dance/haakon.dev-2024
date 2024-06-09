import { CommentSection } from "@/components/CommentSection";
import { HighlightPageCode } from "@/components/HighlightPageCode";
import { getArticle, getArticles } from "@/services/fs";
import { styled } from "@pigment-css/react";
import { formatDistance } from "date-fns";

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

export default async function ArticlePage(props: PageProps) {
  const { slug } = props.params;
  const article = await getArticle(slug);

  return (
    <Container>
      <header>
        <h1>{article.frontMatter.title}</h1>
        <p>
          {formatDistance(
            new Date(article.frontMatter.date),
            new Date(),
            {
              addSuffix: true,
            }
          )}{" "}
          <span>|</span> Håkon Underbakke
        </p>
      </header>
      <ArticleContent
        id="article-content"
        className="language-js"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <CommentSection />
      <HighlightPageCode />
    </Container>
  );
}

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
      color: var(--pink-2);
    }
    & p {
      font-size: var(--font-size-2);
      color: var(--gray-6);
      & span {
        color: var(--gray-9);
        margin: 0 var(--size-1);
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
    line-height: var(--font-lineheight-4);
    color: var(--gray-4);
  }

  & p {
    color: var(--gray-3);
    text-shadow: 0px 1px 0px var(--gray-12);
  }

  & h3 {
    margin-top: var(--size-5);
  }

  & img {
    max-width: min(100%, 700px);
  }

  & pre {
    background: var(--gray-11);
    padding: var(--size-2);
    max-width: 100%;
    width: 100%;
    font-size: var(--font-size-2);
    overflow: auto;
    opacity: 0;
  }

  & pre[class*="language-"] {
    background: var(--gradient-8);
    position: relative;
    cursor: text;
    font-size: var(--font-size-2);
    opacity: 0;
    animation: animFadeDown 0.25s forwards;
    animation-timing-function: var(--ease-in-out-2);
  }
`;
