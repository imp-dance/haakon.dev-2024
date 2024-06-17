import { styled } from "@pigment-css/react";
import { Button, ButtonLink } from "../../components/Button";
import { Disclose } from "../../components/Disclose";
import { Divider } from "../../components/Divider";
import { RenderHTML } from "../../components/RenderHTML";
import { External } from "../../components/svg/External";
import { getPortfolioFiles } from "./server-utils";

export async function PortfolioSection() {
  const files = await getPortfolioFiles();

  const fileMapper = (file: (typeof files)[number]) => {
    return (
      <div key={file.name}>
        <ImageContainer>
          {/* Image breaks build for some reason. Should look into that. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={file.frontMatter.image}
            alt={file.frontMatter.title}
            width={200}
            height={200}
          />
        </ImageContainer>
        <Entry>
          <h2>
            <span>{file.frontMatter.title}</span>
            {file.frontMatter.goto && (
              <ButtonLink
                href={file.frontMatter.goto}
                target="_blank"
                variant="subtle"
                size="sm"
              >
                Open <External />
              </ButtonLink>
            )}
          </h2>
          <h3>{file.frontMatter.subTitle}</h3>
          <p>{file.frontMatter.body}</p>
          <Disclose
            showText="Read more"
            hideText="Collapse"
            variant="ghost"
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
            <Divider />
            <div className="anim-fadedown">
              <RenderHTML html={file.html} />
            </div>
          </Disclose>
        </Entry>
      </div>
    );
  };

  return (
    <Container>
      {files.slice(0, 4).map(fileMapper)}
      <Disclose
        showText="See older projects"
        hideText="Show less"
        variant="ghost"
      >
        {files.slice(4).map(fileMapper)}
      </Disclose>
    </Container>
  );
}

const Container = styled.section`
  padding: var(--size-9);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  scroll-snap-align: start;
  background: hsl(var(--background-hsl));
  height: 100dvh;
  overflow-y: auto;
  gap: var(--size-4);
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

const Entry = styled.div`
  background: var(--card-gradient);
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
    min-width: max-content;
    width: 100%;
    max-width: 100%;
    font-size: var(--font-size-fluid-2);
    display: flex;
    justify-content: space-between;

    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      font-size: var(--font-size-fluid-2);
    }

    & .btn {
      flex-shrink: 0;
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
  @media screen and (max-width: 768px) {
    width: 70px;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
