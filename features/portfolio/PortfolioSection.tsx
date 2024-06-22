import { styled } from "@pigment-css/react";
import { ButtonLink } from "../../components/Button";
import { Disclose } from "../../components/Disclose";
import { GoToTopLink } from "../../components/GoToTopLink";
import { PortfolioItem } from "./PortfolioItem";
import { getPortfolioFiles } from "./server-utils";

export async function PortfolioSection() {
  const files = await getPortfolioFiles();

  return (
    <Container>
      {files.slice(0, 4).map((file) => (
        <PortfolioItem
          item={file}
          key={file.frontMatter.title}
        />
      ))}
      <Disclose
        showText="Show more projects"
        hideText="Show less projects"
        variant="ghost"
      >
        {files.slice(4).map((file) => (
          <PortfolioItem
            item={file}
            key={file.frontMatter.title}
          />
        ))}
      </Disclose>
      <ButtonLink href="/brain" variant="ghost">
        Search my brain &nbsp; 🔎
      </ButtonLink>
      <GoToTopLink />
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

  & button:hover > svg {
    animation: var(--animation-bounce);
    animation-timing-function: var(--ease-elastic-in-out-3);
    animation-duration: 2.5s;
  }

  @media screen and (max-width: 768px) {
    padding: var(--size-7);
  }
`;
