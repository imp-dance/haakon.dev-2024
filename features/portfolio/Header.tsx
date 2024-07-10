import { styled } from "@pigment-css/react";
import { ChevronDownIcon } from "../../components/svg/ChevronDownIcon";
import { MeSVG } from "../../components/svg/MeSVG";
import { ButtonLink } from "../../components/ui/Button";
import { getAge } from "../../utils/getAge";
import { ContactDialog } from "./ContactDialog";

export function Header() {
  return (
    <Container id="top">
      <div>
        <h1>
          <div>Hi, my name is</div>
        </h1>
        <h1>
          <span>Håkon Underbakke</span>
        </h1>
        <Subtext>
          I&apos;m a Norwegian frontend developer currently doing
          contract work for my own company,{" "}
          <strong>Ryfylke React AS</strong>.
        </Subtext>
        <Subtext>
          I have been doing front-end focused web development
          professionally for about {getAge() - 18} years. These
          days, I mostly work with <code>React</code> and{" "}
          <code>Typescript</code>.
        </Subtext>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--size-5)",
            flexWrap: "wrap",
          }}
        >
          <ButtonLink
            href="/articles"
            variant="secondary"
            style={{ flexGrow: 1 }}
          >
            Articles
          </ButtonLink>
          <ContactDialog />
        </div>
      </div>
      <StyledMeSvg />
      <ChevronDownIcon className="chevron" />
    </Container>
  );
}

const StyledMeSvg = styled(MeSVG)`
  position: absolute;
  right: -3%;
  bottom: -8%;
  z-index: 0;
  --width: 50vw;
  width: var(--width);
  max-width: var(--width);

  @media screen and (max-width: 1200px) {
    --width: 60vw;
  }
  @media screen and (max-width: 890px) {
    --width: 80vw;
  }
`;

const Subtext = styled.p`
  background: var(--text-subtle-highlight);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: var(--font-size-fluid-1);
  letter-spacing: (--font-letterspacing-3);
  font-weight: var(--font-weight-4);
  opacity: 0;
  animation: var(--animation-fade-in) forwards;
  animation-timing-function: var(--ease-in-3);
  animation-duration: 0.4s;

  & code {
    color: var(--text-1);
    -webkit-background-clip: none;
    -webkit-text-fill-color: var(--text-1);
    font-size: var(--font-size-fluid-0);
    transform: translateY(-2px);
    display: inline-block;
  }
`;

const Container = styled.header`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: var(--size-9);
  gap: var(--size-9);
  position: relative;
  overflow: hidden !important;
  background: var(--background);

  & .chevron {
    margin: auto auto 0 auto;
    width: 2rem;
    height: 2rem;
    animation: var(--animation-bounce);
    animation-timing-function: var(--ease-elastic-in-out-3);
    animation-duration: 3s;
    stroke: var(--pink-5);
  }
  & > div {
    margin-top: auto;
    max-width: 580px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: var(--size-5);

    & h1 {
      font-size: var(--font-size-fluid-3);
      letter-spacing: (--font-letterspacing-2);
      font-weight: var(--font-weight-7);
      color: var(--text-1);
      overflow: hidden;

      & span {
        background: var(--text-highlight-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: block;
        animation-delay: 0.1s !important;
      }

      & div {
        animation-delay: 0s !important;
      }

      & > span,
      & > div {
        opacity: 0;

        animation: var(--animation-fade-in) forwards,
          var(--animation-slide-in-up) forwards;
        animation-timing-function: var(--ease-out-3);
        animation-duration: 0.3s;
      }
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.7);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  & .btn:first-of-type {
    animation: scaleIn 0.4s forwards;
    animation-duration: 0.3s;
    opacity: 0;
  }

  & button {
    animation: scaleIn 0.4s forwards;
    animation-duration: 0.3s;
    animation-delay: 0.1s;
    opacity: 0;
  }
`;
