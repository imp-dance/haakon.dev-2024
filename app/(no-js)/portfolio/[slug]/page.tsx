import { styled } from "@pigment-css/react";
import { Divider } from "../../../../components/Divider";
import { RawHTML } from "../../../../components/RawHTML";
import { ExternalIcon } from "../../../../components/svg/ExternalIcon";
import { ButtonLink } from "../../../../components/ui/Button";
import {
  getPortfolioFiles,
  getPortfolioItem,
} from "../../../../features/portfolio/server-utils";

export async function generateStaticParams() {
  const items = await getPortfolioFiles();
  return items.map((item) => ({
    slug: item.frontMatter.id,
    data: item,
  }));
}

type PageProps = {
  params: Awaited<
    ReturnType<typeof generateStaticParams>
  >[number];
};

export default async function PortfolioItemPage(
  props: PageProps
) {
  const { slug } = props.params;
  const portfolioItem = await getPortfolioItem(slug);

  if (!portfolioItem) throw new Error("404");

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
      <h2>
        <span>{portfolioItem.frontMatter.title}</span>
        {portfolioItem.frontMatter.goto && (
          <ButtonLink
            href={portfolioItem.frontMatter.goto}
            target="_blank"
            variant="subtle"
            size="sm"
          >
            Open <ExternalIcon />
          </ButtonLink>
        )}
      </h2>
      <h3>{portfolioItem.frontMatter.subTitle}</h3>
      <Divider style={{ marginBlock: "var(--size-3)" }} />
      <div className="anim-fadedown">
        <RawHTML html={portfolioItem.html} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80ch;
  margin: 0 auto;
  padding: var(--size-5);
  padding-bottom: var(--size-11);
  & > h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-fluid-3);
    color: var(--text-pink-1);
  }
  & > h3 {
    margin-block: var(--size-2);
    font-size: var(--font-size-fluid-1);
    color: var(--text-5);
    font-weight: var(--font-weight-3);
  }
`;
